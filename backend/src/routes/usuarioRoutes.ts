import { Router } from 'express';
import {usuarioController} from '../controllers/usuarioController';
import { checkJwt } from '../middleware/jwt';
import { checkRol } from '../middleware/roles';

class UsuarioRoutes {
    public router: Router = Router();

    constructor() { 
        this.config();
    }

    config(): void {
        this.router.get('/', [checkJwt, checkRol([1])], usuarioController.lista);
        this.router.put('/', [checkJwt, checkRol([1])], usuarioController.insert);
    }
}

const usuariosRoutes = new UsuarioRoutes();
export default usuariosRoutes.router;