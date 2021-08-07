const Product = require('../../models/product')
const Cart = require('../../models/cart')
const { addToCart } = require('../../services/cartService')
const mongoServices = require('../../services/mongoService')

module.exports = async (req, res) => {
	try {
		const productId = req.params.id;

		let quantity;
		if (req.body.quantity) {
			quantity = Number.parseInt(req.body.quantity);
		}
		else { quantity = 1 }
		if (req.user) {
			const userId = req.user._id
			const result = await addToCart(userId, productId, quantity);
			return res.status(200).send(result);
		}
		else {
			const product = await mongoServices.getProduct(productId);

			// if there is no user, save cart info in a session
			if (!req.session.cart) {
				//check if quantity is more than the stock available
				if (quantity > product.stock) {
					throw new Error('not enough in stock')
				}
				const cartData = {
					products: [{
						productId: { "_id": productId, "name": product.name, "stock": product.stock },
						quantity: quantity,
						total: parseInt(product.price * quantity),
						stock: product.stock,
						image: product.image
					}],
					subTotal: parseInt(product.price * quantity),
					status: 'pending',
				}
				req.session.cart = cartData;
				return res.status(200).send(req.session.cart)

			}

			//if the session have a cart created already, check first if the product he is adding already exist
			else {
				//check if the product already exist
				if (quantity > product.stock) {
					throw new Error('not enough in stock')
				}
				const exisistingProductIndex = req.session.cart.products.findIndex(
					(product) => product.productId._id.toString() === productId.toString());
				const existingProduct = req.session.cart.products[exisistingProductIndex];

				// if the product already exist, just update its info with the new quantity
				if (existingProduct) {
					if (existingProduct.quantity + quantity > product.stock) {
						throw new Error('not enough in stock')
					}
					req.session.cart.products[exisistingProductIndex].quantity = req.session.cart.products[exisistingProductIndex].quantity + quantity;
					req.session.cart.products[exisistingProductIndex].total = req.session.cart.products[exisistingProductIndex].quantity * product.price;
					req.session.cart.subTotal = req.session.cart.products.map(product => product.total).reduce((acc, next) => acc + next);

					return res.status(200).send(req.session.cart)
				}
				//if the product doesn't already exist , push the new product to the cart
				else {
					if (quantity > product.stock) {
						throw new Error('not enough in stock')
					}
					req.session.cart.products.push({
						productId: { "_id": productId, "name": product.name, "stock": product.stock, "image": product.image },
						quantity: quantity,
						price: product.price,
						total: parseInt(product.price * quantity)
					})
					req.session.cart.subTotal = req.session.cart.products.map(product => product.total).reduce((acc, next) => acc + next);
					return res.status(200).send(req.session.cart)
				}

			}

		}

	}
	catch (e) {
		return res.status(500).send(e.message)
	}
}

