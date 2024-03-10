import express, {Request, Response} from 'express'
import cors from 'cors'
import "dotenv/config" // import env  vars like MONGODB_CONnpNECTION_STRING..
import mongoose from 'mongoose' // to connect & interact with the db
import userRoutes from"./routes/users";
import authRoutes from"./routes/auth";
import myHotelsRoutes from"./routes/my-hotels";
import cookieParser from "cookie-parser";
import path from "path";
import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string) // it could be undefined

const app = express();
app.use(cookieParser());
app.use(express.json());  // convert body of api requests to json automatically
app.use(express.urlencoded({extended: true})); // parse url & routes
app.use(cors({
    // it is for security to prevnt some requests from certain urls
    // accept requests only from the frontend urls and only when there are credentials
    origin: process.env.FRONTEND_URL,
    credentials: true,
}

));
 
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/my-hotels", myHotelsRoutes);

app.get("*", (req:Request, res: Response)=>{
    res.sendFile(path.join(__dirname, "../../frontend/index.html"));
}) 

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{  // start the server
    console.log(`server running on localhost:${PORT}`)
});