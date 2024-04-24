#!/usr/bin/env node

import amqp from 'amqplib';

const queue = 'hello';
const text = 'Hello World!';

(async () => {
    let connection;
    try {
        // Connect to the RabbitMQ server
        connection = await amqp.connect('amqp://127.0.0.1');

        // Create a channel
        const channel = await connection.createChannel();

        // Declare a queue named 'hello' to send messages to 
        // durable: false means that the queue will not survive a broker restart
        await channel.assertQueue(queue, { durable: false });

        // Send a message to the queue
        channel.sendToQueue(queue, Buffer.from(text));
        console.log(" [x] Sent '%s'", text);
        await channel.close();

    } catch (error) {
        console.error(error);
        process.exit(1);
    } finally {
        if (connection) await connection.close();
    }
})();