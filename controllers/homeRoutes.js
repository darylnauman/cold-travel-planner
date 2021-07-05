const router = require('express').Router();
// const { NUMBER } = require('sequelize/types');
const { User, Trip, Destination, Comment } = require('../models');
const withAuth = require('../utils/auth');
const exchange = require('../utils/exchange');


// render page to add a trip
router.get('/add-trip', async (req, res) => {
  try {

    // Get all destinations from db
    const destinationData = await Destination.findAll();

    // Serialize data
    const destinations = destinationData.map((destination) => destination.get({ plain: true}));

    res.render('addTrip', {
      destinations,
      userId:req.session.user_id,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// render page to add a destination
router.get('/add-destination', async (req, res) => {
  res.render('addDestination', {
    userId:req.session.user_id,
    logged_in: req.session.logged_in});
});

// a basic route that helps us as programmers check on the users we have/have created.
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((user) => user.get({ plain: true }));

    res.render('homepage', {
      users,
      userId:req.session.user_id,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// this function renders all trips and gives a detailed list of costs, also the ablility to multiply them by the exchange rate.
router.get('/trips/:id/:trgtCur', async (req, res) => {
  try {
    const userTripData = await Trip.findAll({
      where:{
        user_id: req.params.id
      },
        include:{
          model:Destination,
          attributes: ['location_name']},
        });

    const targetRate = await exchange('CAD', req.params.trgtCur);
    // const CADEUR = await exchange("CAD", "EUR")
    // const EURCAD = await exchange("EUR", "CAD")
    // const GBPCAD = await exchange("GBP", "CAD")
    // const CADGBP = await exchange("CAD", "GBP")
    // const USDCAD = await exchange("USD", "CAD")
    // const CADUSD = await exchange("CAD", "USD")
   
    const userTrips = userTripData.map((userTrip) => {
      let tripData =userTrip.get({ plain: true })

      tripData.hotel_cost = Math.round(Number(tripData.hotel_cost)*targetRate);
      tripData.food_cost = Math.round(Number(tripData.food_cost)*targetRate);
      tripData.ent_cost = Math.round(Number(tripData.ent_cost)*targetRate);
      tripData.misc_cost = Math.round(Number(tripData.misc_cost)*targetRate);
      tripData.transport_cost = Math.round(Number(tripData.transport_cost)*targetRate);

      tripData.tripCost = Math.round(Number(tripData.hotel_cost) + Number(tripData.food_cost) + Number(tripData.ent_cost) + Number(tripData.misc_cost) + Number(tripData.transport_cost));

      return tripData;
    });

    res.render('trips', {layout:'any', 
    userTrips:userTrips,
    userId:req.session.user_id,
     userData:req.session.userData,
      logged_in:req.session.logged_in
      // rates:{CADEUR, CADGBP,CADUSD, EURCAD, GBPCAD, USDCAD}
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/profile', withAuth, async (req, res) => {
  try {
    const userInfo = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Trip }],
    });
    

    const users = userInfo.get({ plain: true });


    res.render('profile', {
      ...users,
      userId:req.session.user_id,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// displays all the destinations on the destination page
router.get('/destinations', async (req, res) => {
  try {
    // Get all Destination data
    const destinationData = await Destination.findAll();

    // Serialize data
    const destinations = destinationData.map((destination) =>  destination.get({ plain: true}));
    
    res.render('destinations', {layout:'any',
      destinations:destinations,
      userId:req.session.user_id,
    logged_in: req.session.logged_in,
  });
} catch (err) {
  res.status(500).json(err);
  }
});
  
router.get('/update-trip/:id', async (req, res) => {
  try {
    const tripData = await Trip.findByPk(req.params.id, {
      include: [
        {
          model: Destination,
          attributes: ['location_name'],
        },
      ],
    });

    const trip = tripData.get({ plain: true });
    // const destinationData = await Destination.findAll();
    // const destinations = destinationData.map((destination) => destination.get({ plain: true}));

    res.render('updateTrip', {
      ...trip, 
      // destinations,
      userId:req.session.user_id,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// displays the comments on the destination
router.get('/destinations/:id', async (req, res) => { 
  try {
    // Get all comments
    const commentData = await Comment.findAll({
      where:{
        destination_id: req.params.id
      },
        include:{
        model:Destination,
        attributes: ['location_name'],
      }
    });
    const destinationData = await Destination.findAll({
      where: {
        id: req.params.id
      }
    })
    
    // Serialize data
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    const cities = destinationData.map((city) =>  city.get({ plain: true }));

    console.log(cities)
    console.log(cities[0].location_name)

    res.render('comments', {layout:'any',
      comments,
      cities,
      userId:req.session.user_id,
    logged_in: req.session.logged_in,
  });
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;