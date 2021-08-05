const { Kafka } = require('kafkajs');
const express = require('express');
const config = require('./config');

const router = express.Router();

const kafka = new Kafka({
	clientId: 'kafka-store-app',
	brokers: [config.kafka_host + ':' + config.kafka_broker1_port, config.kafka_host + ':' + config.kafka_broker2_port, config.kafka_host + ':' + config.kafka_broker3_port]
	// authenticationTimeout: 1000,
	// reauthenticationThreshold: 10000,
})


const producer = kafka.producer();

const sendMessage = (data) => {
	console.log(data);
	const { key, value } = data.message
	return producer
		.send({
			topic: data.topicName,
			messages: [
				{ key, value: JSON.stringify(value) },
			]
		})
		.then(console.log)
		.catch(e => console.error(`error ${e.message}`, e))
}

module.exports = (req, res) => {
	const run = async () => {
		await producer.connect();
		result = sendMessage(req.body);
		res.status(200).send('Message sent: ' + result);
	}
	run().catch(e => console.error(`error ${e.message}`, e))
}

