//* CONTROLADOR DE LA RUTA DE CATEGORIAS
import { Request, Response } from 'express';
import db from '../database';

class CategoriesController {
	//* Nueva categoria
	public async create(req: Request, res: Response): Promise<void> {
		const query = await db.query('INSERT INTO categorias set ?', [req.body]);
		if (query.insertId > 0) {
			res.json({ code: 'SUCCESS' });
		} else {
			res.json({ code: 'ERROR' });
		}
	}

	//* Obtener lista de categorias
	public async getList(req: Request, res: Response): Promise<any> {
		const listCategories = await db.query('SELECT * FROM categorias');
		if (listCategories.length > 0) {
			return res.json({
				code: 'SUCCESS',
				object: listCategories,
			});
		} else {
			return res.status(404).json({
				code: 'NOT_FOUND',
			});
		}
	}

	//* Obtener una categoria
	public async getOne(req: Request, res: Response): Promise<any> {
		const { id } = req.params;
		const category = await db.query('SELECT * FROM categorias WHERE codCategoria = ?', [id]);
		if (category.length > 0) {
			return res.json({
				code: 'SUCCESS',
				object: category[0],
			});
		} else {
			return res.status(404).json({
				code: 'NOT_FOUND',
			});
		}
	}

	//* Actualizar una categoria
	public async update(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const query = await db.query('UPDATE categorias SET ? WHERE codCategoria = ?', [req.body, id]);
		if (query.affectedRows > 0) {
			res.json({ code: 'SUCCESS' });
		} else {
			res.json({ code: 'ERROR' });
		}
	}

	//* Eliminar una categoria
	public async delete(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const query = await db.query('DELETE FROM categorias WHERE codCategoria = ?', [id]);
		if (query.affectedRows > 0) {
			res.json({ code: 'SUCCESS' });
		} else {
			res.json({ code: 'ERROR' });
		}
	}
}

export const categoriesController = new CategoriesController();
