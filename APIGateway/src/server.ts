
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import 'dotenv/config';

import { setupLogging } from './logging/logging';
import { ROUTES } from './routes/routes';
import { setupProxies } from './proxy/proxy';

const app = express();

/**
 * Dependencies configurations
 */

setupLogging(app);
app.use(helmet());
app.use(cors());
app.use(express.json());
setupProxies(app, ROUTES);

/**
 * Server Listening for connections
 */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`the server is running on port ${PORT}`);
});
