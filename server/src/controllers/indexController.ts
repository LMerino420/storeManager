import {Request, Response} from 'express';

class IndexController {
	public index(req: Request, res: Response) {
		res.json({info: 'Welcome to server !!!'});
	}
}

export const indexController = new IndexController();
