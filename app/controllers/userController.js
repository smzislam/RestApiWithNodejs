const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const {registerValidation, userUpdateValidation} =require('../validation/validation');


//validation
// const Joi = require('joi');
// const schema = Joi.object({
//     name: Joi.string().min(6).required(),
//     email: Joi.string().min(6).required().email(),
//     password: Joi.string().min(6).required()
// });


module.exports = {
    getAllUsers: async (req, res) => {
        try{
            const users = await User.find();
            res.json(users);

        }catch(error){
            res.json({message:error});
        }       
    },
    createUser: async (req, res) => {
        
        //validate user data
        // const validation = schema.validate(req.body);
        // if(validation.error) return res.status(400).json(validation.error.details[0].message);
        const validation = registerValidation(req.body);
        if(validation.error) return res.status(400).json(validation.error.details[0].message);
        
        //check if the user already exist or not
        const emailExist = await User.findOne({email:req.body.email});
        if(emailExist) return res.status(400).json('Email already exists.');

        //Hash password
        //generate salt
        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create a new user
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        try{
            const savedUser = await newUser.save();
            return res.json(savedUser);
        }catch(err){
            res.status(400).json({message:err});
        }  
        
    },
    getSingleUser:(req, res) => {
        //res.send('get single user')
        const uid = req.params.id;
        User.findById(uid).then(user=>{
            res.json(user);
        })
        .catch(error=>{
            res.json({message:error})
        });
    },
    updateUser: async (req, res) => {	
        const uid = req.params.id;
        //validate user data
        const validation = userUpdateValidation(req.body);
        if(validation.error) return res.status(400).json(validation.error.details[0].message);


        //Hash password
        //generate salt
        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        

        try{

            const user = await User.findById(uid);
            user.name= req.body.name;
            //user.email= req.body.email;
            user.password= hashedPassword;
            const updatedUser = await user.save();
            return res.json(updatedUser);

        }catch(error){
            return res.json({message:error});
        }

		// User.findById(uid).then(user=>{	
		// 	user.name= req.body.name;
        //     user.email= req.body.email;
        //     user.password= req.body.password;
		// 	user.save()
        //         .then(updatedUser=>{
        //             res.json(updatedUser);
        //         }).catch(error=>{
        //             res.json({message:error});
        //         });
			
		// });																		
		
	},
    
    deleteUser:(req, res) => {
        const uid = req.params.id;
        User.findByIdAndDelete(uid)
            .then(deletedUser=>{
                res.json(deletedUser);
            }).catch(error=>{
                res.json({message:error});
            });
    }
}

