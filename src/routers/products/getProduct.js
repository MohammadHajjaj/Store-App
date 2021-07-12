const { singleProduct } = require('../../services/productService');
const Product = require('../../models/product');

module.exports = async (req, res) => {
  try {
    const result = await singleProduct(req.params.id);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};

