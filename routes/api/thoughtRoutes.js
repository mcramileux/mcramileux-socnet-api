// import the necessary dependencies and controllers
const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction, 
    deleteReaction,
  } = require('../../controllers/thoughtController.js');
  
  // GET and POST all Thoughts
  // /api/thoughts
  router.route('/').get(getAllThoughts).post(createThought);
  
  // GET - get thought id, PUT - update thought by id, and DELETE - delete thought by id
  // /api/thoughts/:thoughtId
  router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);
  
  // POST - add friend
  // /api/thoughts/:thoughtId/reactions
  router.route('/:thoughtId/reactions').post(addReaction);
  
  // DELETE - remove friend
  // /api/thoughts/:thoughtId/reactions/:reactionId
  router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// Export router
module.exports = router;