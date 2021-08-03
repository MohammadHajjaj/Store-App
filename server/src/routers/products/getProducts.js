const { allProducts } = require('../../services/productService');

module.exports = async (req, res) => {
  try {
    const result = await allProducts();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(result);
  }
};
