const router = require('express').Router();
const { User, Trip, Destination, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/destinations', async (req, res) => {
  res.render('destinations');
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


router.get('/user/:id', async (req, res) => {
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

    const userTrips = userTripData.map((userTrip) => userTrip.get({ plain: true }));
console.log(userTrips)
    res.render('user', { userTrips });
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