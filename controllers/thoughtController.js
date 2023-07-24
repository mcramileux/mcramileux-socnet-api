const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single thought by ID
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({_id: req.params.thoughtId})
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought by its ID
  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { 
        new: true, 
        });
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  // Delete a thought and associated apps
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete(
        { _id: req.params.thoughtId }
      );
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      await Application.deleteMany({ _id: { $in: thought.applications } });
      res.json({ message: 'Thought and associated apps deleted!' })
    } catch (err) {
      res.status(200).json({ message: 'Thought and associated apps deleted!' });
    }
  },
  // Add Reaction
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
          {_id:req.params.thoughtId},
          {$addToSet: {reactions: req.body}},
          {runValidators: true, new: true}
      );
      // thought ? res.json(thought) : res.status(404).json({message: 'Internal Server Error'});
      res.json(thought)
    } catch (err) {
      res.status(500).json(err);
    }
  },
// Delete Reaction
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
          {_id: req.params.thoughtId},
          {$pull: {reactions: {reactionId: req.params.reactionId}}},
          {runValidators: true, new: true}
      );
      thought ? res.json(thought) : res.status(404).json({message: 'Internal Server Error'});
    } catch (err) {
    res.status(500).json(err);
    }
  },
};