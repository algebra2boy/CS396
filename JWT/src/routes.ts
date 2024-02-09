import { Router, Request, Response } from "express";
import { generateToken } from "./utils";
import { expressjwt } from 'express-jwt';

const route = Router();

const jwtAuth = expressjwt({
    secret: process.env.JWT_SECRET || 'secretCat',
    algorithms: ["HS256"]
})

route.post('/login', (req: Request, res: Response) => {

    const { username, password } = req.body;

    if (!username || !password) {
        res.status(404).json({ message: "Bad request" });
    }

    res.status(200).json({
        username,
        password,
        token: generateToken(username)
    });

});

route.post('/profile', jwtAuth, (req: Request, res: Response) => {
    res.status(200).json({ message: "Successfully retrieve profile" });
});

export default route;