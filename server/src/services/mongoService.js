const Product = require('../models/product');
const Store = require('../models/store');
const User = require('../models/user');
const Cart = require('../models/cart');


// products mongo services

//get All products
exports.getProducts = async () => {
	try {
		return await Product.find({}).populate('store', 'name')
	} catch (e) {
		throw e
	}
}



//get a single product info 
exports.getProduct = async (productId) => {
	try {
		return await Product.findById(productId).populate('store')
	} catch (e) {
		throw e
	}
}


//update a product info 
exports.updateProduct = async ({ id, ...body }) => {
	try {
		const changedProduct = await Product.findByIdAndUpdate(id, { ...body }, { runValidators: true, new: true })//.populate('store', 'name')
		return changedProduct
	} catch (e) {
		throw e
	}

}


//delete a product  
exports.deleteProduct = async (productId) => {
	try {
		return await Product.findByIdAndDelete(productId)
	} catch (e) {
		throw e
	}
}


// stores mongo services

//create a new store
exports.createStore = async (...body) => {
	try {
		return await Store.create(...body)
	} catch (e) {
	}
}

//show all stores
exports.getStores = async () => {
	try {
		return await Store.find({}).populate('products')
	}
	catch (e) {
		throw e
	}
}

//Show a single store by ID
exports.getStore = async (storeID) => {
	try {
		return await Store.findById(storeID).populate('products') // also show the products of the store
	} catch (e) {
		throw e
	}
}



//Edit a store name
exports.updateStore = async ({ id, ...body }) => {
	try {
		const updatedStore = await Store.findByIdAndUpdate(id, { ...body }, { runValidators: true, new: true })
		return updatedStore
	} catch (e) {
		throw e
	}
}

//Create a new product for a single store
exports.createProduct = async ({ id, ...body }) => {
	try {
		const foundStore = await Store.findById(id)//.populate('products', 'name')
		const newProduct = new Product({ ...body })
		// console.log(req.body)
		// console.log(foundStore)
		// console.log(newProduct)
		foundStore.products.push(newProduct) // storing the new product in the store
		newProduct.store = foundStore// storing the store object in the product
		await foundStore.save()
		await newProduct.save()
		// res.status(201).send(foundStore)
		return newProduct
	} catch (e) {
		throw e
	}
}


//Delete a store 
exports.deleteStore = async (storeID) => {
	try {
		//const deletedStore = await Store.findByIdAndDelete(id);

		const deletedStore = await Store.findById(storeID);
		await Product.deleteMany({ store: deletedStore._id })

		// const test = await Product.find({ store: deletedStore._id })
		await deletedStore.remove()
		// console.log(deletedStore)
		// console.log(test)
		return deletedStore
	} catch (e) {
		throw e
	}
}



//users mongo services 
exports.createUser = async (...body) => {
	try {

		const newUser = new User({ ...body })
		// console.log(req.body)
		await newUser.save()
		// console.log(req.session.user._id)
		return newUser;

	} catch (e) {
		throw e
	}

}

exports.findUser = async ({ email }) => {
	try {
		const foundUser = await User.find({ email })
		// console.log(req.body)
		// console.log(req.session.user._id)
		return foundUser;

	} catch (e) {
		throw e
	}

}

//cart mongo services
exports.getCurrentCart = async ({ owner, status }) => {
	try {
		const currentCart = await Cart.find({ owner, status }).populate('products.productId')
		return currentCart;

	} catch (e) {
		throw e
	}

}

