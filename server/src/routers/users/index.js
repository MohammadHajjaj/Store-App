const express = require("express");
const User = require('../../models/user');
const mongoose = require('mongoose');
const passport = require("passport")

const router = new express.Router();
const createUserControler = require('./createUser');

const logoutUserController = require('./logOutUser');
const loginUserController = require('./loginUser');

const { validateUser } = require('../../middleware/middleware')
router.post(
	'/createuser',
	createUserControler
)
router.post(
	'/login', passport.authenticate('local'),
	loginUserController
)

router.post(
	'/logout',
	logoutUserController
)
module.exports = router