const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
	{
		products: [
			{
				productId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
				},
				quantity: {
					type: Number,
					required: true
				},
				total: {
					type: Number,
					required: true,
				}
			}
		],
		subTotal: {
			type: Number,
			default: 0,
		},

		status: {
			type: String,
			enum: ['pending', 'confirmed'],
			default: 'pending'
		},

		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	},
	{ timestamps: true }
);
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
