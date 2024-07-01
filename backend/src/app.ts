import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {v2 as cloudinary} from "cloudinary";

import userRoute from "./routes/user"


const port = 4000;

mongoose.connect(process.env.MONGO_URI!,{
    dbName: "Project"
}).then(()=>console.log("Connected to MongoDb Successfully"))
  .catch((err)=>console.log(err));

cloudinary.config({
    cloud_name: 'djtng5bvs',
    api_key: '972222121166597',
    api_secret: '5RETbKZ7x0DMvm2MZYqDrx7HiBM',
})

const app = express();

app.use(express.json());

app.use(cookieParser())

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.use("/api/v1/user", userRoute);

app.get("/",(req, res)=>{
    res.send("API working with /api/v1");
});

app.listen(port, ()=> {
    console.log(`Server is working on http://localhost:5000`)
})