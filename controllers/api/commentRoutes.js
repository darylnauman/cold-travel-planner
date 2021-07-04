const router = require('express').Router();
const { Comment} = require('../../models');



router.get('/',async (req, res) => {
 
  try{
    const commentData = await Comment.findAll();
    if(!commentData) {
      res.status(404).json({message: 'No comments yet! add one!'});
     
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }

});



router.get('/:id',async (req, res) => {
 
    try{
      const commentData = await Comment.findByPk(req.params.id, {
  
      });
      if(!commentData) {
        res.status(404).json({message: 'No comment matching that id yet! Take this, Daryl!'});
        
      } else{
      res.status(200).json(commentData);
      }
    }catch (err) {
      res.status(500).json(err);
    }
  });


  router.post('/', async (req,res) =>{
      try{
          const commentData = await Comment.create(req.body)
          res.status(200).json(commentData)
      }catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
  })

  router.put('/:id',async (req, res) => {
 
    try{
      const commentData = await Comment.findByPk(req.params.id, {
  
      });
      if(!commentData) {
        res.status(404).json({message: 'Daryl has approved this comment update, and wants to know if you approve of him!'});
        
      } else{
      res.status(200).json(commentData);
      }
    }catch (err) {
      res.status(500).json(err);
    }
  });



  router.delete('/:id',async  (req, res) => {
    
    try {
      const commentData = await Comment.destroy( {
        where: {
          id: req.params.id,
        },
      });
      if (!commentData) {
        
        
      }
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;