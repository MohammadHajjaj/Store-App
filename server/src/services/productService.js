const mongoServices = require('./mongoService');
const Product = require('../models/product');


exports.allProducts = () => {
	const Products = mongoServices.getProducts();
	return Products;
}

exports.singleProduct = (productId) => {
	const product = mongoServices.getProduct(productId);
	return product;
}

exports.updateProduct = async (data) => {
	const updatedproduct = await mongoServices.updateProduct(data)
	return updatedproduct;
}


exports.deleteProduct = async (productId) => {
	const deletedProduct = await mongoServices.deleteProduct(productId)
	return deletedProduct;
}
