const express = require("express");
const User = require('../../models/user');
const mongoose = require('mongoose');
const router = new express.Router();

const createUserControler = require('./createUser');

router.post(
	'/createuser',
	createUserControler
)

module.exports = router