const { updateStore } = require('../../services/storeService')

module.exports = async (req, res) => {
    try {
        const data = {
            id: req.params.id,
            ...req.body
        }
        const result = await updateStore(data);
        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send({ errorMsg: error.message })
    }
}