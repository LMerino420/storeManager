import { Router } from 'express';
import { categoriesController } from '../controllers/categoriesController';

class CategoriesRoutes {
	public router: Router = Router();

	constructor() {
		this.config();
	}

	//* RUTAS PARA MANTENIMIENTO DE LA TABLA CATEGORIAS DE LA BDO
	config(): void {
		this.router.post('/newCategory', categoriesController.create);
		this.router.get('/listCategory', categoriesController.getList);
		this.router.get('/category/:id', categoriesController.getOne);
		this.router.put('/updateCategory/:id', categoriesController.update);
		this.router.delete('/deleteCategory/:id', categoriesController.delete);
	}
}

const categoriesRoutes = new CategoriesRoutes();
export default categoriesRoutes.router;
