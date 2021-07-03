const router = require('express').Router();
// const { NUMBER } = require('sequelize/types');
const { User, Trip, Destination, Comment } = require('../models');
const withAuth = require('../utils/auth');
const exchange = require('../utils/exchange');

router.get('/destinations', async (req, res) => {
  res.render('destinations');
});

router.get('/add-trip', async (req, res) => {
  try {

    // Get all destinations from db
    const destinationData = await Destination.findAll();

    // Serialize data
    const destinations = destinationData.map((destination) => destination.get({ plain: true}));

    res.render('addTrip', {
      destinations,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/add-destination', async (req, res) => {
  res.render('addDestination');
});

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((user) => user.get({ plain: true }));

    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/past-trips/:id/:trgtCur', async (req, res) => {
  try {
    const userTripData = await Trip.findAll({
      where:{
        user_id: req.params.id
      },
        include:{
        model:Destination,
        attributes: ['location_name'],
      }     

    });

    const targetRate = await exchange('CAD', req.params.trgtCur);
    // const CADEUR = await exchange("CAD", "EUR")
    // const EURCAD = await exchange("EUR", "CAD")
    // const GBPCAD = await exchange("GBP", "CAD")
    // const CADGBP = await exchange("CAD", "GBP")
    // const USDCAD = await exchange("USD", "CAD")
    // const CADUSD = await exchange("CAD", "USD")

    console.log(targetRate)


    const userTrips = userTripData.map((userTrip) => {
      let tripData =userTrip.get({ plain: true })

      tripData.hotel_cost = Math.round(Number(tripData.hotel_cost))*targetRate;
      tripData.food_cost = Math.round(Number(tripData.food_cost))*targetRate;
      tripData.ent_cost = Math.round(Number(tripData.ent_cost))*targetRate;
      tripData.misc_cost = Math.round(Number(tripData.misc_cost))*targetRate;
      tripData.transport_cost = Math.round(Number(tripData.transport_cost))*targetRate;

      tripData.tripCost = Math.round(Number(tripData.hotel_cost) + Number(tripData.food_cost) + Number(tripData.ent_cost) + Number(tripData.misc_cost) + Number(tripData.transport_cost));

      return tripData;
    });

    res.render('past-trips', {layout:'any', 
    userTrips:userTrips,
     userData:req.session.userData,
      logged_in:req.session.logged_in
      // rates:{CADEUR, CADGBP,CADUSD, EURCAD, GBPCAD, USDCAD}
    });

  } catch (err) {
    console.log(err);
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
      logged_in: req.session.logged_in
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