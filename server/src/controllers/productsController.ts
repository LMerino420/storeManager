//* CONTROLADOR DE LA RUTA DE PRODUTOS
import { Request, Response } from 'express';
import db from '../database';
import fs from 'fs';
import path from 'path';

class ProductsController {
	//* Nueva producto
	public async create(req: Request, res: Response): Promise<void> {
		const query = await db.query('INSERT INTO productos SET ?', [req.body]);
		res.json({
			code: 'SUCCESS',
			object: {
				insertId: query.insertId,
			},
		});
	}

	//* Subir imagen del producto e insertarlo a la tabla
	public uploadImg = async (req: Request, res: Response) => {
		const { id } = req.params;
		const file = req.file;

		const fileImg = {
			codProducto: id,
			nombreImg: file?.originalname,
			urlImg: file?.path,
		};

		console.log('fileImg', fileImg);
		if (file) {
			console.log('file', file);
			await db.query('INSERT INTO imagenes SET ?', [fileImg]);
			res.json({ code: 'SUCCESS' });
			return;
		}
		res.json({ code: 'NO_FILE' });
		return;
	};

	//* Obtner productos con imagen
	public async getProductsImg(req: Request, res: Response): Promise<void> {
		const query = await db.query(`
			SELECT PRD.codProducto, PRD.prodNombre, PRD.prodPrecio, PRD.prodEstado, IMG.urlIMG
			FROM productos as PRD
			INNER JOIN imagenes as IMG
			ON PRD.codProducto = IMG.codProducto`);

		if (query.length > 0) {
			res.json({
				code: 'SUCCESS',
				object: query,
			});
		} else {
			res.json({
				code: 'NO_DATA',
			});
		}
	}

	//* Eliminar imagen de tabla de imagenes
	public async deleteImg(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const query1 = await db.query('SELECT * FROM imagenes WHERE codProducto =?', [id]);
		if (query1.length > 0) {
			fs.unlink(path.resolve(query1[0].urlImg), async (rs) => {
				const query2 = await db.query('DELETE FROM imagenes WHERE codProducto =?', [id]);
				if (query2.affectedRows > 0) {
					const query3 = await db.query('DELETE FROM productos WHERE codProducto =?', [id]);
					if (query3.affectedRows > 0) {
						return res.json({ code: 'SUCCESS' });
					}
				}
			});
		} else {
			res.json({ code: 'ERROR' });
		}
	}
}

export const productsController = new ProductsController();
