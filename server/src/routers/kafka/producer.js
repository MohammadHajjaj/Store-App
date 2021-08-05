const { Kafka } = require('kafkajs');
const express = require('express');
const config = require('./config');

const router = express.Router();

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

