const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
	timestamp: Number,
	coords: {
		latitude: Number,
		longitude: Number,
		altitude: Number,
		accuracy: Number,
		heading: Number,
		speed: Number,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	name: {
		type: String,
		default: '',
	},
	locations: [pointSchema],
});

mongoose.model('Track', trackSchema)