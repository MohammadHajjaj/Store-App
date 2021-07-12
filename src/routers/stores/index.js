const express = require('express')
const Store = require('../../models/store');
const mongoose = require('mongoose')

const createStoreControler = require('./createStore');
const readStoresController = require('./getStores');
const readStoreController = require('./getStore');
const updateStoreController = require('./updateStore');
const deleteStoreController = require('./deleteStore');
const addProductToStoreController = require('./addProductToStore')


const router = new express.Router()


router.post(
	'/stores',
	createStoreControler
)

router.post(
	'/stores/:id/product',
	addProductToStoreController
)

router.get(
	'/stores',
	readStoresController
)

router.get(
	'/stores/:id',
	readStoreController,
)

router.patch(
	'/stores/:id',
	updateStoreController
)

router.delete(
	'/stores/:id',
	deleteStoreController
)
module.exports = router