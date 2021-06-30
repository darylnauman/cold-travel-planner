const router = require('express').Router();
const { Trip, Destination, TripDestinationJoin} = require('../../models');

// The `/api/trip` endpoint

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


router.get('/:id',async (req, res) => {
 
  try{
    const tripData = await Trip.findByPk(req.params.id, {

    });
    if(!tripData) {
      res.status(404).json({message: 'No Trip matches your search!'});
      
    } else{
    res.status(200).json(tripData);
    }
  }catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {

    try {
        const newTrip = await Trip.create(req.body);
        res.status(200).json(newTrip)
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }



//   Trip.create(req.body)
//     .then((trip) => {
//       // if there are trips, we need to create pairings to bulk create in the TripDestinationJoin model
//       if (req.body.TripDestinationJoin && req.body.TripDestinationJoin.length) {

//         const tripDestination = req.body.TripDestinationJoin.map((destination_id) => {
//           return {
//             trip_id: trip.id,
            
//           };
//         });
//         return TripDestinationJoin.bulkCreate(tripDestination);
//       }
      
//       res.status(200).json(trip);
//     })
//     .then((tripDestinationIds) => res.status(200).json(tripDestinationIds))
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err);
//     });
});




router.delete('/:id',async  (req, res) => {
  // delete one trip by its `id` 
  try {
    const tripData = await Trip.destroy( {
      where: {
        id: req.params.id,
      },
    });
    if (!tripData) {
      
      
    }
    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
