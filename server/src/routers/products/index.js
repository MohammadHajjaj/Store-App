const express = require("express");
const Product = require('../../models/product');

const mongoose = require('mongoose');
const readProductsController = require('./getProducts');
const readProductController = require('./getProduct');
const updateProductController = require('./updateProduct')
const deleteProductController = require('./deleteProduct')
const { validateProduct } = require('../../middleware/middleware')

const router = new express.Router();

router.get(
	'/products',
	readProductsController
)

router.get(
	'/products/:id',
	readProductController,
)

router.patch(
	'/products/:id', validateProduct,
	updateProductController
)

router.delete(
	'/products/:id',
	deleteProductController
)


module.exports = router