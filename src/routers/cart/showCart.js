const Product = require('../../models/product')
const Cart = require('../../models/cart')

module.exports = async (req, res) => {
	try {
		const userId = req.session.user._id
		const currentCart = await Cart.find({ owner: userId, status: "pending" })
		if (currentCart.length === 0) {
			res.status(404).send("User doesn't have a cart")
		}
		return res.status(200).send(currentCart[0].products)
	}

	catch (e) {
		return res.status(500).send(e.message)
	}
}
