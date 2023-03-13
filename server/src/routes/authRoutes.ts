import { Router } from 'express';
import { authController } from '../controllers/authController';

class AuthRoutes {
	public router: Router = Router();

	constructor() {
		this.config();
	}

	//* RUTAS PARA MANTENIMIENTO DE LA TABLA CATEGORIAS DE LA BDO
	config(): void {
		this.router.post('/registUser', authController.regist);
		this.router.post('/login', authController.login);
		// this.router.post('/test', authController.test);
	}
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;
