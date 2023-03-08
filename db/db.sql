CREATE DATABASE db_store_manager;

USE db_store_manager;

CREATE TABLE categorias(
    codCategoria INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    categNombre VARCHAR(150) 
);

CREATE TABLE productos(
    codProducto INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    prodNombre VARCHAR(150),
    prodDescripcion VARCHAR(350),
    prodEstado VARCHAR(10),
    codCategoria INT(11),
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (codCategoria) REFERENCES categorias(codCategoria)
);

CREATE TABLE imagenes(
	codProducto INT(11) NOT NULL,
    nombreImg VARCHAR(150),
    urlImg VARCHAR(180),
    imgCreada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (codProducto) REFERENCES productos(codProducto)
);

CREATE TABLE gastosProducto(
	codProducto INT(11) NOT NULL,
    prodPrecio DECIMAL(9,2),
    costoLiberacion DECIMAL(9,2),
    costoEnvio DECIMAL(9,2),
    costoRepuestos DECIMAL(9,2),
    costoReparacion DECIMAL(9,2),
    costoTotal DECIMAL(9,2),
    FOREIGN KEY (codProducto) REFERENCES productos(codProducto)
);

CREATE TABLE clientes(
    codCliente INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cliNombre VARCHAR(150),
    cliApellido VARCHAR(150),
    cliCorreo VARCHAR(260),
    cliTel INT
);

CREATE TABLE tipo_usuario(
	codTipo INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tipoNombre VARCHAR(150)
);

CREATE TABLE usuarios(
	codUsuario INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    usrNombre VARCHAR(150),
    usrMail VARCHAR(260),
    usrNick VARCHAR(50),
    ustPwd VARCHAR(260),
    codTipo INT(11) NOT NULL,
    FOREIGN KEY (codTipo) REFERENCES tipo_usuario(codTipo)
);

CREATE TABLE asignaciones(
	codUsuario INT(11) NOT NULL,
    codProducto INT(11) NOT NULL,
    comentario VARCHAR(350),
    recibido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (codUsuario) REFERENCES usuarios(codUsuario),
    FOREIGN KEY (codProducto) REFERENCES productos(codProducto)
);

CREATE TABLE venta_enc(
	codVenta INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    codUsuario INT(11) NOT NULL,
    codCliente INT(11),
    vendido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (codUsuario) REFERENCES usuarios(codUsuario),
    FOREIGN KEY (codCliente) REFERENCES clientes(codCliente)
);

CREATE TABLE venta_detalle(
	codVenta INT(11) NOT NULL,
    codProducto INT(11) NOT NULL,
    valVenta DECIMAL(9,2),
    FOREIGN KEY (codVenta) REFERENCES venta_enc(codVenta),
    FOREIGN KEY (codProducto) REFERENCES productos(codProducto)
);

CREATE TABLE venta_pie(
	codVenta INT(11) NOT NULL,
    cantidadProdutos INT(3),
    totalVenta DECIMAL(9,2),
    FOREIGN KEY (codVenta) REFERENCES venta_enc(codVenta)
);
