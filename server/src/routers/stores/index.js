const express = require('express')
const Store = require('../../models/store');
const mongoose = require('mongoose')

const createStoreControler = require('./createStore');
const readStoresController = require('./getStores');
const readStoreController = require('./getStore');
const updateStoreController = require('./updateStore');
const deleteStoreController = require('./deleteStore');
const addProductToStoreController = require('./addProductToStore')
const { validateStore } = require('../../middleware/middleware')
const { validateProduct } = require('../../middleware/middleware')

const checkoutController = require('./checkoutCart')
const router = new express.Router()


router.post(
	'/stores', validateStore,
	createStoreControler
)

router.post(
	'/stores/:id/product', validateProduct,
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
	'/stores/:id', validateStore,
	updateStoreController
)
router.post(
	'/cart/checkout',
	checkoutController
)

router.delete(
	'/stores/:id',
	deleteStoreController
)
module.exports = router