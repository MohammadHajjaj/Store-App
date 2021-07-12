const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Stores-extended', {
	userNewUrlPrase: true,
	useCreateIndex: true
})