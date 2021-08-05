const Product = require('../../models/product')
const Cart = require('../../models/cart')
const { addOneQty } = require('../../services/cartService')
const mongoServices = require('../../services/mongoService')

module.exports = async (req, res) => {
	try {
		const productId = req.params.id;

		if (req.user) {
			const userId = req.user._id
			const result = await addOneQty(userId, productId);
			return res.status(200).send(result);
		}
		else {
			const product = await mongoServices.getProduct(productId);

			if (!req.session.cart) {
				return ("session doesn't have a cart")
				//check if quantity is more t han the stock available
			}
			else {
				//find the product in the cart session
				const exisistingProductIndex = req.session.cart.products.findIndex(
					(product) => product.productId._id.toString() === productId.toString());
				const existingProduct = req.session.cart.products[exisistingProductIndex];

				if (existingProduct.quantity + 1 > product.stock) {
					return ("not enough in stock")
				}
				// add quantity+1, change the other stuff depending on that
				if (existingProduct) {
					req.session.cart.products[exisistingProductIndex].quantity = req.session.cart.products[exisistingProductIndex].quantity + 1;
					req.session.cart.products[exisistingProductIndex].total = req.session.cart.products[exisistingProductIndex].quantity * product.price;
					req.session.cart.subTotal = req.session.cart.products.map(product => product.total).reduce((acc, next) => acc + next);
					return res.status(200).send(req.session.cart)
				}
			}
		}
	}
	catch (e) {
		return res.status(500).send(e.message)
	}
}
