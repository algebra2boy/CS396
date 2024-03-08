import express from 'express';
import 'dotenv/config';

import { setupLogging } from './logging/logging';
import { ROUTES } from './routes/routes';
import { setupProxies } from './proxy/proxy';
import { setupAuth } from './auth/auth';
import { setupRateLimit } from './rateLimit/rateLimit';

const app = express();

/**
 * Dependencies configurations
 */

setupLogging(app);
setupRateLimit(app, ROUTES);
setupAuth(app, ROUTES);
setupProxies(app, ROUTES);

/**
 * Server Listening for connections
 */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`the server is running on port ${PORT}`);
});
