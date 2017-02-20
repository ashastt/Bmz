CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
  item_id INT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,3) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);


INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("1", "Diapers", "Kids",12.99,10);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("2", "Shampoo", "Cosmetics",3.99,8);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("3", "Pasta", "Grocery",4.50,12);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("4", "Milk", "Dairy",2.50,20);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("5", "Oil", "Grocery",7.50,10);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("6", "Salt", "Grocery",0.50,15);
