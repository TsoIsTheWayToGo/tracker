require('./model/User');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { mongoUri } = require('../keys/mongoDB');

const authRoutes = require('./routes/authRoutes');

//Use mongoose to connect to MongoDB

const app = express();

app.use(bodyParser.json()); // always put this before everthing. This will parse json data from incoming request and place the data as the body property.
app.use(authRoutes);

mongoose.connect(mongoUri, {
	useNewUrlParser: true,
	useCreateIndex: true,
});
//Lets people know we are connected
mongoose.connection.on('connected', () => {
	console.log('Connected to MongoDB');
});
//In case of an error
mongoose.connection.on('error', (err) => {
	console.error('Connected to MongoDB', err);
});

//using this for testing jwt
app.get('/', (req, res) => {
	res.send('Hi there');
});

app.listen(3000, () => {
	console.log('Listening to port 3000');
});
