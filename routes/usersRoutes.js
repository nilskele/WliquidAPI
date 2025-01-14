const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Route to get all users (with pagination)
router.get('/getPaged', usersController.getPagedUsers);

// Route to get a user by ID
router.get('/get/:id', usersController.getUserById);

// Route to create a new user
router.post('/create', usersController.createUser);

router.put('/update/:id', usersController.updateUserById);

router.delete('/delete/:id', usersController.deleteUserById);

router.get('/search', usersController.searchUsersByField);


module.exports = router;

