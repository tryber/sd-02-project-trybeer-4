DROP DATABASE IF EXISTS trybeer;
CREATE DATABASE trybeer;
USE trybeer;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL,
  role VARCHAR(15) DEFAULT 'client'
);

INSERT INTO users (name, email, password, role)
  VALUES
    ('tryber', 'root@email.com', '123456', 'admin');

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  unit_price DECIMAL(5, 2) NOT NULL,
  image_url VARCHAR(2083)
);

INSERT INTO products (name, unit_price, image_url)
  VALUES
    ('Skol Lata 250ml', 2.20, 'http://localhost:3001/back-end/public/1'),
    ('Heineken 600ml', 7.50, 'http://localhost:3001/back-end/public/2'),
    ('Antarctica Pilsen 300ml', 2.49, 'http://localhost:3001/back-end/public/3'),
    ('Brahma 600ml', 7.50, 'http://localhost:3001/back-end/public/4'),
    ('Skol 269ml', 2.19, 'http://localhost:3001/back-end/public/5'),
    ('Skol Beats Senses 313ml', 4.49, 'http://localhost:3001/back-end/public/6'),
    ('Becks 330ml', 4.99, 'http://localhost:3001/back-end/public/7'),
    ('Brahma Duplo Malte 350ml', 2.79, 'http://localhost:3001/back-end/public/8'),
    ('Becks 600ml', 8.89, 'http://localhost:3001/back-end/public/9'),
    ('Skol Beats Senses 269ml', 3.57, 'http://localhost:3001/back-end/public/10'),
    ('Stella Artois 275ml', 3.49, 'http://localhost:3001/back-end/public/11');

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  address VARCHAR(300) NOT NULL,
  total_price DECIMAL(6, 2) NOT NULL,
  date DATETIME,
  status VARCHAR(15) DEFAULT 'pendente',
  client_id INT,
  FOREIGN KEY (client_id) REFERENCES users(id)
);

CREATE TRIGGER trigger_order_insert
  BEFORE INSERT ON orders
  FOR EACH ROW
    SET NEW.date = NOW();

CREATE TABLE order_product (
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  product_quantity INT NOT NULL,
  PRIMARY KEY (order_id, product_id),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
