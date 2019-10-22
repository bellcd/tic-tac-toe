DROP DATABASE IF EXISTS checkout;
CREATE DATABASE checkout;

USE checkout;

CREATE TABLE cart (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  address_line_1 VARCHAR(255),
  address_line_2 VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  zip_code INT,
  phone_num VARCHAR(255),
  cc_number INT,
  cc_exp DATE,
  cvv INT,
  zip_code_billing INT,

  PRIMARY KEY (id)
);