import Keycloak from 'keycloak-connect';
import session from 'express-session';
import { Route } from '../routes/routes';
import { Express, NextFunction, Request, Response } from 'express';

export const setupAuth = (app: Express, routes: Route[]) => {
    // Create a new instance of Keycloak
    const memoryStore = new session.MemoryStore();
    const keycloak = new Keycloak({ store: memoryStore });

    // Add the Keycloak middleware to the Express app
    app.use(
        session({
            secret: 'mySecret',
            resave: false, // don't save session if unmodified
            saveUninitialized: true, // always create session to ensure the cookie is set
            store: memoryStore,
        }),
    );

    app.use(keycloak.middleware());

    routes.forEach(route => {
        if (route.auth) {
            app.use(
                route.url,
                keycloak.protect(),
                (_req: Request, _res: Response, next: NextFunction) => {
                    next();
                },
            );
        }
    });
};
