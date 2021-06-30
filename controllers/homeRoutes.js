// TO DO - define what we want displayed with GET route on main page - currently returning destination data

const router = require('express').Router();
const { User, Trip, Destination, Comment } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;