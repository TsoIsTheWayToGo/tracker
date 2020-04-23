const express = require('express');
const mongoose = require('mongoose');

const {mongoUri} = require('../keys/mongoDB');



//Use mongoose to connect to MongoDB
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

const app = express();

app.get('/', (req, res) => {
	res.send('Hi there');
});

app.listen(3000, () => {
	console.log('Listening to port 3000');
});
