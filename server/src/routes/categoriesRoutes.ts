import {Router} from 'express';
import {categoriesController} from '../controllers/categoriesController';

class CategoriesRoutes {
	public router: Router = Router();

	constructor() {
		this.config();
	}

	config(): void {
		this.router.post('/newCategory', categoriesController.create);
		this.router.get('/listCategory', categoriesController.getList);
		this.router.get('/category/:id', categoriesController.getOne);
		this.router.put('/updateCategory/:id', categoriesController.update);
	}
}

const categoriesRoutes = new CategoriesRoutes();
export default categoriesRoutes.router;
