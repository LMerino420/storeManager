import { Router } from 'express';
import { productsController } from '../controllers/productsController';

import multer from 'multer';

class ProductsRoutes {
	public router: Router = Router();

	constructor() {
		this.config();
	}

	config(): void {
		// CONFIGURACION PARA GUARDAR ARCHIVO EN DIRECTORIO ESPECIFICO
		const storage = multer.diskStorage({
			destination: (req, file, callBack) => {
				callBack(null, './src/imgProducts');
			},
			filename: (req, file, callBack) => {
				callBack(null, file.originalname);
			},
		});
		const upload = multer({ storage });

		//* RUTAS PARA EL MANTENIMIENTO DE LA TABLA DE IMAGENES
		this.router.post(
			'/uploadImage/:id',
			upload.single('file'),
			productsController.uploadImg,
		);

		//* RUTAS PARA EL MANTENIMIENTO DE LA TABLA DE PRODUCTOS
		this.router.post('/newProduct', productsController.create);

		// this.router.get('/listCategory', categoriesController.getList);
		// this.router.get('/category/:id', categoriesController.getOne);
		// this.router.put('/updateCategory/:id', categoriesController.update);
		// this.router.delete('/deleteCategory/:id', categoriesController.delete);
	}
}

const productsRoutes = new ProductsRoutes();
export default productsRoutes.router;
