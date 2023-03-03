"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsController = void 0;
const database_1 = __importDefault(require("../database"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class ProductsController {
    constructor() {
        //* Subir imagen del producto e insertarlo a la tabla
        this.uploadImg = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const file = req.file;
            const fileImg = {
                codProducto: id,
                nombreImg: file === null || file === void 0 ? void 0 : file.originalname,
                urlImg: file === null || file === void 0 ? void 0 : file.path,
            };
            console.log('fileImg', fileImg);
            if (file) {
                console.log('file', file);
                yield database_1.default.query('INSERT INTO imagenes SET ?', [fileImg]);
                res.json({ code: 'SUCCESS' });
                return;
            }
            res.json({ code: 'NO_FILE' });
            return;
        });
    }
    //* Nueva producto
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield database_1.default.query('INSERT INTO productos SET ?', [req.body]);
            res.json({
                code: 'SUCCESS',
                object: {
                    insertId: query.insertId,
                },
            });
        });
    }
    // Guardar costos del producto
    saveCosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield database_1.default.query('INSERT INTO gastosProducto SET ?', [req.body]);
            console.log(query);
            res.json({
                code: 'SUCCESS',
            });
        });
    }
    //* Obtner productos con imagen
    getProductsImg(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield database_1.default.query(`
				SELECT PRD.codProducto, PRD.prodNombre, PRD.prodEstado, IMG.urlIMG, GPROD.prodPrecio
				FROM productos as PRD
				INNER JOIN imagenes as IMG
				ON PRD.codProducto = IMG.codProducto
				INNER JOIN gastosProducto as GPROD
				ON PRD.codProducto = GPROD.codProducto`);
            if (query.length > 0) {
                res.json({
                    code: 'SUCCESS',
                    object: query,
                });
            }
            else {
                res.json({
                    code: 'NO_DATA',
                });
            }
        });
    }
    //* Eliminar imagen de tabla de imagenes
    deleteImg(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const query1 = yield database_1.default.query('SELECT * FROM imagenes WHERE codProducto =?', [id]);
            if (query1.length > 0) {
                fs_1.default.unlink(path_1.default.resolve(query1[0].urlImg), (rs) => __awaiter(this, void 0, void 0, function* () {
                    const query2 = yield database_1.default.query('DELETE FROM imagenes WHERE codProducto =?', [id]);
                    if (query2.affectedRows > 0) {
                        const query3 = yield database_1.default.query('DELETE FROM productos WHERE codProducto =?', [id]);
                        if (query3.affectedRows > 0) {
                            return res.json({ code: 'SUCCESS' });
                        }
                    }
                }));
            }
            else {
                res.json({ code: 'ERROR' });
            }
        });
    }
}
exports.productsController = new ProductsController();
