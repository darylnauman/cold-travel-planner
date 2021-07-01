const router = require('express').Router();
const { Destination } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all Destination data
    const destinationData = await Destination.findAll();

    // Serialize data
    const destinations = destinationData.map((destination) => destination.get({ plain: true}));
    
    if(!destinationData) {
      res.status(404).json({message: 'No destination data!'});
      return;
    }
    // res.status(200).json(destinationData);

    // pass serialized data and session flag into template
    res.render('destinations', {
      destinations,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err)
  }
});

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

router.delete('/:id', async (req, res) => {
  try {
    const destinationData = await Destination.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!destinationData) {
      res.status(404).json({ message: 'No destination found with this id!' });
      return;
    }
    res.status(200).json(destinationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;