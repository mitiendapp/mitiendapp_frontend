import { NextFunction, Request, Response } from "express";
import mercadopago from 'mercadopago';

export const createOrder = async(req:Request,res:Response,next:NextFunction)=>{

    mercadopago.configure({
        access_token:"TEST-5979417188444398-062800-d2d07c1dea382c16ce5091b6cd5a8f3b-1409740750"
    });

    const result = await mercadopago.preferences.create({
        items:[
            {
                title:"telefono",
                unit_price: 1000,
                currency_id: "COP",
                quantity:12
        }
        ]
    })
    res.send(result);
}