import e, { NextFunction, Request, Response } from "express";
import mercadopago from 'mercadopago';
let url= "https://1741-179-19-67-119.ngrok.io"
export const createOrder = async(req:Request,res:Response,next:NextFunction)=>{
    try{
    mercadopago.configure({
        access_token:"TEST-5979417188444398-062800-d2d07c1dea382c16ce5091b6cd5a8f3b-1409740750"
    });
    console.log("entra 1");
    const result = await mercadopago.preferences.create({
        items:[
            {
                title:"telefono",
                unit_price: 1000,
                currency_id: "COP",
                quantity:12
        }],
        back_urls:{
            success: "http://localhost:4200/",
            failure: "http://localhost:3000/api/order/failure",
            pending: "http://localhost:3000/api/order/pending"
        },
        notification_url: `${url}/api/order/webhook`
    })
    console.log("entra 2");
    res.send(result.body);
}catch(err){
    res.sendStatus(500);
}
}

export const receiveWebhook = async(req:Request,res:Response,next:NextFunction)=>{
    console.log(req.query);
    const payment:any = req.query;
    try{
    if(payment.type =='payment'){
       const data = await mercadopago.payment.findById(payment['data.id'])
    }
    res.sendStatus(204);
    }catch(err){
        console.log(err);
        return res.send(500).json({message: err})
        
    }
}

export const orderSuccess =async (req:Request,res:Response,next:NextFunction) => {
    //window.location.href="http://localhost:4200";
    res.sendStatus(200);
}
