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
            const { nombre, apellidos, tipoCliente, cveUsuarioFK } = req.body;

            // Verificar parametros
            if (nombre == null || apellidos == null) {
                return res.status(409).json({ message: "Los campos son requeridos" });
            }

            // Verificar nombre longitud de caracteres
            if(nombre.length > 250){
                return res.status(500).json({message : "La longitud maxima del nombre es de 250 caracteres"});
            }

            // Verificar apellidos longitud de caracteres
            if(apellidos.length > 450){
                return res.status(500).json({message : "La longitud maxima del nombre es de 250 caracteres"});
            }

            // Verificar Rol
            const verifyRol = await dao.verificarRol(tipoCliente);
            if(verifyRol.length <= 0) {
                return res.status(500).json({message : "El rol no existe o no esta disponible"});
            }

            // Llamar objetos
            const user = {
                nombre,
                apellidos,
                tipoCliente,
                cveUsuarioFK
            }

            // Insercion de datos
            const result = await dao.insert(user);

            if (result.affectedRows > 0) {
                return res.json({ message: "Cliente guardado exitosamente" });
            } else {
                return res.status(409).json({ message: result.message });
            }
            res.json(result);
        } catch (ex) {
            res.status(500).json({ message: ex.message });
        }
    }

    //update
    public async update(req: Request, res: Response) {
        try {

            const usuario = req.body;

            if(usuario.cveCliente == null){
                return res.status(400).json({message : "No se puede actualizar"});
            }

            const result = await dao.update(usuario);
            if(result.affectedRows > 0){
                res.json({message : "El cliente se ha actualizado de manera correcta."});
            }else{
                res.status(400).json({message : result.message});
            }

            

        } catch (ex) {
            res.status(500).json({ message: ex.message });
        }
    }

    //Eliminar
    public async delete(req: Request, res: Response) {
        try {
            const { cveCliente } = req.params;

            if(cveCliente == null){
                return res.status(400).json({ message: "No se pude eliminar" });
            }


            // delete
            const result = await dao.delete(cveCliente);
            if (result.affectedRows > 0) {
                return res.json({ message: "Cliente eliminado exitosamente" });
            } else {
                return res.status(400).json({ message: result.message });
            }
            res.json(result);

        } catch (ex) {
            res.status(500).json({ message: ex.message });
        }
    }

}

export const usuarioController = new UsuarioController();