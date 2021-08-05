import { Router } from 'express';
import {clienteController} from '../controllers/clienteController';
import { checkJwt } from '../middleware/jwt';
import { checkRol } from '../middleware/roles';

class ClienteRoutes {
    public router: Router = Router();

    constructor() { 
        this.config();
    }

    config(): void {

        this.router.get('/', [checkJwt, checkRol([1])], clienteController.lista);
        this.router.put('/', [checkJwt, checkRol([1])], clienteController.insert);
        this.router.put('/', [checkJwt, checkRol([1])], clienteController.insert);
    }
}

const clienteRoutes = new ClienteRoutes();
export default clienteRoutes.router;