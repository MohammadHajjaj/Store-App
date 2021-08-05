const Product = require('../../models/product')
const Cart = require('../../models/cart')
const { removeFromCart } = require('../../services/cartService')
const mongoServices = require('../../services/mongoService')

module.exports = async (req, res) => {
	try {
		const productId = req.params.id;
		if (req.user) {

			const userId = req.user._id
			const result = await removeFromCart(userId, productId);
			return res.status(200).send(result);
		}
		else {
			// const product = await mongoServices.getProduct(productId);
			//find the product in the cart and completly delete it
			const exisistingProductIndex = req.session.cart.products.findIndex(
				(product) => product.productId._id.toString() === productId.toString());

			const existingProduct = req.session.cart.products[exisistingProductIndex];
			if (existingProduct) {
				const filteredCart = req.session.cart.products.filter((product) => product.productId._id.toString() !== productId.toString());
				req.session.cart.products = filteredCart;
				//calculate the new subtotal same way we did when adding items
				if (req.session.cart.products.length !== 0) {
					const newSubTotal = req.session.cart.products.map(product => product.total).reduce((acc, next) => acc + next)
					req.session.cart.subTotal = newSubTotal;
					return res.status(200).send(req.session.cart)

				}
				else {
					req.session.cart.subTotal = 0;
					return res.status(200).send(req.session.cart)

				}
			}
			else {
				return res.status(400).send("product doesn't exist in cart")
			}

		}
	}

	catch (e) {
		return res.status(500).send(e.message)
	}
}
