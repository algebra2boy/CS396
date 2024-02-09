import jwt from "jsonwebtoken";

export const generateToken = (userName: string): string => {
    const payload = { user: userName }
    const secretKey = 'secretCat';
    const expireTime = "10s";
    return jwt.sign(payload, secretKey, { expiresIn: expireTime });
}

