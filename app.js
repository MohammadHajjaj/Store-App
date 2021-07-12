const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Product = require('./src/models/product');
const Store = require('./src/models/store');
const storeRouter = require('./src/routers/stores/index.js')
const productsRouter = require('./src/routers/products/index.js')
const userRouter = require('./src/routers/users/index.js')
const cartRouter = require('./src/routers/cart/index.js')

app.listen(3000, () => {
	console.log('Listenting to port 3000')
})
const session = require('express-session');

require('./src/db/mongoose')
//use mongo store later
const sessionConfig = {
	secret: 'unloko',
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7
	}
}

app.use(session(sessionConfig))


app.use(express.json())
app.use(cartRouter)
app.use(userRouter)
app.use(storeRouter)
app.use(productsRouter)
module.exports = app