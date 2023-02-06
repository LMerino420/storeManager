"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
    }
    config() {
        this.router.get('/', (req, res) => res.send('HELLO'));
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
