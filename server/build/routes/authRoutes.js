"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    //* RUTAS PARA MANTENIMIENTO DE LA TABLA CATEGORIAS DE LA BDO
    config() {
        this.router.post('/registUser', authController_1.authController.regist);
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
