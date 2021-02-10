const express = require('express')
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();
//require('dotenv/config');
const bodyParser = require('body-parser');
const defaultRoutes = require('./app/routes/defaultRoutes');
const postRoutes= require('./app/routes/postRoutes');
const userRoutes= require('./app/routes/userRoutes');
const loginRoutes= require('./app/routes/loginRoutes');
const verify = require('./app/middleware/verifyToken');


const app = express();


app.use(bodyParser.json());

app.use('/', defaultRoutes);
app.use('/login', loginRoutes);
app.use('/api/post', verify, postRoutes);
app.use('/api/user', userRoutes);

// Connect to mongodb
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(response => {
		console.log('Connected to database.');
	}).catch(err => {
		console.log('Fail to connect database.');
	});


app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`)
})