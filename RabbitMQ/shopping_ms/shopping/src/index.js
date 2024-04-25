import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send({ message: 'Hello from product!' });
});

app.listen(8003, () => {
    console.log('Customer service is running on port 8003');
});