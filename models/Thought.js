const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => new Date(timestamp).toISOString(),
      },
      username: {
        type: String,
        ref: 'User',
        required: true,
      },
      reactions: [reactionSchema], 
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );
  
  //Create a virtual called 'reactionCount' that retrieves the length of the thought's reactions array field on query.
  thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });
  
  // Initialize the user model
  const Thought = model('Thought', thoughtSchema);
  
  module.exports = Thought;