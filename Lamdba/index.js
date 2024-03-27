import express from 'express';
import serverless from 'serverless-http';

const app = express();

// Following this article: https://aws.plainenglish.io/deploying-a-node-express-api-on-aws-lambda-c9730a17f932
// Package index.js, node_modules, package.json, package-lock.json into a zip file
app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

export const handler = serverless(app);