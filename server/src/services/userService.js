const mongoServices = require('./mongoService')
const User = require('../models/user');

exports.createUser = async (data) => {
	const newUser = await mongoServices.createUser(data)
	return newUser;
};

exports.findUser = async (email) => {
	const foundUser = await mongoServices.findUser(email)
	return foundUser;
};

