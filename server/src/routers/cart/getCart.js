const Product = require('../../models/product')
const Cart = require('../../models/cart')
const { getCart } = require('../../services/cartService')

module.exports = async (req, res) => {
	try {
		if (req.user) {

			const userId = req.user._id
			const result = await getCart(userId);
			return res.status(200).send(result);
		}
		else {
			return res.status(200).send(req.session.cart);
		}
	}

	catch (e) {
		return res.status(500).send(e.message)
	}
}
