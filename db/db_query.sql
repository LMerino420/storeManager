/* --------------------------------------------------------
SELECCIONAR BASE DE DATOS
-------------------------------------------------------- */
USE db_store_manager;

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
SELECT PRD.codProducto, PRD.prodNombre, PRD.prodEstado, IMG.urlIMG, GPROD.prodPrecio
FROM productos as PRD
INNER JOIN imagenes as IMG
ON PRD.codProducto = IMG.codProducto
INNER JOIN gastosProducto as GPROD
ON PRD.codProducto = GPROD.codProducto;

/*Obtner datos del producto para editar*/
SELECT 
	PRD.codProducto, PRD.prodNombre, PRD.prodEstado, 
    IMG.urlIMG, GPROD.prodPrecio, GPROD.costoLiberacion,
    GPROD.costoEnvio, GPROD.costoRepuestos, GPROD.costoReparacion
FROM productos as PRD
INNER JOIN imagenes as IMG
ON PRD.codProducto = IMG.codProducto
INNER JOIN gastosProducto as GPROD
ON PRD.codProducto = GPROD.codProducto
WHERE PRD.codProducto = 1;

/* --------------------------------------------------------
TRUNCAR TABLAS
-------------------------------------------------------- */
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE productos;
TRUNCATE imagenes;
TRUNCATE gastosProducto;
SET FOREIGN_KEY_CHECKS = 1;