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
    PRIMARY KEY (adopter_id),
    FOREIGN KEY (adopter_id) REFERENCES User(user_id) ON DELETE CASCADE,
    UNIQUE (card_number)
);

CREATE TABLE IF NOT EXISTS Breed (
    breed_id INT NOT NULL AUTO_INCREMENT,
    breed_name VARCHAR(50),
    intelligence INT NOT NULL,
    playfulness INT NOT NULL,
    PRIMARY KEY (breed_id),
    UNIQUE (breed_name)
);

CREATE TABLE IF NOT EXISTS AdoptionOrganization (
    ao_id INT NOT NULL,
    ao_name VARCHAR(50) NOT NULL,
    ao_street VARCHAR(50) NOT NULL,
    ao_country VARCHAR(50) NOT NULL,
    ao_city VARCHAR(50) NOT NULL,
    ao_state VARCHAR(50) NOT NULL,
    total_donation_received INT DEFAULT 0,
    total_grants_received INT DEFAULT 0,
    total_donators INT DEFAULT 0,
    pet_count INT DEFAULT 0,
    FOREIGN KEY (ao_id) REFERENCES User(user_id) ON DELETE CASCADE,
    PRIMARY KEY (ao_id)
);

CREATE TABLE IF NOT EXISTS Pet (
    pet_id INT NOT NULL AUTO_INCREMENT,
    pet_name VARCHAR(50),
    pet_size NUMERIC(4, 2),
    pet_image BLOB DEFAULT NULL,
    pet_color VARCHAR(50),
    is_adopted BOOLEAN DEFAULT FALSE,
    adopter_id INT DEFAULT NULL,
    ao_id INT NOT NULL,
    pet_breed_id INT NOT NULL,
    FOREIGN KEY (pet_breed_id) REFERENCES Breed(breed_id) ON DELETE RESTRICT,
    FOREIGN KEY (adopter_id) REFERENCES Adopter(adopter_id) ON DELETE CASCADE,
    FOREIGN KEY (ao_id) REFERENCES AdoptionOrganization(ao_id) ON DELETE CASCADE,
    PRIMARY KEY (pet_id)
);

CREATE TABLE IF NOT EXISTS Dog (
    dog_id INT NOT NULL,
    FOREIGN KEY (dog_id) REFERENCES Pet(pet_id) ON DELETE CASCADE,
    PRIMARY KEY (dog_id)
);

CREATE TABLE IF NOT EXISTS Cat (
    cat_id INT NOT NULL,
    FOREIGN KEY (cat_id) REFERENCES Pet(pet_id) ON DELETE CASCADE,
    PRIMARY KEY (cat_id)
);

CREATE TABLE IF NOT EXISTS Other (
    other_id INT NOT NULL,
    other_type VARCHAR(50) NOT NULL,
    FOREIGN KEY (other_id) REFERENCES Pet(pet_id) ON DELETE CASCADE,
    PRIMARY KEY (other_id)
);

CREATE TABLE IF NOT EXISTS AdoptionApp (
    adopter_id INT NOT NULL,
    aapp_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    pet_id INT NOT NULL,
    aapp_file BLOB DEFAULT NULL,
    aapp_status VARCHAR(8) DEFAULT 'PENDING',
    aapp_response_date DATETIME DEFAULT NULL,
    amotivation_text TEXT,
    FOREIGN KEY (adopter_id) REFERENCES Adopter(adopter_id) ON DELETE CASCADE,
    FOREIGN KEY (pet_id) REFERENCES Pet(pet_id) ON DELETE CASCADE,
    PRIMARY KEY (adopter_id, pet_id),
    CHECK (LENGTH(aapp_file) <= 3 * 1024 * 1024)
);

CREATE TABLE IF NOT EXISTS Veterinarian (
    vet_id INT NOT NULL,
    vet_street VARCHAR(50) NOT NULL,
    vet_country VARCHAR(50) NOT NULL,
    vet_city VARCHAR(50) NOT NULL,
    vet_state VARCHAR(50) NOT NULL,
    FOREIGN KEY (vet_id) REFERENCES User(user_id) ON DELETE CASCADE,
    PRIMARY KEY (vet_id)
); 

CREATE TABLE IF NOT EXISTS Schedule (
    schedule_id INT NOT NULL AUTO_INCREMENT,
    vet_id INT NOT NULL,
    is_restricted BOOLEAN DEFAULT TRUE,
    schedule_beginning_date DATE NOT NULL,
    schedule_end_date DATE NOT NULL,
    FOREIGN KEY (vet_id) REFERENCES Veterinarian(vet_id) ON DELETE CASCADE,
    PRIMARY KEY (schedule_id)
);

CREATE TABLE IF NOT EXISTS Slot (
    slot_id INT NOT NULL AUTO_INCREMENT,
    schedule_id INT NOT NULL,
    is_reserved BOOLEAN DEFAULT FALSE,
    date DATE NOT NULL,
    start_hour TIME NOT NULL,
    end_hour TIME NOT NULL,
    FOREIGN KEY (schedule_id) REFERENCES Schedule(schedule_id) ON DELETE CASCADE,
    PRIMARY KEY (slot_id)
);

INSERT INTO Breed (breed_name, intelligence, playfulness) VALUES
('Affenpinscher', 3, 4);

INSERT INTO User (user_name, phone_number, email, password) VALUES
('John Doe', '1234567890', 'email@com', 'password'),
('Jane Doe', '123456782390', 'emai2l@com', 'password');

INSERT INTO AdoptionOrganization (ao_id, ao_name, ao_street, ao_country, ao_city, ao_state) VALUES
(1, 'Adoption Organization', '123 Main St', 'USA', 'New York', 'NY');

INSERT INTO Adopter (adopter_id, card_number) VALUES
(2, '1234567890123456');
