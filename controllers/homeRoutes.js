// TO DO - define what we want displayed with GET route on main page - currently returning destination data

const router = require('express').Router();
const { User, Trip, Destination, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all Destination data
    const destinationData = await Destination.findAll({
      // include: [
      //   {
      //     model: ,
      //     attributes: ['']
      //   },
      // ],
    });

    // Serialize data
    const destinations = destinationData.map((destination) => destination.get({ plain: true}));
    
    // pass serialized data and session flag into template
    res.render('homepage', {
      page_title: 'Home Page',
      destinations,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err)
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