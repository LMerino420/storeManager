/* --------------------------------------------------------
SELECCIONAR BASE DE DATOS
-------------------------------------------------------- */
USE db_store_manager;

ALTER TABLE gastosProducto
ADD costoTotal DECIMAL(9,2);

/* --------------------------------------------------------
CATEGORIAS
-------------------------------------------------------- */
SELECT * FROM categorias;

/* --------------------------------------------------------
PRODUCTOS
-------------------------------------------------------- */
SELECT * FROM productos;
SELECT * FROM imagenes;
SELECT * FROM gastosProducto;

/*Obtener el detalle del producto*/
SELECT PRD.codProducto, PRD.prodNombre, PRD.prodEstado, IMG.urlIMG, GPROD.costoTotal
FROM productos as PRD
INNER JOIN imagenes as IMG
ON PRD.codProducto = IMG.codProducto
INNER JOIN gastosProducto as GPROD
ON PRD.codProducto = GPROD.codProducto;

/*Obtner datos del producto para editar*/
SELECT 
	PRD.codProducto, PRD.prodNombre, PRD.prodEstado, 
    IMG.urlIMG, GPROD.costoTotal, GPROD.prodPrecio, GPROD.costoLiberacion,
    GPROD.costoEnvio, GPROD.costoRepuestos, GPROD.costoReparacion
FROM productos as PRD
INNER JOIN imagenes as IMG
ON PRD.codProducto = IMG.codProducto
INNER JOIN gastosProducto as GPROD
ON PRD.codProducto = GPROD.codProducto
WHERE PRD.codProducto = 1;

/*Eliminar producto*/
DELETE FROM gastosProducto WHERE codProducto = 5;
DELETE FROM imagenes WHERE codProducto = 5;
DELETE FROM productos WHERE codProducto = 5;

/*Suma de los gastos*/
SELECT * FROM gastosProducto;
SELECT SUM(costoTotal) FROM gastosProducto;
SELECT 
	SUM(costoTotal) as Total ,
	SUM(prodPrecio) as Producto ,
	SUM(costoLiberacion) as Liberacion , 
    SUM(costoEnvio) as Envio, 
    SUM(costoRepuestos) as Repuestos, 
    SUM(costoReparacion) as Reparacion 
FROM gastosProducto;


/* --------------------------------------------------------
TRUNCAR TABLAS
-------------------------------------------------------- */
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE productos;
TRUNCATE imagenes;
TRUNCATE gastosProducto;
SET FOREIGN_KEY_CHECKS = 1;