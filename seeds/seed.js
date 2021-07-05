const sequelize = require('../config/connection');
const User = require('../models/User')
const Destination = require('../models/Destination');
const Trip = require('../models/Trip');
const Comment = require('../models/Comment');

const userData = require('./userData.json');
const destinationData = require('./destinationData.json');
const tripData = require('./tripData.json');
const commentData = require('./commentData.json')

  const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  })
 
  await Destination.bulkCreate(destinationData, {
    individualHooks: true,
    returning: true,
  });

  await Trip.bulkCreate(tripData, {
    individualHooks: true,
    returning: true,
  })


  process.exit(0);
};

seedDatabase();
