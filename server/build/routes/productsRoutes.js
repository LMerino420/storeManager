"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsController_1 = require("../controllers/productsController");
const multer_1 = __importDefault(require("multer"));
// import path from 'path';
class ProductsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // CONFIGURACION PARA GUARDAR ARCHIVO EN DIRECTORIO ESPECIFICO
        const storage = multer_1.default.diskStorage({
            destination: (req, file, callBack) => {
                callBack(null, 'imgProducts');
            },
            filename: (req, file, callBack) => {
                callBack(null, file.originalname);
            },
        });
        const upload = (0, multer_1.default)({ storage });
        //* RUTAS PARA EL MANTENIMIENTO DE LA TABLA DE IMAGENES
        this.router.post('/uploadImage/:id', upload.single('file'), productsController_1.productsController.uploadImg);
        //* RUTAS PARA EL MANTENIMIENTO DE LA TABLA DE PRODUCTOS
        this.router.post('/newProduct', productsController_1.productsController.create);
        this.router.get('/prodImg', productsController_1.productsController.getProductsImg);
        this.router.get('/deleteImg/:id', productsController_1.productsController.deleteImg);
        //* RUTAS PARA EL MANTENIMIENTO DE LA TABLA DE GASTOSPRODUCTO
        this.router.post('/saveCosts', productsController_1.productsController.saveCosts);
        this.router.get('/getProductDetail/:id', productsController_1.productsController.getProductDetail);
        this.router.put('/updateCosts/:id', productsController_1.productsController.updateCosts);
    }
}
const productsRoutes = new ProductsRoutes();
exports.default = productsRoutes.router;
