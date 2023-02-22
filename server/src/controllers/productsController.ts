//* CONTROLADOR DE LA RUTA DE PRODUTOS
import { Request, Response } from 'express';
import db from '../database';

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
			SELECT PRD.prodNombre, PRD.prodPrecio, PRD.prodEstado, IMG.urlIMG
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
}

export const productsController = new ProductsController();
