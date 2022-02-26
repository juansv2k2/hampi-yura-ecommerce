-- drop database if exists

DROP DATABASE hampi_db;

-- we create database hampiyura
CREATE DATABASE hampi_db character set utf8;

-- we use database hampiyura
USE hampi_db;

-- we create the tables


  -- user table
  CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  fullName VARCHAR(100) NOT NULL,
  birthdate date NULL NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  avatar VARCHAR(100) NOT NULL,
  admin TINYINT NOT NULL DEFAULT 0
);

-- products table
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price DECIMAL NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(100) NOT NULL,
  createdAt DATETIME,
  updatedAt DATETIME,
  deletedAt DATETIME DEFAULT NULL,
  category VARCHAR(100) NOT NULL,
  stock INT NOT NULL,
  destacado TINYINT NOT NULL DEFAULT 0
);

-- compra cart
CREATE TABLE carts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  date DATE NOT NULL,
  id_user INT NOT NULL,
  FOREIGN KEY (id_user) REFERENCES users(id)
  );

-- carts_products table
CREATE TABLE carts_products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  priceUnit DECIMAL NOT NULL,
  quantity INT NOT NULL,
  id_product INT NOT NULL,
  FOREIGN KEY (id_product) REFERENCES products(id),
  id_cart INT NOT NULL,
  FOREIGN KEY (id_cart) REFERENCES carts(id)
);


INSERT INTO users (id, fullName, birthdate, email, password, avatar, admin)
VALUES 

(default, 
"Admin",
"2021-10-12", 
"admin@hampiyura.com", 
"$2a$10$sPG1Hpzent0DOygDHEuu9u5G3FoCft6OXvR8684V4SFgQSIP3aREq",
"logo2.png",
1), 
(default,
"Bárbara Rivas Eizmendi",
"1989-10-19",
"bar.rivas@gmail.com",
"$2a$10$pIpNnyopectu.mHVrogtve5pllHP0/GSkTUoeTcaahmrqtK5ZnFPS",
"1635977443621_img.jpeg",
0);

INSERT INTO products (id, name, price, description, image, deletedAt, category, stock, destacado)
VALUES

        (1,
        "Shampoo sólido - cabello seco",
        600,
        "Sahmpoo sólido para cabello seco",
        "shampoo-seco.jpg",
        null,
        "Higiene",
        5,
        1),

        (default,
         "Pasta dental",
         300,
         "Pasta dental para que tengas lo mejores dientes",
         "pasta-dental.png",
         null,
         "Higiene",
         5,
        1),
    
        (default,
         "Protector solar facial",
         1000,
         "Cuidá tu cara con este increíble protector",
        "pasta-dental.png",
        null,
         "Belleza",
         10,
         1),
    
    
        (default,
         "Crema humectante - día",
         900,
         "Crema humectante para el día",
         "crema-humectante-dia.png",
         null,
         "Belleza",
        5,
        1),
    
        (default,
         "Crema humectante - noche",
         900,
         "Crema humectante para la noche",
         "pasta-dental.png",
         null,
         "Belleza",
        10,
        0),
    
        (default,
         "Cannabis microdosis",
         1500,
         "Tintura madre",
         "cannabis.png",
         null,
         "Higiene",
          10,
          0),
        
        (default,
         "Pasta dental",
         300,
         "Pasta dental para que tengas lo mejores dientes",
         "pasta-dental.png",
         null,
         "Higiene",
         5,
        1),
    
        (default,
         "Protector solar facial",
         1000,
         "Cuidá tu cara con este increíble protector",
        "pasta-dental.png",
        null,
         "Belleza",
         10,
         1),
    
    
        (default,
         "Crema humectante - día",
         900,
         "Crema humectante para el día",
         "crema-humectante-dia.png",
         null,
         "Belleza",
        5,
        1),
    
        (default,
         "Crema humectante - noche",
         900,
         "Crema humectante para la noche",
         "pasta-dental.png",
         null,
         "Belleza",
        10,
        0),

        (default,
         "Protector solar facial",
         1000,
         "Cuidá tu cara con este increíble protector",
        "pasta-dental.png",
        null,
         "Belleza",
         10,
         1),
    
        (default,
         "Cannabis microdosis",
         1500,
         "Tintura madre",
         "cannabis.png",
         null,
         "Higiene",
          10,
          0)
          ;

;
-- BORRAR LA COLUMNA DELETED DE PRODUCTOS Y AGREGAR COLUMNA deletedAt VALOR TIMESTAMP
-- AGREGAR COLUMNAS: createdAt, updateAt
-- EL DELETEDAT TIENE QUE TENER UN VALOR POR DEFECTO NULL EN LA DEFINICION DE LA TABLA (DEFAULT NULL)

-- https://sequelize.org/master/manual/paranoid.html




    
  
















