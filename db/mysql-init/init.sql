CREATE DATABASE IF NOT EXISTS ecommerce;

-- Base de datos: ecommerce
USE ecommerce;

GRANT ALL PRIVILEGES on ecommerce.* TO 'ecommerce'@'172.24.0.2' identified by 'ecommerce';

-- Crear tabla categories primero, ya que otras tablas dependen de ella
CREATE TABLE IF NOT EXISTS categories(
  id_category INT(10) PRIMARY KEY AUTO_INCREMENT,
  category_name VARCHAR(100) NOT NULL
);

-- Crear la tabla clients
CREATE TABLE IF NOT EXISTS clients (
  id_client int(10) AUTO_INCREMENT PRIMARY KEY,
  last_name varchar(20) NOT NULL,
  first_name varchar(10),
  celular varchar(10),
  email varchar(60),
  password VARCHAR(255)
);

-- Crear la tabla shippingaddress
CREATE TABLE IF NOT EXISTS shippingaddress(
  id_address int(10) AUTO_INCREMENT PRIMARY KEY,
  street VARCHAR(150) NOT NULL,
  street_number VARCHAR(150) NOT NULL,
  apartment VARCHAR(150),
  country VARCHAR(150) NOT NULL,
  country_state VARCHAR(150) NOT NULL,
  zipcode VARCHAR(5) NOT NULL
);

-- Crear la tabla orders que depende de clients y shippingaddress
CREATE TABLE IF NOT EXISTS orders (
  id_order int(10) AUTO_INCREMENT PRIMARY KEY,
  id_client int(10),
  id_address int(10),
  order_date date,
  total_amount DECIMAL(12, 4),
  CONSTRAINT Client_Ord FOREIGN KEY (id_client) 
            REFERENCES clients (id_client),
  FOREIGN KEY (id_address) REFERENCES shippingaddress (id_address)
);

-- Crear la tabla products que depende de categories
CREATE TABLE IF NOT EXISTS products (
  id_product int(10) AUTO_INCREMENT PRIMARY KEY,
  product_name varchar(40),
  unit_price decimal(12,4) CHECK(unit_price > 0),
  product_description VARCHAR(150),
  id_category INT(10),
  FOREIGN KEY (id_category) REFERENCES categories(id_category)
);

-- Crear la tabla orderDetails que depende de orders y products
CREATE TABLE IF NOT EXISTS orderDetails (
  id_order int(10),
  id_product int(10),
  unit_price decimal(12,4),
  quantity smallint(5),
  discount double,
  CONSTRAINT PRIMARY_KEY PRIMARY KEY(id_order, id_product),
  CONSTRAINT ord_det FOREIGN KEY (id_order) REFERENCES orders (id_order),
  CONSTRAINT det_pro FOREIGN KEY (id_product) REFERENCES products (id_product)
);

-- Crear la tabla inventory que depende de products
CREATE TABLE IF NOT EXISTS inventory (
  id_inventory INT(10) PRIMARY KEY AUTO_INCREMENT,
  id_product INT(10),
  size VARCHAR(20) NOT NULL,
  available_quantity INT NOT NULL CHECK(available_quantity >= 0),
  FOREIGN KEY (id_product) REFERENCES products(id_product)
);

-- Crear la tabla PRODUCTIMAGES que depende de products
CREATE TABLE IF NOT EXISTS productimages(
  id_product_image INT(10) PRIMARY KEY AUTO_INCREMENT,
  id_product INT(10),
  product_image_route VARCHAR(150) NOT NULL,
  FOREIGN KEY (id_product) REFERENCES products(id_product)
);

use Ecommerce;

INSERT INTO CATEGORIES (category_name) VALUES ("Jeans"),
("Playeras");

INSERT INTO PRODUCTS (product_name,unit_price, product_description, id_category)
VALUES ("Jean Khaki", 500, "Jean de color Khaki", 1);
INSERT INTO PRODUCTS (product_name,unit_price, product_description, id_category)
VALUES ("Jeans Slim Azul Medio", 319, "Jeans slim con pretina sencilla, cinco bolsillos cierre frontal con botón y cremallera.", 1);
INSERT INTO PRODUCTS (product_name,unit_price, product_description, id_category)
VALUES ("Jeans Cargo Azul", 349, "Jeans slim cargo con pretina sencilla y bolsillos diagonales.", 1);
INSERT INTO PRODUCTS (product_name,unit_price, product_description, id_category)
VALUES ("Jogger Negro ", 349, "Joger de pokemon con bolillos diagonales", 1);
INSERT INTO PRODUCTS (product_name,unit_price, product_description, id_category)
VALUES ("Jeans Rotos Negros ", 339, "Jeans slim con pretina sencilla, cierre frontal con botón y cremallera.", 1);
INSERT INTO PRODUCTS (product_name,unit_price, product_description, id_category)
VALUES ("Jeans Cargo Negro", 349, "Jeans cargo con bolsillos diagonales.", 1);
INSERT INTO PRODUCTS (product_name,unit_price, product_description, id_category)
VALUES ("Jeans Skinny Negro", 299, "Jeans Skinny Push Up Negros", 1);
INSERT INTO PRODUCTS (product_name,unit_price, product_description, id_category)
VALUES ("Jeans Skinny Azul Claro", 279, "Jeans Skinny con tiro regular Azul Claro.", 1);
INSERT INTO PRODUCTS (product_name,unit_price, product_description, id_category)
VALUES ("Jeans Flare Mezclilla Azul", 329 , "Jeans Flare de Mezclilla Azul Obscuro.", 1);
INSERT INTO PRODUCTS (product_name,unit_price, product_description, id_category)
VALUES ("Jeans Carpintero Azul", 369 , "Jeans Carpimtero Azul Obscuro con 4 bolsillos y cadena.", 1);
INSERT INTO PRODUCTS (product_name,unit_price, product_description, id_category)
VALUES ("Playera ML Negra", 199 , "Playera Manga Larga Nirvana Negra", 2);
INSERT INTO PRODUCTS (product_name,unit_price, product_description, id_category)
VALUES ("Playera Corp Gris", 169 , "Playera Corp Manga Corta con nudo Gris", 2);
INSERT INTO PRODUCTS (product_name,unit_price, product_description, id_category)
VALUES ("Playera Top Negra", 159 , "Corp Top Negro Estapado Craneo", 2);
INSERT INTO PRODUCTS (product_name,unit_price, product_description, id_category)
VALUES ("Playera Estampada Negra", 149 , "Playera Manga Corta con Estampado de Corraje El Perro Cobarde Negra", 2);
INSERT INTO PRODUCTS (product_name,unit_price, product_description, id_category)
VALUES ("Playera MC Negra", 179 , "Playera Manga Corta con Texto en Puños Negra", 2);
INSERT INTO PRODUCTS (product_name,unit_price, product_description, id_category)
VALUES ("Playera Estampada Beige", 159 , "Playera Manga Corta con estampado de Bob Esponja Beige    ", 2);
INSERT INTO PRODUCTS (product_name,unit_price, product_description, id_category)
VALUES ("Playera Estampada Azul", 129 , "Playera Manga Corta con Estampado de Grafitis Azul", 2);
INSERT INTO PRODUCTS (product_name,unit_price, product_description, id_category)
VALUES ("Playera Estampada Verde", 119 , "Playera Manga Corta con Estampado Puerta F U Verde", 2);
INSERT INTO PRODUCTS (product_name,unit_price, product_description, id_category)
VALUES ("Playera Alien Verde", 119 , "Playera Manga Corta con Estampado de Alien Verde", 2);



INSERT INTO PRODUCTIMAGES (id_product, product_image_route) VALUES
(1,"Images/Jeans/Male/MJeans1/MJeans1Principal.png"),
(2,"Images/Jeans/Male/MJeans2/MJeans2Principal.png"),
(3,"Images/Jeans/Male/MJeans3/MJeans3Principal.png"),
(4,"Images/Jeans/Male/MJeans4/MJeans4Principal.png"),
(4,"Images/Jeans/Male/MJeans4/MJeans4_1.png"),
(4,"Images/Jeans/Male/MJeans4/MJeans4_2.png"),
(5,"Images/Jeans/Male/MJeans5/MJeans5Principal.png"),
(5,"Images/Jeans/Male/MJeans5/MJeans5_1.png"),
(5,"Images/Jeans/Male/MJeans5/MJeans5_2.png"),
(5,"Images/Jeans/Male/MJeans5/MJeans5_3.png"),
(5,"Images/Jeans/Male/MJeans5/MJeans5_4.png"),
(6,"Images/Jeans/Female/FJeans1/FJeans1Principal.png"),
(6,"Images/Jeans/Female/FJeans1/FJeans1_1.png"),
(6,"Images/Jeans/Female/FJeans1/FJeans1_2.png"),
(6,"Images/Jeans/Female/FJeans1/FJeans1_3.png"),
(7,"Images/Jeans/Female/FJeans2/FJeans2Principal.png"),
(7,"Images/Jeans/Female/FJeans2/FJeans2_1.png"),
(7,"Images/Jeans/Female/FJeans2/FJeans2_2.png"),
(7,"Images/Jeans/Female/FJeans2/FJeans2_3.png"),
(7,"Images/Jeans/Female/FJeans2/FJeans2_4.png"),
(8,"Images/Jeans/Female/FJeans3/FJeans3Principal.png"),
(8,"Images/Jeans/Female/FJeans3/FJeans3_1.png"),
(8,"Images/Jeans/Female/FJeans3/FJeans3_2.png"),
(8,"Images/Jeans/Female/FJeans3/FJeans3_3.png"),
(9,"Images/Jeans/Female/FJeans4/FJeans4Principal.png"),
(9,"Images/Jeans/Female/FJeans4/FJeans4_1.png"),
(9,"Images/Jeans/Female/FJeans4/FJeans4_2.png"),
(9,"Images/Jeans/Female/FJeans4/FJeans4_3.png"),
(10,"Images/Jeans/Female/FJeans5/FJeans5Principal.png"),
(10,"Images/Jeans/Female/FJeans5/FJeans5_1.png"),
(10,"Images/Jeans/Female/FJeans5/FJeans5_2.png"),
(10,"Images/Jeans/Female/FJeans5/FJeans5_3.png"),
(11,"Images/Shirt/Female/FShirt1/FShirt1Principal.png"),
(11,"Images/Shirt/Female/FShirt1/FShirt1_1.png"),
(11,"Images/Shirt/Female/FShirt1/FShirt1_2.png"),
(11,"Images/Shirt/Female/FShirt1/FShirt1_3.png"),
(12,"Images/Shirt/Female/FShirt2/FShirt2Principal.png"),
(12,"Images/Shirt/Female/FShirt2/FShirt2_1.png"),
(12,"Images/Shirt/Female/FShirt2/FShirt2_2.png"),
(12,"Images/Shirt/Female/FShirt2/FShirt2_3.png"),
(13,"Images/Shirt/Female/FShirt3/FShirt3Principal.png"),
(13,"Images/Shirt/Female/FShirt3/FShirt3_1.png"),
(13,"Images/Shirt/Female/FShirt3/FShirt3_2.png"),
(13,"Images/Shirt/Female/FShirt3/FShirt3_3.png"),
(14,"Images/Shirt/Female/FShirt4/FShirt4Principal.png"),
(14,"Images/Shirt/Female/FShirt4/FShirt4_1.png"),
(14,"Images/Shirt/Female/FShirt4/FShirt4_2.png"),
(14,"Images/Shirt/Female/FShirt4/FShirt4_3.png"),
(15,"Images/Shirt/Female/FShirt5/FShirt5Principal.png"),
(15,"Images/Shirt/Female/FShirt5/FShirt5_1.png"),
(15,"Images/Shirt/Female/FShirt5/FShirt5_2.png"),
(15,"Images/Shirt/Female/FShirt5/FShirt5_3.png"),
(16,"Images/Shirt/Male/MShirt1/MShirt1Principal.png"),
(16,"Images/Shirt/Male/MShirt1/MShirt1_1.png"),
(16,"Images/Shirt/Male/MShirt1/MShirt1_2.png"),
(16,"Images/Shirt/Male/MShirt1/MShirt1_3.png"),
(17,"Images/Shirt/Male/MShirt2/MShirt2Principal.png"),
(17,"Images/Shirt/Male/MShirt2/MShirt2_1.png"),
(17,"Images/Shirt/Male/MShirt2/MShirt2_2.png"),
(17,"Images/Shirt/Male/MShirt2/MShirt2_3.png"),
(18,"Images/Shirt/Male/MShirt3/MShirt3Principal.png"),
(18,"Images/Shirt/Male/MShirt3/MShirt3_1.png"),
(18,"Images/Shirt/Male/MShirt3/MShirt3_2.png"),
(18,"Images/Shirt/Male/MShirt3/MShirt3_3.png"),
(19,"Images/Shirt/Male/MShirt4/MShirt4Principal.png"),
(19,"Images/Shirt/Male/MShirt4/MShirt4_1.png"),
(19,"Images/Shirt/Male/MShirt4/MShirt4_2.png"),
(19,"Images/Shirt/Male/MShirt4/MShirt4_3.png");


INSERT INTO INVENTORY (id_product, size, available_quantity) VALUES
(1, 'XS', 73),
(1, 'S', 84),
(1, 'M', 67),
(1, 'L', 92),
(1, 'XL', 77),

(2, 'XS', 65),
(2, 'S', 79),
(2, 'M', 56),
(2, 'L', 91),
(2, 'XL', 88),

(3, 'XS', 52),
(3, 'S', 96),
(3, 'M', 78),
(3, 'L', 63),
(3, 'XL', 89),

(4, 'XS', 66),
(4, 'S', 58),
(4, 'M', 93),
(4, 'L', 74),
(4, 'XL', 81),

(5, 'XS', 89),
(5, 'S', 76),
(5, 'M', 62),
(5, 'L', 95),
(5, 'XL', 87),

(6, 'XS', 91),
(6, 'S', 70),
(6, 'M', 88),
(6, 'L', 57),
(6, 'XL', 82),

(7, 'XS', 75),
(7, 'S', 90),
(7, 'M', 69),
(7, 'L', 99),
(7, 'XL', 66),

(8, 'XS', 98),
(8, 'S', 83),
(8, 'M', 64),
(8, 'L', 89),
(8, 'XL', 55),

(9, 'XS', 74),
(9, 'S', 92),
(9, 'M', 68),
(9, 'L', 85),
(9, 'XL', 57),

(10, 'XS', 99),
(10, 'S', 81),
(10, 'M', 63),
(10, 'L', 78),
(10, 'XL', 54),

(11, 'XS', 56),
(11, 'S', 73),
(11, 'M', 90),
(11, 'L', 61),
(11, 'XL', 88),

(12, 'XS', 69),
(12, 'S', 98),
(12, 'M', 77),
(12, 'L', 62),
(12, 'XL', 85),

(13, 'XS', 87),
(13, 'S', 55),
(13, 'M', 84),
(13, 'L', 93),
(13, 'XL', 66),

(14, 'XS', 65),
(14, 'S', 89),
(14, 'M', 78),
(14, 'L', 97),
(14, 'XL', 59),

(15, 'XS', 72),
(15, 'S', 90),
(15, 'M', 54),
(15, 'L', 82),
(15, 'XL', 99),

(16, 'XS', 63),
(16, 'S', 91),
(16, 'M', 75),
(16, 'L', 88),
(16, 'XL', 58),

(17, 'XS', 77),
(17, 'S', 55),
(17, 'M', 94),
(17, 'L', 66),
(17, 'XL', 83),

(18, 'XS', 99),
(18, 'S', 60),
(18, 'M', 74),
(18, 'L', 85),
(18, 'XL', 91),

(19, 'XS', 88),
(19, 'S', 67),
(19, 'M', 95),
(19, 'L', 71),
(19, 'XL', 56);