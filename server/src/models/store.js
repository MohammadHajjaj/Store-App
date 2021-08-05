const mongoose = require('mongoose');
const storeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    image: {
        type: String,
        default: 'https://source.unsplash.com/collection/4598857'
    }


})


const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
