import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from 'jsonwebtoken';
import db from "../models";
import bcrypt from 'bcrypt';

export const loginUser: RequestHandler = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    interface RequestBody {
        email: string,
        password: string
    }
    const { email, password }: RequestBody = req.body;
    console.log(email, password);

    if (!email || !password) return res.status(400).json({ "message": "Correo y contraseña son requeridos" });
    const user = await db.User.findOne({
        where: {
            email: email
        }
    }).catch((err: Error) => {
        console.error(err);
    })
    if(!user){
        return res.status(404).json({
            message: "Verifique nuevamente el correo o la contraseña"
        })
    }
        
    const match = await bcrypt.compare(password, user.password);
    if (!user || !match) {
        return res.status(401).json({
            message: "Correo o contraseña incorrectos"
        }) 
    }
    try {

        const userRoles = JSON.parse(user.roles)

        const roles = Object.values(userRoles);

        const accessToken = jwt.sign(
            {
                UserInfo: {
                    id: user.id,
                    email: user.email,
                    roles: roles
                }
            },
            "12345",
            {
                expiresIn: "30d"
            })
        const refreshToken = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            "54321",
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Ingreso exitoso",
            token: accessToken
        })

    } catch (error) {
        res.status(500).json({
            message: "¡Ups! Algo salió mal"
        })
        next(error);
    }
}

export const loginTest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return res.send("funciona")

}