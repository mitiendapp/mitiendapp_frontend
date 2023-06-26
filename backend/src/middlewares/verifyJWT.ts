import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyJWT = (
    req: any,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
   console.log("HEADER:", authHeader);
   
   
    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    console.log("TOKEN: ", token);
    
    jwt.verify(
        token,
        "12345",
        (err:any, decoded:any)=>{       
            if(err) return res.status(403).json({
                message:err
            });
            req.email = decoded.UserInfo.email;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    )
}