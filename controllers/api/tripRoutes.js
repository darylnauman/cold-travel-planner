const router = require('express').Router();
const { Trip, Destination} = require('../../models');

// The `/api/trips` endpoint

// get all trips
router.get('/',async (req, res) => {
 
  try{
    const tripData = await Trip.findAll( {
  
    });
    if(!tripData) {
      res.status(404).json({message: 'No Trip matches your search!'});
     
    }
    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a specific trip by ID
router.get('/:id',async (req, res) => {
  try {
    const tripData = await Trip.findByPk(req.params.id, {

    });
    
    if(!tripData) {
      res.status(404).json({message: 'No Trip matches your search!'});
      
    } else{
    res.status(200).json(tripData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new trip
router.post('/', async (req, res) => {
  try {
    const newTrip = await Trip.create({...req.body, user_id: req.session.user_id});
    res.status(200).json(newTrip)
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// update one trip by its `id` 
router.put('/:id', async (req, res) => {
  try {
    const tripData = await Trip.update({
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      trip_budget: req.body.trip_budget,
      hotel_cost: req.body.hotel_cost,
      food_cost: req.body.food_cost,
      ent_cost: req.body.ent_cost,
      misc_cost: req.body.misc_cost,
      transport_cost: req.body.transport_cost
    },  
    {
      where: {
        id: req.params.id
      }
    })

    if(!tripData) {
      res.status(404).json({ message: 'No trip found with this id!' });
      return;
    }

    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete one trip by its `id` 
router.delete('/:id',async  (req, res) => {
  try {
    const tripData = await Trip.destroy( {
      where: {
        id: req.params.id,
      },
    });

    if (!tripData) {
      res.status(404).json({ message: 'No trip found with this id!' });
      return;
    }

    res.status(200).json(tripData);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;