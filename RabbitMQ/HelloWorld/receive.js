#!/usr/bin/env node

import amqp from 'amqplib';

const queue = 'hello';

(async () => {
    try {
        // Connect to the RabbitMQ server
        const connection = await amqp.connect('amqp://localhost');

        // Create a channel
        const channel = await connection.createChannel();

        // control + c to exit
        process.once('SIGINT', async () => {
            await channel.close();
            await connection.close();
        });

        // Declare a queue named 'hello' to send messages to
        await channel.assertQueue(queue, { durable: false });

        // Consume messages from the queue
        // noAck: true means that the broker won't expect an acknowledgment of messages delivered to this consumer
        await channel.consume(queue, (message) => {
            console.log(" [x] Received '%s'", message.content.toString());
        }, { noAck: true });

        console.log(' [*] Waiting for messages. To exit press CTRL+C');
    } catch (err) {
        console.warn(err);
    }
})();