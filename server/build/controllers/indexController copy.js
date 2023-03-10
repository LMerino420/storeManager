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
exports.indexController = void 0;
const database_1 = __importDefault(require("../database"));
class IndexController {
    //* Ruta raiz
    index(req, res) {
        res.json({ info: 'Welcome to server !!!' });
    }
    //* Obtener el total de los gastos
    expenses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield database_1.default.query('SELECT SUM(costoTotal) as expenses FROM gastosProducto');
            if (query.length > 0) {
                res.json({
                    code: 'SUCCESS',
                    object: query[0],
                });
            }
            else {
                res.status(404).json({
                    code: 'NOT_FOUND',
                });
            }
        });
    }
    //* Obtener el detalle de los gastos
    expensesDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield database_1.default.query(`
			SELECT 
				SUM(costoTotal) as Expenses,
				SUM(prodPrecio) as Producto ,
				SUM(costoLiberacion) as Liberacion , 
				SUM(costoEnvio) as Envio, 
				SUM(costoRepuestos) as Repuestos, 
				SUM(costoReparacion) as Reparacion 
			FROM gastosProducto
		`);
            if (query.length > 0) {
                res.json({
                    code: 'SUCCESS',
                    object: query[0],
                });
            }
            else {
                res.status(404).json({
                    code: 'NOT_FOUND',
                });
            }
        });
    }
}
exports.indexController = new IndexController();
