const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');


//login routes
router.route('/')
    .post(loginController.loginUser);


module.exports=router;