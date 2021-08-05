const Product = require('../../models/product')
const Cart = require('../../models/cart')
const { removeOneQty } = require('../../services/cartService')
const mongoServices = require('../../services/mongoService')

module.exports = async (req, res) => {
	try {
		const productId = req.params.id;
		if (req.user) {

			const userId = req.user._id
			const result = await removeOneQty(userId, productId);
			return res.status(200).send(result);
		}
		//if not logged in delete from session instead
		else {
			const product = await mongoServices.getProduct(productId);

			//find the product in the cart session
			const exisistingProductIndex = req.session.cart.products.findIndex(
				(product) => product.productId._id.toString() === productId.toString());

			const existingProduct = req.session.cart.products[exisistingProductIndex];


			// decrease quantity by 1, change the other stuff depending on that
			if (existingProduct.quantity > 1) {
				req.session.cart.products[exisistingProductIndex].quantity = req.session.cart.products[exisistingProductIndex].quantity - 1;
				req.session.cart.products[exisistingProductIndex].total = req.session.cart.products[exisistingProductIndex].quantity * product.price;
				req.session.cart.subTotal = req.session.cart.products.map(product => product.total).reduce((acc, next) => acc + next);
				return res.status(200).send(req.session.cart)
			}
			else if (existingProduct.quantity === 1) {
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
		}

	}
	catch (e) {
		return res.status(500).send(e.message)
	}
}
