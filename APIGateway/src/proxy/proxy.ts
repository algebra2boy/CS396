import { createProxyMiddleware } from "http-proxy-middleware";
import { Express } from 'express';
import { Route } from "../routes/routes";

export const setupProxies = (app: Express, routes: Route[]) => {
    routes.forEach(route => {
        app.use(route.url, createProxyMiddleware(route.proxy)); 
    });
}