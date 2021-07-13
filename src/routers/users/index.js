const express = require("express");
const User = require('../../models/user');
const mongoose = require('mongoose');
const router = new express.Router();
const createUserControler = require('./createUser');
const { validateUser } = require('../../middleware/middleware')
router.post(
	'/createuser', validateUser,
	createUserControler
)
module.exports = router