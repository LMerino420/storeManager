//* CONTROLADOR DE LA RUTA RAIZ DEL SERVIDOR
import { Request, Response } from 'express';
import db from '../database';

class IndexController {
	//* Ruta raiz
	public index(req: Request, res: Response) {
		res.json({ info: 'Welcome to server !!!' });
	}

	//* Obtener el total de los gastos
	public async expenses(req: Request, res: Response): Promise<void> {
		const query = await db.query('SELECT SUM(costoTotal) as expenses FROM gastosProducto');
		if (query.length > 0) {
			res.json({
				code: 'SUCCESS',
				object: query[0],
			});
		} else {
			res.status(404).json({
				code: 'NOT_FOUND',
			});
		}
	}
}

export const indexController = new IndexController();
