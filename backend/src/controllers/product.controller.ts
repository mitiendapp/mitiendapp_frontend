import { RequestHandler } from "express-serve-static-core";
import db from "../models";
import { NextFunction, Request, Response } from "express";

export const createProduct: RequestHandler = async (
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    const product = await db.Product.create({...req.body})
        return res.status(201).json(
            {
                message:"Product created succesfully",
                data:product
            }
        )
        next();
}