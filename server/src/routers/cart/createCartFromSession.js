const mongoServices = require('../../services/mongoService')
const Cart = require('../../models/cart')

module.exports = async (req, res) => {

	const currentCart = await mongoServices.getCurrentCart({ owner: req.user._id, status: "pending" })
	// if user don't have a cart, create one
	if (currentCart.length === 0) {
		//check if quantity is more than the stock available
		const newCart = new Cart(req.session.cart);
		newCart.owner = req.user._id
		var data = await newCart.save();
		return res.status(200).send(data)

	}

}