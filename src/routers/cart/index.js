const express = require('express')
const mongoose = require('mongoose')

const addToCartController = require('./addToCart');
const removeFromCartController = require('./removeFromCart');
const showUserCartController = require('./showCart');
const addOneQtyController = require('./addOneQty');
const removeOneQtyController = require('./removeOneQty');
const checkoutController = require('./checkoutCart')
const router = new express.Router()

//change them to /cart/.. 
//add validations middlewares 

router.get(
	'/cart',
	showUserCartController
)

router.post(
	'/cart/:id/addtocart',
	addToCartController
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

//checkout -> change cart status to confirmed, reduce stock of products by the amount that was checked out
router.post(
	'/cart/checkout',
	checkoutController
)

module.exports = router