import { Request, Response, NextFunction } from "express";
import { JWT_KEY, ResponseCodes } from "./env";
import jwt from "jsonwebtoken"
import { AuthJWTPayload } from ".";

export const AuthMiddleware = (req:Request,res:Response, next:NextFunction) =>{
    try{
        const Auth = req.headers["authorization"];
        if(!Auth){
            return res.status(ResponseCodes.BadRequest).json({msg:"Faulty Authorization, retry later"});
        }
        const token = Auth.split(" ")[1]
        if(!token){
            return res.status(ResponseCodes.BadRequest).json({msg:"Faulty Authorisation, retry later"});
        }
        const decode = jwt.verify(token,JWT_KEY) as AuthJWTPayload;
        req.user = decode;
        next();

    }catch(err : unknown){
        if(err instanceof Error){
            res.status(ResponseCodes.InternalError).json({msg:"Error occured: ",err});
        }else{
            res.status(ResponseCodes.InternalError).json({msg:"Unknown error occured",err});
        }
    }
}