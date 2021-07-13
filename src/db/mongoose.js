const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL, {
	userNewUrlPrase: true,
	useCreateIndex: true
})