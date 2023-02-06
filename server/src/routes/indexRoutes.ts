import {Router} from 'express';

class IndexRoutes {
	public router: Router = Router();

	constructor() {}

	config(): void {
		this.router.get('/', (req, res) => res.send('HELLO'));
	}
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
