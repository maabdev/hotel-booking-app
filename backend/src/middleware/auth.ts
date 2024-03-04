import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request{
            userId: string; // to add the userId property to the request object
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["auth_token"];
    if(!token) return res.status(401).json({message: "unauthorized"});
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string); // verify that the token was creted by us not someone else
        req.userId = (decoded as JwtPayload).userId;
         next();
    } catch (error) {
        return res.status(401).json({message: "unauthorized"});
    }
}

export default verifyToken;