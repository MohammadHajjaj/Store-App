const mongoServices = require('./mongoService')
const Store = require('../models/store');

exports.createStore = async (data) => {
	const newStore = await mongoServices.createStore(data)
	return newStore;
};

exports.AllStores = () => {
	const stores = mongoServices.getStores();
	return stores;
}

exports.singleStore = (storeId) => {
	const store = mongoServices.getStore(storeId);
	return store;
}

exports.updateStore = async (data) => {
	const updatedStore = await mongoServices.updateStore(data)
	return updatedStore;
}

exports.deleteStore = async (storeId) => {
	const deletedStore = await mongoServices.deleteStore(storeId);
	return deletedStore;
}

exports.addProductToStore = async (data) => {
	const newProduct = await mongoServices.createProduct(data);
	return newProduct;
}
