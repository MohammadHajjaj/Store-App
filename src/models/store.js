const mongoose = require('mongoose');
const storeSchema = mongoose.Schema({
    name: {
        type: String,
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

})


const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
