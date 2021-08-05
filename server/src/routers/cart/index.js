const express = require('express')
const mongoose = require('mongoose')

const addToCartController = require('./addToCart');
const removeFromCartController = require('./removeFromCart');
const getUserCartController = require('./getCart');
const addOneQtyController = require('./addOneQty');
const removeOneQtyController = require('./removeOneQty');
const createCartFromSession = require('./createCartFromSession');

const checkoutController = require('./checkoutCart')
const router = new express.Router()
const { validateCart } = require('../../middleware/middleware')

router.get(
	'/cart',
	getUserCartController
)

router.post(
	'/cart/:id/addtocart', validateCart,
	addToCartController
)
router.post(

	'/cart/createFromSession',
	createCartFromSession
)


router.post(
	'/cart/:id/removefromcart',
	removeFromCartController
)

router.post(
	'/cart/:id/addoneqty',
	addOneQtyController
)

router.post(
	'/cart/:id/removeoneqty',
	removeOneQtyController
)

router.post(
	'/cart/checkout',
	checkoutController
)

module.exports = router