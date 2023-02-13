import {Request, Response} from 'express';
import db from '../database';

class CategoriesController {
	// Nueva categoria
	public async create(req: Request, res: Response): Promise<void> {
		await db.query('INSERT INTO categorias set ?', [req.body]);
		res.json({code: 'SUCCESS'});
	}

	// Obtener lista de categorias
	public async getList(req: Request, res: Response): Promise<any> {
		const games = await db.query('SELECT * FROM categorias');

		if (games.length > 0) {
			return res.json({
				code: 'SUCCESS',
				object: games,
			});
		}
		return res.status(404).json({
			code: 'NOT_FOUND',
		});
	}

	// Obtener una categoria
	public async getOne(req: Request, res: Response): Promise<any> {
		const {id} = req.params;
		const game = await db.query(
			'SELECT * FROM categorias WHERE codCategoria = ?',
			[id]
		);

		if (game.length > 0) {
			return res.json({
				code: 'SUCCESS',
				object: game[0],
			});
		}
		return res.status(404).json({
			code: 'NOT_FOUND',
		});
	}

	// Actualizar una categoria
	public async update(req: Request, res: Response): Promise<void> {
		const {id} = req.params;
		await db.query('UPDATE categorias SET ? WHERE codCategoria = ?', [
			req.body,
			id,
		]);
		res.json({code: 'SUCCESS'});
	}

	// Eliminar una categoria
	public async delete(req: Request, res: Response): Promise<void> {
		const {id} = req.params;
		await db.query('DELETE FROM categorias WHERE codCategoria = ?', [id]);
		res.json({code: 'SUCCESS'});
	}
}

export const categoriesController = new CategoriesController();
