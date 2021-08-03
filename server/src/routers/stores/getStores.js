const { AllStores } = require('../../services/storeService');

module.exports = async (req, res) => {
  try {
    const result = await AllStores();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
