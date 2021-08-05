import { Request, Response } from 'express';
import { dao } from '../dao/usuarioDAO';
import { utils } from '../utils/utils';

class UsuarioController {
    /**
     *  Nombre: lista
     *  Descripcion: lista de usuarios de la base de datos
     *  Resultado: json con informacion de  usuarios registrados.
     */
    public async lista(req: Request, res: Response) {
        try {
            const result = await dao.lista();
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     *  Nombre: insert
     *  Descripcion: insertar datos de un nuevo usuario
     *  Resultado: json con mensaje.
     */
    public async insert(req: Request, res: Response) {
        try {
            const { username, password, cveRol, nombre, apellidos } = req.body;

            // Verificar parametros
            if (username == null || password == null || cveRol == null) {
                return res.status(409).json({ message: "Los campos son requeridos" });
            }

            // Verificar longitud de caracteres
            if(username.length > 150){
                return res.status(500).json({message : "La longitud maxima del usuario es de 150 caracteres"});
            }

            // Verificar nombre de usuario
            const verify = await dao.verificarUsuario(username);
            if(verify.length > 0){
                return res.status(500).json({message : "El usuario ya existe"});
            }

            // Verificar Rol
            const verifyRol = await dao.verificarRol(cveRol);
            if(verifyRol.length <= 0) {
                return res.status(500).json({message : "El rol no existe o no esta disponible"});
            }

            // Encriptar contraseña
            const encryptedPassword = await utils.hashPassword(password);

            // Llamar objetos
            const user = {
                nombre,
                apellidos,
                username,
                password: encryptedPassword,
                cveRol
            }

            // Insercion de datos
            const result = await dao.insert(user);

            if (result.affectedRows > 0) {
                return res.json({ message: "Datos guardados exitosamente" });
            } else {
                return res.status(409).json({ message: result.message });
            }
            res.json(result);
        } catch (ex) {
            res.status(500).json({ message: ex.message });
        }
    }
}

export const usuarioController = new UsuarioController();