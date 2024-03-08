import rateLimit from 'express-rate-limit';
import { Express } from 'express';
import { Route } from '../routes/routes';

export const setupRateLimit = (app: Express, routes: Route[]) => {
    routes.forEach(route => {
        if (route.rateLimit) {
            app.use(route.url, rateLimit(route.rateLimit));
        }
    });
};
