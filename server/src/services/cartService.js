const mongoServices = require('./mongoService')
const Cart = require('../models/cart')

exports.addToCart = async (userId, productId, quantity) => {
	const product = await mongoServices.getProduct(productId);
	const currentCart = await mongoServices.getCurrentCart({ owner: userId, status: "pending" })


	// if user don't have a cart, create one
	if (currentCart.length === 0) {
		//check if quantity is more than the stock available
		if (quantity > product.stock) {
			return ("not enough in stock")
		}
		const cartData = {
			products: [{
				productId: productId,
				quantity: quantity,
				total: parseInt(product.price * quantity),
			}],
			subTotal: parseInt(product.price * quantity),
			status: 'pending',
			owner: userId
		}
		const newCart = new Cart(cartData);
		var data = await newCart.save();
		return data

	}
	//if the user have a cart created already, check first if the product he is adding already exist
	else {
		//check if the product already exist
		if (quantity > product.stock) {
			throw new Error('not enough in stock')
		}
		const exisistingProductIndex = currentCart[0].products.findIndex(
			(product) => product.productId._id.toString() === productId.toString());
		const existingProduct = currentCart[0].products[exisistingProductIndex];

		// if the product already exist, just update its info with the new quantity
		if (existingProduct) {
			if (existingProduct.quantity + quantity > product.stock) {
				throw new Error('not enough in stock')
			}
			currentCart[0].products[exisistingProductIndex].quantity = currentCart[0].products[exisistingProductIndex].quantity + quantity;
			currentCart[0].products[exisistingProductIndex].total = currentCart[0].products[exisistingProductIndex].quantity * product.price;
			currentCart[0].products[exisistingProductIndex].price = product.price
			currentCart[0].subTotal = currentCart[0].products.map(product => product.total).reduce((acc, next) => acc + next);
			let data = await currentCart[0].save();
			return data
		}
		//if the product doesn't already exist , push the new product to the cart
		else {
			if (quantity > product.stock) {
				throw new Error('not enough in stock')
			}

			currentCart[0].products.push({
				productId: productId,
				quantity: quantity,
				price: product.price,
				total: parseInt(product.price * quantity)
			})
			currentCart[0].subTotal = currentCart[0].products.map(product => product.total).reduce((acc, next) => acc + next);
			let data = await currentCart[0].save();
			return data
		}

	}

}




exports.addOneQty = async (userId, productId) => {
	const product = await mongoServices.getProduct(productId);
	const currentCart = await mongoServices.getCurrentCart({ owner: userId, status: "pending" })
	if (currentCart.length === 0) {
		return ("User doesn't have a cart")

		//check if quantity is more than the stock available
	}
	else {
		//find the product in the cart
		const exisistingProductIndex = currentCart[0].products.findIndex(
			(product) => product.productId._id.toString() === productId.toString());
		const existingProduct = currentCart[0].products[exisistingProductIndex];

		if (existingProduct.quantity + 1 > product.stock) {
			return ("not enough in stock")
		}
		// add quantity+1, change the other stuff depending on that
		if (existingProduct) {
			currentCart[0].products[exisistingProductIndex].quantity = currentCart[0].products[exisistingProductIndex].quantity + 1;
			currentCart[0].products[exisistingProductIndex].total = currentCart[0].products[exisistingProductIndex].quantity * product.price;
			currentCart[0].subTotal = currentCart[0].products.map(product => product.total).reduce((acc, next) => acc + next);
			let data = await currentCart[0].save();
			return data;
		}
	}
};


exports.removeFromCart = async (userId, productId) => {

	const currentCart = await mongoServices.getCurrentCart({ owner: userId, status: "pending" })

	if (currentCart.length === 0) {
		return ("User doesn't have a cart")
	}
	//find the product in the cart and completly delete it
	const exisistingProductIndex = currentCart[0].products.findIndex(
		(product) => product.productId._id.toString() === productId.toString());

	const existingProduct = currentCart[0].products[exisistingProductIndex];
	if (existingProduct) {
		const filteredCart = currentCart[0].products.filter((product) => product.productId._id.toString() !== productId.toString());
		currentCart[0].products = filteredCart;
		//calculate the new subtotal same way we did when adding items
		if (currentCart[0].products.length !== 0) {
			const newSubTotal = currentCart[0].products.map(product => product.total).reduce((acc, next) => acc + next)
			currentCart[0].subTotal = newSubTotal;
			let data = await currentCart[0].save();
			return data
		}
		else {
			currentCart[0].subTotal = 0;
			let data = await currentCart[0].save();
			return data
		}
	}
	else {
		return ("product doesn't exist in cart")
	}
};

exports.removeOneQty = async (userId, productId) => {
	const product = await mongoServices.getProduct(productId);

	const currentCart = await mongoServices.getCurrentCart({ owner: userId, status: "pending" })

	if (currentCart.length === 0) {
		return ("User doesn't have a cart")

	}
	else {
		//find the product in the cart
		const exisistingProductIndex = currentCart[0].products.findIndex(
			(product) => product.productId._id.toString() === productId.toString());

		const existingProduct = currentCart[0].products[exisistingProductIndex];


		// decrease quantity by 1, change the other stuff depending on that
		if (existingProduct.quantity > 1) {
			currentCart[0].products[exisistingProductIndex].quantity = currentCart[0].products[exisistingProductIndex].quantity - 1;
			currentCart[0].products[exisistingProductIndex].total = currentCart[0].products[exisistingProductIndex].quantity * product.price;
			currentCart[0].subTotal = currentCart[0].products.map(product => product.total).reduce((acc, next) => acc + next);
			let data = await currentCart[0].save();
			return data
		}
		else if (existingProduct.quantity === 1) {
			const filteredCart = currentCart[0].products.filter((product) => product.productId._id.toString() !== productId.toString());
			currentCart[0].products = filteredCart;
			//calculate the new subtotal same way we did when adding items
			if (currentCart[0].products.length !== 0) {
				const newSubTotal = currentCart[0].products.map(product => product.total).reduce((acc, next) => acc + next)
				currentCart[0].subTotal = newSubTotal;
				let data = await currentCart[0].save();
				return data
			}
			else {
				currentCart[0].subTotal = 0;
				let data = await currentCart[0].save();
				return data
			}

		}
	}
};

exports.checkoutCart = async (userId, data) => {
	let product
	newData = JSON.parse(data)
	cartId = newData._id
	const currentCart = await mongoServices.getCurrentCart({ owner: userId, status: "pending", _id: cartId })

	if (currentCart.length === 0) {
		return ("User doesn't have a cart")
	}
	else {
		currentCart[0].status = 'confirmed';
		for (item of currentCart[0].products) {
			product = await mongoServices.getProduct(item.productId);
			product.stock = product.stock - item.quantity;
			await product.save();
		}
		let data = await currentCart[0].save();
		return data

	}

};

exports.getCart = async (userId) => {
	const currentCart = await mongoServices.getCurrentCart({ owner: userId, status: "pending" })
	if (currentCart.length === 0) {
		return ("User doesn't have a cart")
	}

	return currentCart[0];
}


