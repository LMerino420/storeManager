"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//* IMPORTACIONES DE MODULOS Y LIBRERIAS
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
//* IMPORTACION DE RUTAS
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const categoriesRoutes_1 = __importDefault(require("./routes/categoriesRoutes"));
const productsRoutes_1 = __importDefault(require("./routes/productsRoutes"));
class Server {
    //* CONSTRUCTOR DEL SERVER
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    //* CONFIGURACION DE MODULOS , LIBRERIAS Y PUERTOS
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    //* RUTA PARA CARPETA PUBLICA
    publicResource() {
        const publicPath = path_1.default.resolve(__dirname, '../imgProducts');
        this.app.use('/imgProducts', express_1.default.static(publicPath));
    }
    //* RUTAS PARA EL SERVIDOR
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/categories', categoriesRoutes_1.default);
        this.app.use('/products', productsRoutes_1.default);
    }
    //* ASIGNACION DE PUERTO PARA LEVANTAR EL SERVIDOR
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port [' + this.app.get('port') + ']');
        });
        this.publicResource();
    }
}
const server = new Server();
server.start();
