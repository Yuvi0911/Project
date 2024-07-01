import { NextFunction, Request, Response } from "express";

type ControllerType = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>

const TryCatch = (passedFFunc: ControllerType) => async(req: Request, res: Response, next: NextFunction) => {
    try{
        await passedFFunc(req, res, next);
    }
    catch(error) {
        next(error);
    }
}

export {TryCatch};