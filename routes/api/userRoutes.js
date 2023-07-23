// import the necessary dependencies and controllers
const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// GET and POST all Users
// /api/users
router.route('/').get(getAllUsers).post(createUser);

// GET - get user id, PUT - update user by id, and DELETE - delete user by id
// /api/users/:userId
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// POST - add friend and DELETE - remove friend
// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;