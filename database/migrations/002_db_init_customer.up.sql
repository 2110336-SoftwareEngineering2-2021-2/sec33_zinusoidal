DROP TABLE IF EXISTS customer;
CREATE TABLE customer 
(
    id varchar(100) NOT NULL,
	first_name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	profile_image varchar(1000),
	
    PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES fortune_user(id)
);