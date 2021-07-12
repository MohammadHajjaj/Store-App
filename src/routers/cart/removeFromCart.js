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
		}
		//find the product in the cart and completly delete it
		const exisistingProductIndex = currentCart[0].products.findIndex(
			(product) => product.productId.toString() === productId.toString());

		const existingProduct = currentCart[0].products[exisistingProductIndex];
		if (existingProduct) {
			const filteredCart = currentCart[0].products.filter((product) => product.productId.toString() !== productId.toString());
			currentCart[0].products = filteredCart;
			//calculate the new subtotal same way we did when adding items
			if (currentCart[0].products.length !== 0) {
				const newSubTotal = currentCart[0].products.map(product => product.total).reduce((acc, next) => acc + next)
				currentCart[0].subTotal = newSubTotal;
				let data = await currentCart[0].save();
				return res.status(200).send(data)
			}
			else {
				currentCart[0].subTotal = 0;
				let data = await currentCart[0].save();
				return res.status(200).send(data)
			}
		}
		else {
			res.status(404).send("product doesn't exist in cart")
		}
	}


	catch (e) {
		return res.status(500).send(e.message)
	}
}
