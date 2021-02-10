const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const {loginValidation} =require('../validation/validation');



module.exports = {
    loginUser: async (req, res) => {
        
        //validate user data
        const validation = loginValidation(req.body);
        if(validation.error) return res.status(400).json(validation.error.details[0].message);
        
        //check if the email exists
        const user = await User.findOne({email:req.body.email});
        if(!user) return res.status(400).json('Email is not found.');

        //check password
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).json('Invalid password');

        //create and assign a token
        const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
        res.header('auth_token', token).send(token);

        //res.json('You are logged in.');

        
        
    }
}

