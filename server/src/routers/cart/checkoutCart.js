const Product = require('../../models/product')
const Cart = require('../../models/cart')
const { sendConfirmationEmail } = require('../../emails/confirmation')
const { checkoutCart } = require('../../services/cartService')

module.exports = async (req, res) => {
	try {
		const userId = req.user._id
		const result = await checkoutCart(userId);
		sendConfirmationEmail(req.user.email, req.user.name)
		return res.status(200).send(result);

	}
	catch (e) {
		return res.status(500).send(e.message)
	}
}

