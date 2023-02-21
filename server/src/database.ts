//* CONEXION A LA BASE DE DATOS
import mysql from 'promise-mysql';
import keys from './keys';

const db = mysql.createPool(keys.database);

db.getConnection().then((con) => {
	db.releaseConnection(con);
	console.log('Database connected');
});

export default db;
