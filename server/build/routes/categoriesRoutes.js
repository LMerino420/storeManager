"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriesController_1 = require("../controllers/categoriesController");
class CategoriesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    //* RUTAS PARA MANTENIMIENTO DE LA TABLA CATEGORIAS DE LA BDO
    config() {
        this.router.post('/newCategory', categoriesController_1.categoriesController.create);
        this.router.get('/listCategory', categoriesController_1.categoriesController.getList);
        this.router.get('/category/:id', categoriesController_1.categoriesController.getOne);
        this.router.put('/updateCategory/:id', categoriesController_1.categoriesController.update);
        this.router.delete('/deleteCategory/:id', categoriesController_1.categoriesController.delete);
    }
}
const categoriesRoutes = new CategoriesRoutes();
exports.default = categoriesRoutes.router;
