import {Request, Response} from 'express';
import db from '../database';

class ProductsController {
	// Nueva producto
	public async create(req: Request, res: Response): Promise<void> {
		await db.query('INSERT INTO productos set ?', [req.body]);
		res.json({code: 'SUCCESS'});
	}
}

export const productsController = new ProductsController();
