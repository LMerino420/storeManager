import {Router} from 'express';
import {productsController} from '../controllers/productsController';

class ProductsRoutes {
	public router: Router = Router();

	constructor() {
		this.config();
	}

	config(): void {
		this.router.post('/newProduct', productsController.create);
		// this.router.get('/listCategory', categoriesController.getList);
		// this.router.get('/category/:id', categoriesController.getOne);
		// this.router.put('/updateCategory/:id', categoriesController.update);
		// this.router.delete('/deleteCategory/:id', categoriesController.delete);
	}
}

const productsRoutes = new ProductsRoutes();
export default productsRoutes.router;
