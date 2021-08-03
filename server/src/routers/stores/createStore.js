const { createStore } = require('../../services/storeService')
const Store = require('../../models/store');


module.exports = async (req, res) => {
  try {
    const newStore = new Store(req.body)
    if (req.user) {
      newStore.owner = req.user._id
      // console.log(req.body)
      await newStore.save()

      // console.log(req.session.user._id)
      return res.status(201).send(newStore);
    }
    else {
      return res.status(400).send("Log in first");

    }
    // const result = await createStore(req.body);
    // const store = await Store.find(result._id)
    // console.log(store)
    // // store.owner = req.session.user._id
    // await store.save()
    // return res.status(201).send(store);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
