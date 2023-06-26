import { NextFunction, Response } from "express"

export const verifyRoles = (...allowedRoles:any)=>{  
    return (
        req:any,
        res:Response,
        next:NextFunction
    )=>{
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.roles);
        if(!req?.roles) return res.sendStatus(401);
        const result = req.roles.map((role: any) => rolesArray.includes(role)).find((val:any)=>val === true);
        if(!result) return res.sendStatus(401);
        next();
    }
}