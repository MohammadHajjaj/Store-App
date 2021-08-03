const { Kafka } = require('kafkajs');
const express = require('express');

const config = require('./config');

const router = express.Router();

const kafka = new Kafka({
	clientId: 'kafka-store-app',
	brokers: [config.kafka_host + ':' + config.kafka_broker1_port, config.kafka_host + ':' + config.kafka_broker2_port, config.kafka_host + ':' + config.kafka_broker3_port]
})

const admin = kafka.admin();

module.exports = (req, res) => {
	const topic = {
		topic: req.body.topicName,
		numPartition: 1,
		replicationFactor: 3
	}

	const run = async () => {
		await admin.connect();
		let topicCreated = await admin.createTopics({
			waitForLeaders: true,
			topics: [topic]
		});
		console.log('topicCreated: ', topicCreated);
		if (topicCreated) {
			res.status(200).send('Topic:' + req.body.topicName + ' created');
			await admin.disconnect();

		} else {
			res.status(200).send('Topic:' + req.body.topicName + ' creation failed' + topicCreated);
		}
	}
	run().catch(console.error);
}



