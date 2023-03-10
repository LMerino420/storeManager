"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//* CONEXION A LA BASE DE DATOS
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const keys_1 = __importDefault(require("./keys"));
const db = promise_mysql_1.default.createPool(keys_1.default.database);
db.getConnection().then((con) => {
    db.releaseConnection(con);
    console.log('Database connected');
});
exports.default = db;
