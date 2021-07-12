const Product = require('../../models/product')
const Cart = require('../../models/cart')
const { getCart } = require('../../services/cartService')

module.exports = async (req, res) => {
	try {
		const userId = req.session.user._id
		const result = await getCart(userId);
		return res.status(200).send(result);
	}

	catch (e) {
		return res.status(500).send(e.message)
	}
}
