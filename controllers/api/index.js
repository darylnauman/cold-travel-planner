const router = require('express').Router();
const userRoutes = require('./userRoutes');
const tripRoutes = require('./tripRoutes');
const commentRoutes = require('./commentRoutes');
const destinationRoutes = require('./destinationRoutes');

router.use('/users', userRoutes);
router.use('/trips', tripRoutes);
router.use('/comments', commentRoutes);
router.use('/destinations', destinationRoutes);

module.exports = router;