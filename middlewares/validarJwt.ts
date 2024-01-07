import { NextFunction, Request, Response } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";

import Usuario, { IUsuario } from "../models/usuario";

const validarJWT =async (req:Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers["x-token"] as string;

    if(!token) {
        res.status(401).json({
            msj: "No hay token en la petición"
        })
        return;
    }

    try {
        const claveSecreta = process.env.CLAVESECRETA as string;
        const payload = jwt.verify(token, claveSecreta) as JwtPayload;

        const {id} = payload;

        const usuarioConfirmado: IUsuario | null = await Usuario.findById(id);

        if(!usuarioConfirmado){
            res.status(401).json({
                msj: "Token no válido"
            })
            return;
        }

        req.body.usuarioConfirmado = usuarioConfirmado;

        req.body.id = id;

        next();
    }catch(error){
        console.log(error)
        res.status(401).json({
            msj: "Token no válido"
        })
    }

}

export default validarJWT;
