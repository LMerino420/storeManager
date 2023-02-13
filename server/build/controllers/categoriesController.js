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
exports.categoriesController = void 0;
const database_1 = __importDefault(require("../database"));
class CategoriesController {
    // Nueva categoria
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO categorias set ?', [req.body]);
            res.json({ code: 'SUCCESS' });
        });
    }
    // Obtener lista de categorias
    getList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield database_1.default.query('SELECT * FROM categorias');
            if (games.length > 0) {
                return res.json({
                    code: 'SUCCESS',
                    object: games,
                });
            }
            return res.status(404).json({
                code: 'NOT_FOUND',
            });
        });
    }
    // Obtener una categoria
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const game = yield database_1.default.query('SELECT * FROM categorias WHERE codCategoria = ?', [id]);
            if (game.length > 0) {
                return res.json({
                    code: 'SUCCESS',
                    object: game[0],
                });
            }
            return res.status(404).json({
                code: 'NOT_FOUND',
            });
        });
    }
    // Actualizar una categoria
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE categorias SET ? WHERE codCategoria = ?', [
                req.body,
                id,
            ]);
            res.json({ code: 'SUCCESS' });
        });
    }
    // Eliminar una categoria
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM categorias WHERE codCategoria = ?', [id]);
            res.json({ code: 'SUCCESS' });
        });
    }
}
exports.categoriesController = new CategoriesController();
