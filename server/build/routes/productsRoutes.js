"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsController_1 = require("../controllers/productsController");
class ProductsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/newProduct', productsController_1.productsController.create);
        // this.router.get('/listCategory', categoriesController.getList);
        // this.router.get('/category/:id', categoriesController.getOne);
        // this.router.put('/updateCategory/:id', categoriesController.update);
        // this.router.delete('/deleteCategory/:id', categoriesController.delete);
    }
}
const productsRoutes = new ProductsRoutes();
exports.default = productsRoutes.router;
