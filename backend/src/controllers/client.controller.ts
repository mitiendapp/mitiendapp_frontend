import { NextFunction, Request, RequestHandler, Response } from "express";
import db from "../models";

export const createClient: RequestHandler = async (
    req:Request,
    res:Response,
    ) => {
    const client = await db.Client.create({...req.body});
    try {
        return res.status(201).json(
            {
                message: "Client created succesfully",
                data:client
            }
        )
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        })
    }

}