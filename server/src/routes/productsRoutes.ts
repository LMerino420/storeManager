import { Router } from 'express';
import { productsController } from '../controllers/productsController';

import multer from 'multer';
// import path from 'path';

class ProductsRoutes {
	public router: Router = Router();

	constructor() {
		this.config();
	}

	config(): void {
		// CONFIGURACION PARA GUARDAR ARCHIVO EN DIRECTORIO ESPECIFICO
		const storage = multer.diskStorage({
			destination: (req, file, callBack) => {
				callBack(null, 'imgProducts');
			},
			filename: (req, file, callBack) => {
				callBack(null, file.originalname);
			},
		});
		const upload = multer({ storage });

		//* RUTAS PARA EL MANTENIMIENTO DE LA TABLA DE IMAGENES
		this.router.post('/uploadImage/:id', upload.single('file'), productsController.uploadImg);

		//* RUTAS PARA EL MANTENIMIENTO DE LA TABLA DE PRODUCTOS
		this.router.post('/newProduct', productsController.create);
		this.router.get('/prodImg', productsController.getProductsImg);
		this.router.get('/deleteImg/:id', productsController.deleteImg);

		//* RUTAS PARA EL MANTENIMIENTO DE LA TABLA DE GASTOSPRODUCTO
		this.router.post('/saveCosts', productsController.saveCosts);
		this.router.get('/getProductDetail/:id', productsController.getProductDetail);
		this.router.put('/updateCosts/:id', productsController.updateCosts);
	}
}

const productsRoutes = new ProductsRoutes();
export default productsRoutes.router;
