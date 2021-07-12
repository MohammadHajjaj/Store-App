const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        min: [0, 'Price must be above 0']
    },
    stock: {
        type: Number,
        min: [0, 'Price must be above 0']
    },

    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    }

})

const Product = mongoose.model('Product', productSchema);



module.exports = Product;