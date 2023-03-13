//* CONTROLADOR DE LA RUTA RAIZ DEL SERVIDOR
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import db from '../database';

class AuthController {
	//* Registrar usuario
	public async regist(req: Request, res: Response): Promise<void> {
		const { ustPwd } = req.body;
		req.body.ustPwd = await bcryptjs.hash(ustPwd, 10);
		const query = await db.query('INSERT INTO usuarios SET usrEstado = false, codTipo = 2, ?', [req.body]);
		if (query.insertId > 0) {
			res.json({ code: 'SUCCESS' });
		} else {
			res.json({ code: 'ERROR' });
		}
	}

	//* Iniciar sesión
	public async login(req: Request, res: Response): Promise<void> {
		const { userName, password } = req.body;
		const query = await db.query('SELECT * FROM usuarios WHERE usrNick = ?', [userName]);
		// Valdar la existencia del usuario
		if (query.length > 0) {
			const data = query[0];
			// Validar la contraseña
			const compare = await bcryptjs.compare(password, data.ustPwd);
			if (compare) {
				res.json({
					code: 'SUCCESS',
				});
			} else {
				res.json({ code: 'INVALID_PWD' });
			}
		} else {
			res.json({ code: 'NO_DATA' });
		}
	}
}

export const authController = new AuthController();
