import express from 'express';
import 'dotenv/config';

import { setupLogging } from './logging/logging';
import { ROUTES } from './routes/routes';
import { setupProxies } from './proxy/proxy';
import { setupAuth } from './auth/auth';
import { setupRateLimit } from './rateLimit/rateLimit';
import { setupCheckCredit } from './creditCheck/creditcheck';

const app = express();

/**
 * Dependencies configurations
 */

setupLogging(app);
setupRateLimit(app, ROUTES);
setupAuth(app, ROUTES);
setupCheckCredit(app, ROUTES);
setupProxies(app, ROUTES);

/**
 * Server Listening for connections
 */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`the server is running on port ${PORT}`);
});
