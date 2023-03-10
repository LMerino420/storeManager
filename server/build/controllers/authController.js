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
exports.authController = void 0;
const database_1 = __importDefault(require("../database"));
class AuthController {
    //* Registrar usuario
    regist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield database_1.default.query('INSERT INTO usuarios SET usrEstado = false, codTipo = 2, ?', [req.body]);
            if (query.insertId > 0) {
                res.json({ code: 'SUCCESS' });
            }
            else {
                res.json({ code: 'ERROR' });
            }
        });
    }
}
exports.authController = new AuthController();
