import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error";
import ErrorHandler from "../utils/utility";
import { uploadFilesToCloudinary } from "../utils/features";
import jwt from 'jsonwebtoken';
import { User } from "../models/user";

interface NewUserRequestBody {
    name: string;
    email: string;
    username: string,
    password: string,
    bio: string,
}
const newUser = TryCatch(async (req: Request<{}, {}, NewUserRequestBody>, res: Response, next: NextFunction) =>{
    const {name, email, username, password, bio} = req.body;
    const file:Express.Multer.File = req.file!;
    if(!file) return next(new ErrorHandler("Please Upload Avatar", 404));
    
    const result = await uploadFilesToCloudinary([file]);
    
    const avatar = {
        public_id: result[0].public_id,
        url: result[0].url,
    }

    const user = await User.create({
        name,
        email,
        bio,
        username,
        password,
        avatar,
    })


    const token = jwt.sign({_id: user._id}, "qwertyuiopasdfghjklzxcvbnm");

    return res.status(201).cookie("token", token, {maxAge: 15*24*60*60*1000, sameSite: "none", httpOnly: true, secure: true}).json({
        success: true,
        user,
        message: "User Created Successfully",
    })
})

export {newUser}