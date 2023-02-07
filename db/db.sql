CREATE DATABASE db_store_manager;

USE db_store_manager;

CREATE TABLE categories(
    codCategory INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    categName VARCHAR(150) 
);

CREATE TABLE products(
    codProduct INT(11) NOT NULL  PRIMARY KEY,
    productName VARCHAR(150),
    productPrice DECIMAL(9,2),
    productDescription VARCHAR(350),
    productState VARCHAR(10),
    codCategory INT(11),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (codCategory) REFERENCES categories(codCategory)
);

CREATE TABLE sellers(
    codSeller INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    sellerName VARCHAR(150),
    sellerLastName VARCHAR(150),
    sellerContact INT
);

CREATE TABLE customers(
    codCustomer INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customerName VARCHAR(150),
    customerLastName VARCHAR(150),
    customerMail VARCHAR(260),
    customerTel INT
);

CREATE TABLE assignments (
    codSeller INT(11) NOT NULL,
    codProduct INT(11) NOT NULL,
    assigned TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (codSeller) REFERENCES sellers(codSeller),
    FOREIGN KEY (codProduct) REFERENCES products(codProduct)
);

CREATE TABLE sales(
    codSeller INT(11) NOT NULL,
    codProduct INT(11) NOT NULL,
    codCustomer INT(11),
    sellingPrice DECIMAL(9,2),
    sold TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (codSeller) REFERENCES sellers(codSeller),
    FOREIGN KEY (codProduct) REFERENCES products(codProduct),
    FOREIGN KEY (codCustomer) REFERENCES customers(codCustomer)
);

