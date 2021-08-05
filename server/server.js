const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Product = require('./src/models/product');
const Store = require('./src/models/store');
const storeRouter = require('./src/routers/stores/index.js')
const productsRouter = require('./src/routers/products/index.js')
const userRouter = require('./src/routers/users/index.js')
const cartRouter = require('./src/routers/cart/index.js')
const kafkaRouter = require('./src/routers/kafka/index.js')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./src/models/user');

const cors = require('cors');
const session = require('express-session');

const cookieParser = require('cookie-parser');

const MongoStore = require('connect-mongo');

const corsConfig = {
	credentials: true,
	origin: true,
};
app.use(cors(corsConfig));



const port = process.env.PORT
app.listen(port, () => {
	console.log(`Listenting to port ${port}`)
})

require('./src/db/mongoose')
//use mongo store later

app.use(cookieParser('secret'));

const sessionConfig = {
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	store: MongoStore.create({
		mongoUrl: process.env.MONGODB_URL
	}),
	cookie: {
		httpOnly: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7
	}
}

app.use(session(sessionConfig))
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	console.log(req.session)
	console.log(req.user)
	next();
})


app.use(express.json())
app.use(cartRouter)
app.use(userRouter)
app.use(storeRouter)
app.use(productsRouter)
app.use(kafkaRouter)

module.exports = app