const { deleteStore } = require('../../services/storeService');

module.exports = async (req, res) => {
  try {
    const result = await deleteStore(req.params.id);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};

