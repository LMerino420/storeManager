import {Request, Response} from 'express';
import db from '../database';

class ProductsController {
	// Nueva producto
	public async create(req: Request, res: Response): Promise<void> {
		await db.query('INSERT INTO productos set ?', [req.body]);
		res.json({code: 'SUCCESS'});
	}

	public uploadImg = async (req: Request, res: Response) => {
		const file = req.file;
		const fileImg = {
			codProducto: 0,
			nombreImg: file?.originalname,
			urlImg: file?.path,
		};

		console.log('fileImg', fileImg);

		if (!file) {
			res.json({code: 'NO_FILE'});
		}

		res.json({
			code: 'SUCCESS',
		});
	};
}

export const productsController = new ProductsController();
