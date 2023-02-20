import { Request, Response } from 'express';
import db from '../database';

class ProductsController {
	// Nueva producto
	public async create(req: Request, res: Response): Promise<void> {
		await db.query('INSERT INTO productos SET ?', [req.body]);
		res.json({ code: 'SUCCESS' });
	}

	public uploadImg = async (req: Request, res: Response) => {
		const file = req.file;
		const fileImg = {
			codProducto: 0,
			nombreImg: file?.originalname,
			urlImg: file?.path,
		};

		console.log('fileImg', fileImg);

		if (file) {
			await db.query('INSERT INTO imagenes SET ?', [fileImg]);
			res.json({ code: 'SUCCESS' });
		}
		res.json({ code: 'NO_FILE' });
	};
}

export const productsController = new ProductsController();
