create database if not exists pawfectdb;

CREATE TABLE IF NOT EXISTS User
(
    user_id      INT          NOT NULL AUTO_INCREMENT,
    user_name    VARCHAR(100) NOT NULL,
    phone_number VARCHAR(50)  NOT NULL,
    email        VARCHAR(100) NOT NULL,
    password     VARCHAR(50)  NOT NULL,
    PRIMARY KEY (user_id),
    UNIQUE (email),
    UNIQUE (phone_number)
);

CREATE TABLE IF NOT EXISTS Adopter
(
    adopter_id  INT NOT NULL,
    card_number VARCHAR(50),
    PRIMARY KEY (adopter_id),
    FOREIGN KEY (adopter_id) REFERENCES User (user_id) ON DELETE CASCADE,
    UNIQUE (card_number)
);

CREATE TABLE IF NOT EXISTS Breed
(
    breed_id     INT NOT NULL AUTO_INCREMENT,
    breed_name   VARCHAR(50),
    intelligence INT NOT NULL,
    playfulness  INT NOT NULL,
    PRIMARY KEY (breed_id),
    UNIQUE (breed_name)
);

CREATE TABLE IF NOT EXISTS AdoptionOrganization
(
    ao_id                   INT         NOT NULL,
    ao_name                 VARCHAR(50) NOT NULL,
    ao_street               VARCHAR(50) NOT NULL,
    ao_country              VARCHAR(50) NOT NULL,
    ao_city                 VARCHAR(50) NOT NULL,
    ao_state                VARCHAR(50) NOT NULL,
    total_donation_received INT DEFAULT 0,
    total_grants_received   INT DEFAULT 0,
    total_donators          INT DEFAULT 0,
    pet_count               INT DEFAULT 0,
    FOREIGN KEY (ao_id) REFERENCES User (user_id) ON DELETE CASCADE,
    PRIMARY KEY (ao_id)
);

CREATE TABLE IF NOT EXISTS Pet
(
    pet_id       INT NOT NULL AUTO_INCREMENT,
    pet_name     VARCHAR(50),
    pet_size     NUMERIC(4, 2),
    pet_image    BLOB    DEFAULT NULL,
    pet_color    VARCHAR(50),
    is_adopted   BOOLEAN DEFAULT FALSE,
    adopter_id   INT     DEFAULT NULL,
    ao_id        INT NOT NULL,
    pet_breed_id INT NOT NULL,
    FOREIGN KEY (pet_breed_id) REFERENCES Breed (breed_id) ON DELETE RESTRICT,
    FOREIGN KEY (adopter_id) REFERENCES Adopter (adopter_id) ON DELETE CASCADE,
    FOREIGN KEY (ao_id) REFERENCES AdoptionOrganization (ao_id) ON DELETE CASCADE,
    PRIMARY KEY (pet_id)
);

CREATE TABLE IF NOT EXISTS Dog
(
    dog_id INT NOT NULL,
    FOREIGN KEY (dog_id) REFERENCES Pet (pet_id) ON DELETE CASCADE,
    PRIMARY KEY (dog_id)
);

CREATE TABLE IF NOT EXISTS Cat
(
    cat_id INT NOT NULL,
    FOREIGN KEY (cat_id) REFERENCES Pet (pet_id) ON DELETE CASCADE,
    PRIMARY KEY (cat_id)
);

CREATE TABLE IF NOT EXISTS Other
(
    other_id   INT         NOT NULL,
    other_type VARCHAR(50) NOT NULL,
    FOREIGN KEY (other_id) REFERENCES Pet (pet_id) ON DELETE CASCADE,
    PRIMARY KEY (other_id)
);


CREATE TABLE IF NOT EXISTS AdoptionApp
(
    adopter_id         INT NOT NULL,
    aapp_date          DATETIME   DEFAULT CURRENT_TIMESTAMP,
    pet_id             INT NOT NULL,
    aapp_file          BLOB       DEFAULT NULL,
    aapp_status        VARCHAR(8) DEFAULT 'PENDING',
    aapp_response_date DATETIME   DEFAULT NULL,
    amotivation_text   TEXT,
    FOREIGN KEY (adopter_id) REFERENCES Adopter (adopter_id) ON DELETE CASCADE,
    FOREIGN KEY (pet_id) REFERENCES Pet (pet_id) ON DELETE CASCADE,
    PRIMARY KEY (adopter_id, pet_id),
    CHECK (LENGTH(aapp_file) <= 3 * 1024 * 1024)
);

CREATE TABLE IF NOT EXISTS Veterinarian
(
    vet_id      INT         NOT NULL,
    vet_street  VARCHAR(50) NOT NULL,
    vet_country VARCHAR(50) NOT NULL,
    vet_city    VARCHAR(50) NOT NULL,
    vet_state   VARCHAR(50) NOT NULL,
    FOREIGN KEY (vet_id) REFERENCES User (user_id) ON DELETE CASCADE,
    PRIMARY KEY (vet_id)
);

CREATE TABLE IF NOT EXISTS Schedule
(
    schedule_id             INT  NOT NULL AUTO_INCREMENT,
    vet_id                  INT  NOT NULL,
    is_restricted           BOOLEAN DEFAULT TRUE,
    schedule_beginning_date DATE NOT NULL,
    schedule_end_date       DATE NOT NULL,
    FOREIGN KEY (vet_id) REFERENCES Veterinarian (vet_id) ON DELETE CASCADE,
    PRIMARY KEY (schedule_id)
);

CREATE TABLE IF NOT EXISTS Reservation
(
    reservation_id   INT      NOT NULL AUTO_INCREMENT,
    adopter_id       INT      NOT NULL,
    pet_id           INT      NOT NULL,
    rv_date          DATETIME NOT NULL,
    reasoning        TEXT,
    rv_status        VARCHAR(8) DEFAULT 'PENDING',
    rv_response_date DATETIME   DEFAULT NULL,
    FOREIGN KEY (pet_id) REFERENCES Pet (pet_id) ON DELETE CASCADE,
    FOREIGN KEY (adopter_id) REFERENCES Adopter (adopter_id) ON DELETE CASCADE,
    PRIMARY KEY (reservation_id)
);

CREATE TABLE IF NOT EXISTS Examination
(
    ex_id          INT NOT NULL AUTO_INCREMENT,
    ex_description TEXT,
    ex_file        BLOB DEFAULT NULL,
    reservation_id INT NOT NULL,
    CHECK (LENGTH(ex_file) <= 3 * 1024 * 1024),
    FOREIGN KEY (reservation_id) REFERENCES Reservation (reservation_id) ON DELETE CASCADE,
    PRIMARY KEY (ex_id)
);

CREATE TABLE IF NOT EXISTS OverseeingReq
(
    ao_id              INT  NOT NULL,
    adopter_id         INT  NOT NULL,
    oreq_date          DATETIME    DEFAULT CURRENT_TIMESTAMP,
    oreq_status        VARCHAR(8)  DEFAULT 'PENDING',
    oreq_response_date DATETIME    DEFAULT NULL,
    omotivation_text   TEXT NOT NULL,
    oreq_result        VARCHAR(14) DEFAULT NULL,
    FOREIGN KEY (ao_id) REFERENCES AdoptionOrganization (ao_id) ON DELETE CASCADE,
    FOREIGN KEY (adopter_id) REFERENCES Adopter (adopter_id) ON DELETE CASCADE,
    PRIMARY KEY (ao_id, adopter_id, oreq_date)
);

CREATE TABLE IF NOT EXISTS AgreementReq
(
    ao_id               INT  NOT NULL,
    vet_id              INT  NOT NULL,
    agreq_date          DATETIME   DEFAULT CURRENT_TIMESTAMP,
    aqreq_status        VARCHAR(8) DEFAULT 'PENDING',
    agreq_response_date DATETIME   DEFAULT NULL,
    agmotivation_text   TEXT NOT NULL,
    agreq_term_date     DATETIME   DEFAULT NULL,
    FOREIGN KEY (ao_id) REFERENCES AdoptionOrganization (ao_id) ON DELETE CASCADE,
    FOREIGN KEY (vet_id) REFERENCES Veterinarian (vet_id) ON DELETE CASCADE,
    PRIMARY KEY (ao_id, vet_id, agreq_date)
);

CREATE TABLE IF NOT EXISTS Slot
(
    slot_id        INT  NOT NULL AUTO_INCREMENT,
    schedule_id    INT  NOT NULL,
    is_reserved    BOOLEAN DEFAULT FALSE,
    date           DATE NOT NULL,
    start_hour     TIME NOT NULL,
    end_hour       TIME NOT NULL,
    reservation_id INT     DEFAULT NULL,
    FOREIGN KEY (schedule_id) REFERENCES Schedule (schedule_id) ON DELETE CASCADE,
    FOREIGN KEY (reservation_id) REFERENCES Reservation (reservation_id) ON DELETE CASCADE,
    PRIMARY KEY (slot_id)
);

CREATE TABLE IF NOT EXISTS BlogField
(
    blog_field_id   INT NOT NULL AUTO_INCREMENT,
    blog_field_name VARCHAR(50),
    PRIMARY KEY (blog_field_id)
);

CREATE TABLE IF NOT EXISTS ExpertiseField
(
    expertise_field_id   INT NOT NULL AUTO_INCREMENT,
    expertise_field_name VARCHAR(50),
    PRIMARY KEY (expertise_field_id)
);

CREATE TABLE IF NOT EXISTS Veterinarian
(
    vet_id      INT          NOT NULL AUTO_INCREMENT,
    vet_name    VARCHAR(100) NOT NULL, -- This is to refer to the clinic name
    vet_street  VARCHAR(50)  NOT NULL,
    vet_city    VARCHAR(50)  NOT NULL,
    vet_state   VARCHAR(50)  NOT NULL,
    vet_country VARCHAR(50)  NOT NULL,
    PRIMARY KEY (vet_id),
    FOREIGN KEY (vet_id) REFERENCES User (user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Blogger
(
    blogger_id INT NOT NULL,
    blog_name  VARCHAR(50), -- Recommended by the Copilot, might be removed
    PRIMARY KEY (blogger_id),
    FOREIGN KEY (blogger_id) REFERENCES Adopter (adopter_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Expert
(
    expert_id INT NOT NULL,
    PRIMARY KEY (expert_id),
    FOREIGN KEY (expert_id) REFERENCES Blogger (blogger_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Donation
(
    donation_id INT            NOT NULL AUTO_INCREMENT,
    donor_id    INT            NOT NULL,
    ao_id       INT            NOT NULL,
    amount      NUMERIC(10, 2) NOT NULL,
    currency    VARCHAR(3)     NOT NULL DEFAULT 'USD',
    ddate       DATETIME                DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (donation_id),
    FOREIGN KEY (donor_id) REFERENCES User (user_id) ON DELETE CASCADE,
    FOREIGN KEY (ao_id) REFERENCES AdoptionOrganization (ao_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Blog (
    blog_id          INT NOT NULL AUTO_INCREMENT,
    blogger_id       INT NOT NULL,
    blog_image       BLOB DEFAULT NULL,
    blog_content     TEXT,
    blog_title       VARCHAR(50),
    blog_field_id    INT NOT NULL,
    is_restricted    BOOLEAN DEFAULT TRUE,
    published_date   DATE DEFAULT NULL,
    PRIMARY KEY (blog_id, blogger_id),
    FOREIGN KEY (blogger_id) REFERENCES Blogger(blogger_id) ON DELETE CASCADE,
    FOREIGN KEY (blog_field_id) REFERENCES BlogField(blog_field_id) ON DELETE RESTRICT
);

 
CREATE TABLE IF NOT EXISTS Counsels (
    adopter_id               INT NOT NULL,
    expert_id                INT NOT NULL,
    advice_date              DATETIME DEFAULT CURRENT_TIMESTAMP,
    expertise_field_id       INT NOT NULL,
    adopter_problem          TEXT,
    expert_response          TEXT,
    expert_response_date     DATETIME DEFAULT NULL,
    advice_status            VARCHAR(8) DEFAULT 'PENDING', -- Corrected single quotes
    PRIMARY KEY (adopter_id, expert_id, advice_date),
    FOREIGN KEY (adopter_id) REFERENCES Adopter(adopter_id) ON DELETE CASCADE,
    FOREIGN KEY (expert_id) REFERENCES Expert(expert_id) ON DELETE CASCADE,
    FOREIGN KEY (expertise_field_id) REFERENCES ExpertiseField(expertise_field_id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS AdoptionApp (
    adopter_id                    INT NOT NULL,
    adoption_org_id               INT NOT NULL,
    bapp_date                     DATETIME DEFAULT CURRENT_TIMESTAMP,
    pet_id                        INT NOT NULL,
    bapp_file                     BLOB DEFAULT NULL,
    bapp_status                   VARCHAR(8) DEFAULT 'PENDING',
    bapp_response_date            DATETIME DEFAULT NULL,
    amotivation_text              TEXT,
    FOREIGN KEY (adopter_id) REFERENCES Adopter(adopter_id) ON DELETE CASCADE,
    FOREIGN KEY (ao_id) REFERENCES AdoptionOrganization(ao_id) ON DELETE CASCADE,
    FOREIGN KEY (pet_id) REFERENCES Pet(pet_id) ON DELETE CASCADE,
    PRIMARY KEY (adopter_id, adoption_org_id, bapp_date),
    CHECK (LENGTH(bapp_file) <= 3 * 1024 * 1024)
);

CREATE TABLE IF NOT EXISTS Admin
(
    admin_id INT NOT NULL,
    PRIMARY KEY (admin_id),
    FOREIGN KEY (admin_id) REFERENCES User (user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS BloggerApp (
    adopter_id               INT NOT NULL,
    blog_field_id            INT NOT NULL,
    bapp_date                DATETIME DEFAULT CURRENT_TIMESTAMP,
    bapp_file                BLOB DEFAULT NULL,
    bapp_status              VARCHAR(8) DEFAULT 'PENDING', -- Corrected single quotes and added comma
    bapp_response_date       DATETIME DEFAULT NULL,
    bmotivation_text         TEXT,
    badmin_id                INT DEFAULT NULL,
    FOREIGN KEY (adopter_id) REFERENCES Adopter(adopter_id) ON DELETE CASCADE,
    FOREIGN KEY (blog_field_id) REFERENCES BlogField(blog_field_id) ON DELETE RESTRICT,
    FOREIGN KEY (badmin_id) REFERENCES Admin(admin_id),
    PRIMARY KEY (adopter_id, blog_field_id, bapp_date), -- Corrected column names
    CHECK (LENGTH(bapp_file) <= 3 * 1024 * 1024)
);

CREATE TABLE IF NOT EXISTS ExpertApp(
    adopter_id                             INT NOT NULL,
    expertise_field_id                  INT NOT NULL,
    eapp_date                             DATETIME DEFAULT CURRENT_TIMESTAMP,
    eapp_file                                BLOB DEFAULT NULL,
    eapp_status                          VARCHAR(8) DEFAULT 'PENDING',
    eapp_response_date            DATETIME DEFAULT NULL,
    emotivation_text                    TEXT,
    eadmin_id			   INT DEFAULT NULL,
    FOREIGN KEY (adopter_id) REFERENCES Adopter(adopter_id) ON DELETE CASCADE,
    FOREIGN KEY (expertise_field_id) REFERENCES ExpertiseField(expertise_field_id)
    ON DELETE RESTRICT,
    FOREIGN KEY (eadmin_id) REFERENCES Admin(admin_id),
    PRIMARY KEY (adopter_id, eapp_date),
    CHECK (LENGTH(eapp_file) <= 3 * 1024 * 1024)
);     

CREATE TABLE IF NOT EXISTS GranteeApp(
    ao_id                                     INT NOT NULL,
    gapp_amount                        INT NOT NULL,
    gapp_date                             DATETIME DEFAULT CURRENT_TIMESTAMP,
    gapp_file                               BLOB DEFAULT NULL,
    gapp_status                          VARCHAR(8) DEFAULT 'PENDING',
    gapp_response_date            DATETIME DEFAULT NULL,
    gmotivation_text                   TEXT NOT NULL,
    gapp_decided_amount         INT DEFAULT NULL,
    gadmin_id			   INT DEFAULT NULL,
    FOREIGN KEY (ao_id) REFERENCES AdoptionOrganization(ao_id) ON DELETE CASCADE,
    FOREIGN KEY (gadmin_id) REFERENCES Admin(admin_id),
    PRIMARY KEY (ao_id),
    CHECK (LENGTH(gapp_file) <= 3 * 1024 * 1024)
);      


CREATE VIEW DonationSummary AS
SELECT ao.ao_name, COUNT(d.donation_id) AS donation_count,
SUM(amount) AS total_donations
FROM AdoptionOrganization ao
JOIN Donation d ON d.ao_id = ao.ao_id
GROUP BY ao.ao_name
HAVING count(*) > 0;

CREATE VIEW AvailableForAdoption AS
SELECT p.pet_id, b.breed_name, p.pet_name, p.pet_size, p.pet_image, p.pet_color, p.pet_breed_id, ao.ao_id, ao.ao_city, ao.ao_state, ao.ao_country, ao.ao_street
FROM Pet p
JOIN AdoptionOrganization ao ON ao.ao_id = p.ao_id
JOIN Breed b ON b.breed_id = p.pet_breed_id
WHERE p.adopter_id IS NULL;

DELIMITER //
CREATE TRIGGER update_donator_count
AFTER INSERT ON Donation
FOR EACH ROW
BEGIN
    IF NEW.ao_id IS NOT NULL THEN
        UPDATE AdoptionOrganization
        SET donator_count = donator_count + 1
        WHERE ao_id = NEW.ao_id;
    END IF;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER update_total_donations
AFTER INSERT ON Donation
FOR EACH ROW
BEGIN
    IF NEW.ao_id IS NOT NULL THEN
        UPDATE AdoptionOrganization
        SET total_donations = total_donations + NEW.amount
        WHERE ao_id = NEW.ao_id;
    END IF;
END;
//
DELIMITER ;

-- TODO: Remove below later

INSERT INTO Breed (breed_name, intelligence, playfulness)
VALUES ('Affenpinscher', 3, 4);

INSERT INTO User (user_name, phone_number, email, password)
VALUES ('John Doe', '1234567890', 'email@com', 'password'),
       ('Jane Doe', '223456782390', 'emai2l@com', 'password'),
       ('Potato Doe', '3234567890', 'email3@com', 'password'),
       ('Potato Doe 2', '4234567890', 'email4@com', 'password'),
       ('Potato Doe 3', '5234567890', 'email5@com', 'password'),
       ('Potato Doe 4', '6234567890', 'email6@com', 'password'),
       ('Potato Doe 5', '7234567890', 'email7@com', 'password'),
       ('Potato Doe 6', '8234567890', 'email8@com', 'password'),
       ('Potato Doe 7', '9234567890', 'email9@com', 'password'),
       ('Potato Doe 8', '1034567890', 'email10@com', 'password'),
       ('Potato Doe 9', '1134567890', 'email11@com', 'password');


INSERT INTO AdoptionOrganization (ao_id, ao_name, ao_street, ao_country, ao_city, ao_state)
VALUES (1, 'Adoption Organization', '123 Main St', 'USA', 'New York', 'NY'),
         (6, 'Adoption Organization 6', '123 Main St', 'USA', 'New York', 'NY'),
         (7, 'Adoption Organization 7', '123 Main St', 'USA', 'New York', 'NY');

INSERT INTO Adopter (adopter_id, card_number)
VALUES (2, '1234567890123456'),
        (3, '2234567890123456'),
        (4, '3234567890123456'),
        (5, '4234567890123456');

INSERT INTO Veterinarian (vet_id, vet_street, vet_city, vet_state, vet_country)
VALUES (8, '123 Main St', 'New York', 'NY', 'USA'),
         (9, '123 Main St', 'New York', 'NY', 'USA'),
            (10, '123 Main St', 'New York', 'NY', 'USA'),
            (11, '123 Main St', 'New York', 'NY', 'USA');

INSERT INTO Pet (pet_name, pet_size, pet_image, pet_color, is_adopted, adopter_id, ao_id, pet_breed_id)
VALUES ('PussyCato', 1.5, NULL, 'Black', TRUE, 2, 1, 1),
        ('Dogo', 2.5, NULL, 'Black', TRUE, 2, 1, 1),
        ('PussyCato 2', 1.5, NULL, 'Black', TRUE, 3, 1, 1),
        ('Dogo 2', 2.5, NULL, 'Black', TRUE, 3, 1, 1);

INSERT INTO Reservation (reservation_id, adopter_id, pet_id, rv_date, reasoning, rv_status, rv_response_date)
VALUES (1, 2, 1, '2021-01-01 00:00:00', 'Reasoning', 'PENDING', NULL),
        (2, 2, 2, '2021-01-01 00:00:00', 'Reasoning', 'PENDING', NULL),
        (3, 2, 3, '2021-01-01 00:00:00', 'Reasoning', 'PENDING', NULL),
        (4, 2, 4, '2021-01-01 00:00:00', 'Reasoning', 'PENDING', NULL);

INSERT INTO Examination (ex_id, ex_description, ex_file, reservation_id)
VALUES (1, 'Examination Description', NULL, 1),
        (2, 'Examination Description 2', NULL, 2),
        (3, 'Examination Description 3', NULL, 3),
        (4, 'Examination Description 4', NULL, 4);

INSERT INTO Blogger (blogger_id, blog_name)
VALUES (5, 'Blog Name 4');