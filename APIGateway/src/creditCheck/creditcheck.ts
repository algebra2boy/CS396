import { Express, NextFunction, Request, Response, } from "express";
import { Route } from "../routes/routes";


const checkCredit = (req: Request) => {
    return new Promise((resolve, reject) => {
        console.log("Checking credit with token", req.headers?.authorization ?? "no token");
        setTimeout(() => {
            reject('No sufficient credits');
        }, 500);
    });
}

export const setupCheckCredit = (app: Express, routes: Route[]) => {
    routes.forEach(route => {
        if (route.creditCheck) {
            app.use(route.url, (req: Request, res: Response, next: NextFunction) => {
                checkCredit(req)
                    .then(() => {
                        next();
                    })
                    .catch((error) => {
                        res.status(402).send({ error });
                    });
            });
        }
    });
}