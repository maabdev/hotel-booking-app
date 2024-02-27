import express, {Request, Response} from "express";
import {check, validationResult} from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";

const router = express.Router();

router.post("/login", [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({min: 6}),
], async (req: Request, res: Response) => {
    const errs = validationResult(req);
    if(!errs.isEmpty()) {
        return res.status(400).json({message: errs.array()});
    };
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: "Invalid Credentials"}); // we say invalid credentials to prevent hackers from getting information about users
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: "Invalid Credentials"});
        }
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY as string, {
            expiresIn: "1d",
        });
        res.cookie("auth_token", token, {
            maxAge: 86400000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });
        return res.status(200).json({message: "Login successful", userId: user._id});
        
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Something went wrong"});
    };
});
export default router;