const Product = require('../../models/product')
const Cart = require('../../models/cart')

module.exports = async (req, res) => {
	try {
		const userId = req.session.user._id
		const currentCart = await Cart.find({ owner: userId, status: "pending" })
		let product;
		if (currentCart.length === 0) {
			res.status(404).send("User doesn't have a cart")
		}
		else {
			currentCart[0].status = 'confirmed';
			for (item of currentCart[0].products) {
				product = await Product.findById(item.productId);
				product.stock = product.stock - item.quantity;
				await product.save();
			}
			let data = await currentCart[0].save();
			return res.status(200).send(data)
		}

	}
	catch (e) {
		return res.status(500).send(e.message)
	}
}

