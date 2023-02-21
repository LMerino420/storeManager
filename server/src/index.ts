//* IMPORTACIONES DE MODULOS Y LIBRERIAS
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

//* IMPORTACION DE RUTAS
import indexRoutes from './routes/indexRoutes';
import categoriesRoutes from './routes/categoriesRoutes';
import productsRoutes from './routes/productsRoutes';

class Server {
	public app: Application;

	//* CONSTRUCTOR DEL SERVER
	constructor() {
		this.app = express();
		this.config();
		this.routes();
	}

	//* CONFIGURACION DE MODULOS , LIBRERIAS Y PUERTOS
	config(): void {
		this.app.set('port', process.env.PORT || 3000);
		this.app.use(morgan('dev'));
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
	}

	//* RUTAS PARA EL SERVIDOR
	routes(): void {
		this.app.use('/', indexRoutes);
		this.app.use('/categories', categoriesRoutes);
		this.app.use('/products', productsRoutes);
	}

	//* ASIGNACION DE PUERTO PARA LEVANTAR EL SERVIDOR
	start(): void {
		this.app.listen(this.app.get('port'), () => {
			console.log('Server on port [' + this.app.get('port') + ']');
		});
	}
}

const server = new Server();
server.start();
