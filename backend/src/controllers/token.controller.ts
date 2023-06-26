import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "../models";

export const refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const user = db.User.findOne({
        where: {
            refreshToken: refreshToken
        }
    });
    if (!user) return res.sendStatus(403);
    jwt.verify(
        refreshToken,
        "54321",
        (err: any, decoded: any) => {
            if (err || user.email !== decoded.email) return res.sendStatus(403);
            const roles = Object.values(user.roles);
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        id: user.id,
                        email: user.email,
                        roles: roles
                    }
                },
                "54321",
                {
                    expiresIn: '30d'
                }
            )
            res.json({ accessToken })
        }
    )
}