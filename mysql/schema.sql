create database if not exists pawfectdb;

CREATE TABLE IF NOT EXISTS User (
    user_id INT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(50) NOT NULL, 
    email VARCHAR(100) NOT NULL,
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id),
    UNIQUE (email),
    UNIQUE (phone_number)
);


CREATE TABLE IF NOT EXISTS Adopter (
    adopter_id INT NOT NULL,
    card_number VARCHAR(50),
    FOREIGN KEY (adopter_id) REFERENCES User(user_id) ON DELETE CASCADE,
    PRIMARY KEY (adopter_id),
    UNIQUE (card_number)
);
