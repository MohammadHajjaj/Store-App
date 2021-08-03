const { Kafka } = require('kafkajs');
const config = require('./config');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Stores-extended', {
	userNewUrlPrase: true,
	useCreateIndex: true
})
const kafka = new Kafka({
	clientId: 'kafka-store-app',
	brokers: [config.kafka_host + ':' + config.kafka_broker1_port, config.kafka_host + ':' + config.kafka_broker2_port, config.kafka_host + ':' + config.kafka_broker3_port]
	// brokers: ['localhost:9092']
})

const Product = require('../../models/product')
const Cart = require('../../models/cart')
const { checkoutCart } = require('../../services/cartService')

const consumer = kafka.consumer({ groupId: 'test-store-group' });

const run = async () => {
	await consumer.connect();
	await consumer.subscribe({ topic: 'userCart' });

	await consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			const { key, value } = message
			const userId = key.toString()
			const id = mongoose.Types.ObjectId(userId)
			const data = value.toString()
			const result = await checkoutCart(id, data);
			console.log({ userId, id, data })
			console.log(result)

		}
	});
}

run().catch(console.error);