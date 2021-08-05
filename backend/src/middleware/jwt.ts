import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import secretKey from '../config/jwtKey';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = String(req.headers['auth']);
    let jwtPayLoad: any;

    try {
        jwtPayLoad = jwt.verify(token, secretKey.jwtSecret);
        res.locals.jwtPayLoad = jwtPayLoad;
    } catch (error) {
        return res.status(404).json({message : "No autorizado"});
    }

    const {cveUsuario, username, cveRol, rol} = jwtPayLoad;
    const newToken = jwt.sign({cveUsuario, username, cveRol, rol}, secretKey.jwtSecret, {expiresIn : '1h'});
    res.setHeader('token', newToken);
    next();
}