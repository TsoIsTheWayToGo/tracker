require('./model/User');
require('./model/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { mongoUri } = require('../keys/mongoDB');

const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');
//Use mongoose to connect to MongoDB

const app = express();

app.use(bodyParser.json()); // always put this before everthing. This will parse json data from incoming request and place the data as the body property.
app.use(authRoutes);
app.use(trackRoutes)


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
app.get('/', requireAuth, (req, res) => {
	res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
	console.log('Listening to port 3000');
});
