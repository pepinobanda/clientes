import { Request, Response } from 'express';
import { dao } from '../dao/clienteDAO';
import { utils } from '../utils/utils';

class ClienteController {
    /**

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

     */
    public async insert(req: Request, res: Response) {
        try {
            const { nombre, apellidos, tipoCliente, cveUsuarioFK } = req.body;

            // Verificar parametros
            if (nombre == null || apellidos == null) {
                return res.status(409).json({ message: "Los campos son requeridos" });
            }

            // Verificar longitud de caracteres
            if(nombre.length > 250){
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
}

export const clienteController = new ClienteController();