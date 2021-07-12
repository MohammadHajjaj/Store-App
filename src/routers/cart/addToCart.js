const Product = require('../../models/product')
const Cart = require('../../models/cart')

module.exports = async (req, res) => {
	try {
		const productId = req.params.id;
		const userId = req.session.user._id
		const quantity = Number.parseInt(req.body.quantity);
		const product = await Product.findById(productId);
		const currentCart = await Cart.find({ owner: userId, status: "pending" })


		// if user don't have a cart, create one
		if (currentCart.length === 0) {
			//check if quantity is more than the stock available
			if (quantity > product.stock) {
				return res.status(400).send("not enough in stock")
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
			return res.status(200).send(data)

		}
		//if the user have a cart created already, check first if the product he is adding already exist
		else {
			//check if the product already exist
			const exisistingProductIndex = currentCart[0].products.findIndex(
				(product) => product.productId.toString() === productId.toString());
			const existingProduct = currentCart[0].products[exisistingProductIndex];

			// if the product already exist, just update its info with the new quantity
			if (existingProduct) {
				currentCart[0].products[exisistingProductIndex].quantity = currentCart[0].products[exisistingProductIndex].quantity + quantity;
				currentCart[0].products[exisistingProductIndex].total = currentCart[0].products[exisistingProductIndex].quantity * product.price;
				currentCart[0].products[exisistingProductIndex].price = product.price
				currentCart[0].subTotal = currentCart[0].products.map(product => product.total).reduce((acc, next) => acc + next);
				let data = await currentCart[0].save();
				return res.status(200).send(data)
			}
			//if the product doesn't already exist , push the new product to the cart
			else {
				currentCart[0].products.push({
					productId: productId,
					quantity: quantity,
					price: product.price,
					total: parseInt(product.price * quantity)
				})
				currentCart[0].subTotal = currentCart[0].products.map(product => product.total).reduce((acc, next) => acc + next);
				let data = await currentCart[0].save();
				return res.status(200).send(data)
			}

		}
	}
	catch (e) {
		return res.status(500).send(e.message)
	}
}
