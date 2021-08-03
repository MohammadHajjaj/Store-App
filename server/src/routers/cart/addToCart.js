const Product = require('../../models/product')
const Cart = require('../../models/cart')
const { addToCart } = require('../../services/cartService')

module.exports = async (req, res) => {
	try {
		const productId = req.params.id;
		const userId = req.user._id
		let quantity;
		if (req.body.quantity) {
			quantity = Number.parseInt(req.body.quantity);
		}
		else { quantity = 1 }
		const result = await addToCart(userId, productId, quantity);
		return res.status(200).send(result);

	}
	catch (e) {
		return res.status(500).send(e.message)
	}
}

