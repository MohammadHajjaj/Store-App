const Product = require('../../models/product')
const Cart = require('../../models/cart')

module.exports = async (req, res) => {
	try {
		const productId = req.params.id;
		const userId = req.session.user._id
		const product = await Product.findById(productId);
		const currentCart = await Cart.find({ owner: userId, status: "pending" })

		if (currentCart.length === 0) {
			res.status(404).send("User doesn't have a cart")

			//check if quantity is more than the stock available
		}
		else {
			//find the product in the cart
			const exisistingProductIndex = currentCart[0].products.findIndex(
				(product) => product.productId.toString() === productId.toString());
			const existingProduct = currentCart[0].products[exisistingProductIndex];

			if (existingProduct.quantity + 1 > product.stock) {
				return res.status(400).send("not enough in stock")
			}

			// add quantity+1, change the other stuff depending on that
			if (existingProduct) {
				currentCart[0].products[exisistingProductIndex].quantity = currentCart[0].products[exisistingProductIndex].quantity + 1;
				currentCart[0].products[exisistingProductIndex].total = currentCart[0].products[exisistingProductIndex].quantity * product.price;
				currentCart[0].subTotal = currentCart[0].products.map(product => product.total).reduce((acc, next) => acc + next);
				let data = await currentCart[0].save();
				return res.status(200).send(data)
			}
		}
	}
	catch (e) {
		return res.status(500).send(e.message)
	}
}
