-- DROP DATABASE IF EXISTS bamazonDB;
-- 
-- CREATE DATABASE bamazonDB;

USE bamazonDB;

-- CREATE TABLE products (
--   id INT NOT NULL AUTO_INCREMENT,
--   product_name VARCHAR(100) NULL,
--   department_name VARCHAR(100) NULL,
--   price DECIMAL(10, 2) NOT NULL,
--   stock_quantity INTEGER(10) NOT NULL,  
--   PRIMARY KEY (id)
-- );

--   raw_total DECIMAL(10,4) NULL,

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Eloquent JavaScript", "Books", 31.96, 47),
("iCasso Macbook Case", "Electronics", 18.99, 11),
("Men's Weight Lifting Gloves", "Sports & Outdoors", 10.99, 15),
("Codenames", "Toys & Games", 14.79, 32),
("Yrd TECH Apple Watch Band", "Cell Phones & Accessories", 10.41, 53),
("Superman No. 75", "Books", 22.99, 1),
("Revision Skincare Vitamin C Lotion", "Beauty & Personal Care", 115.00, 50),
("Packers Super Bowl XLV Pennant", "Sports Collectibles", 12.99, 2),
("Odstore Love Balloon Banner", "Home & Kitchen", 4.99, 12),
("Krylon Looking Glass Aerosol Spray", "Tools & Home Improvement", 13.47, 20);

select * from products;