"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//* RUTA RAIZ DEL SERVIDOR
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', indexController_1.indexController.index);
        this.router.get('/expenses', indexController_1.indexController.expenses);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
