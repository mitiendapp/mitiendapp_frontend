import { NextFunction, Request, RequestHandler, Response } from "express";
import db from "../models";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const registerUser: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { firstName, lastName, email, password, roles, status } = req.body;
    if (!email || !password) return res.status(400).json({ "message": "El correo y la contraseña son requeridos" });

    const exists = await db.User.findOne({
        where: {
            email: req.body.email
        }
    }).catch((err: Error) => {
        console.error(err);
    });
    if (exists) return res.status(409).json({
        message: "El correo ya se encuentra registrado"
    })
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.User.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:hashedPassword,
            roles:roles,
            status:status
        }).then(()=>{
            return res.status(201).json({
                message: "El usuario fue registrado con exito"
            })
        }).catch((err: Error) => {
            console.error(err);
            next(err);
        });
        

    } catch (error) {
        res.status(500).json({
            message: "¡Ups! Algo salió mal"
        })
        next(error);
    }
}