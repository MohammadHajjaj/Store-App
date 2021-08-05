const { Kafka } = require('kafkajs');
const config = require('./config');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Stores-extended', {
	userNewUrlPrase: true,
	useCreateIndex: true
})
const kafka = new Kafka({
	clientId: 'kafka-store-app',
	brokers: ['dory-01.srvs.cloudkafka.com:9094', 'dory-02.srvs.cloudkafka.com:9094', 'dory-03.srvs.cloudkafka.com:9094'],
	// authenticationTimeout: 1000,
	// reauthenticationThreshold: 10000,
	ssl: true,
	sasl: {
		mechanism: 'scram-sha-256', // scram-sha-256 or scram-sha-512
		username: 't59siqyb',
		password: 'yT4JrliUX6j-jwQumOmub_A8kzkP_XqR'
	},
})

const Product = require('../../models/product')
const Cart = require('../../models/cart')
const { checkoutCart } = require('../../services/cartService')

const consumer = kafka.consumer({ groupId: 'store-app' });

const run = async () => {
	await consumer.connect();
	await consumer.subscribe({ topic: 't59siqyb-default' });

	await consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			const { key, value } = message
			const userId = key.toString()
			const id = mongoose.Types.ObjectId(userId)
			const data = value.toString()
			const result = await checkoutCart(id, data);
			console.log({ userId, data })
			console.log(result)

		}
	});
}

run().catch(console.error);