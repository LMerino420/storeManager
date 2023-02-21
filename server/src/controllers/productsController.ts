import { Request, Response } from 'express';
import db from '../database';

class ProductsController {
	// Nueva producto
	public async create(req: Request, res: Response): Promise<void> {
		const query = await db.query('INSERT INTO productos SET ?', [req.body]);
		res.json({
			code: 'SUCCESS',
			object: {
				insertId: query.insertId,
			},
		});
	}

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
			await db.query('INSERT INTO imagenes SET ?', [fileImg]);
			res.json({ code: 'SUCCESS' });
			return;
		}
		res.json({ code: 'NO_FILE' });
		return;
	};
}

export const productsController = new ProductsController();
