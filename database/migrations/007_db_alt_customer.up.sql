DROP TABLE IF EXISTS customer2;
CREATE TABLE customer2
(
    id varchar(100) NOT NULL,
	first_name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	profile_image varchar(1000),
	
    PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES fortune_user(id)
);

INSERT INTO customer2
SELECT * FROM customer;

DROP TABLE customer;
CREATE TABLE customer
(
    id varchar(100) NOT NULL,
	first_name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	profile_image varchar(1000),
	
    PRIMARY KEY (id),
    CONSTRAINT fk_cus_user FOREIGN KEY (id) REFERENCES fortune_user(id) ON DELETE CASCADE
);

INSERT INTO customer
SELECT * FROM customer2;

DROP TABLE customer2;