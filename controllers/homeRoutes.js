const router = require('express').Router();
// const { NUMBER } = require('sequelize/types');
const { User, Trip, Destination, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/destinations', async (req, res) => {
  res.render('destinations');
});

router.get('/add-trip', async (req, res) => {
  res.render('addTrip');
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


router.get('/past-trips/:id', async (req, res) => {
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

    const userTrips = userTripData.map((userTrip) => {
      let tripData =userTrip.get({ plain: true })
      tripData.tripCost = Number(tripData.hotel_cost) + Number(tripData.food_cost) + Number(tripData.ent_cost) + Number(tripData.misc_cost) + Number(tripData.transport_cost)
      return tripData;
    });

    res.render('past-trips', {layout:'any', userTrips:userTrips, userData:req.session.userData, logged_in:req.session.logged_in});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.get('/', async (req, res) => {
//   try {
//     // Get all Destination data
//     const destinationData = await Destination.findAll();

//     // Serialize data
//     const destinations = destinationData.map((destination) => destination.get({ plain: true}));


//   res.render('homepage', {
//     posts,
//   logged_in: req.session.logged_in,
//   });
// } catch (err) {
//   res.status(500).json(err);
// }
// });

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;