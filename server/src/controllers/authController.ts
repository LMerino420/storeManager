//* CONTROLADOR DE LA RUTA RAIZ DEL SERVIDOR
import { Request, Response } from 'express';
import db from '../database';

class AuthController {
	//* Registrar usuario
	public async regist(req: Request, res: Response): Promise<void> {
		const query = await db.query('INSERT INTO usuarios SET usrEstado = false, codTipo = 2, ?', [req.body]);
		if (query.insertId > 0) {
			res.json({ code: 'SUCCESS' });
		} else {
			res.json({ code: 'ERROR' });
		}
	}
}

export const authController = new AuthController();
