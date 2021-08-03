const express = require('express')
const Store = require('../../models/store');
const mongoose = require('mongoose')

const adminController = require('./admin-client');
const producerController = require('./producer');
// const consumerController = require('./consumer');



const router = new express.Router()


router.post(
	'/create-topic', adminController
)

router.post(
	'/produce',
	producerController
)

// router.get(
// 	'/stores',
// 	readStoresController
// )


module.exports = router