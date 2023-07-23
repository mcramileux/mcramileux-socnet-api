const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a single user
    async getUserById(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No user with this ID!' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a user and associated thoughts
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID!' });
            }

            await Application.deleteMany({ _id: { $in: user.applications } });
            res.json({ message: 'User and associated apps deleted!' })
        } catch (err) {
            res.status(200).json({ message: 'User and associated apps deleted!' });
        }
    },
    // Add a friend to user's friend list
    async addFriend(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
            // {new: true},
          );
          if (!user) {
            return res
              .status(404)
              .json({ message: 'No user found with this ID!' });
          }
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    // Remove a friend from a user's friend list
    async removeFriend(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends:  req.params.friendId } },
            // { runValidators: true,  }
            { new: true } 
          )
    
          if (!user) {
            return res.status(404).json({ message: 'No user with this ID!' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
};
