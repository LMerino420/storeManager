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
}
exports.productsController = new ProductsController();
