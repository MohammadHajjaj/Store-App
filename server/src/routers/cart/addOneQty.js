const Product = require('../../models/product')
const Cart = require('../../models/cart')
const { addOneQty } = require('../../services/cartService')

module.exports = async (req, res) => {
	try {
		const productId = req.params.id;
		const userId = req.user._id
		const result = await addOneQty(userId, productId);
		return res.status(200).send(result);

	}
	catch (e) {
		return res.status(500).send(e.message)
	}
}
