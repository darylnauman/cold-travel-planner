const router = require('express').Router();
const { Destination } = require('../../models');
// const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const newDestination = await Destination.create(req.body);
    // , user_id: req.session.user_id,
    // });

    res.status(200).json(newDestination);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;