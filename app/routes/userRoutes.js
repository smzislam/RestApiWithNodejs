const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');


//user routes
router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);
router.route('/:id')
    .get(userController.getSingleUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);


module.exports=router;