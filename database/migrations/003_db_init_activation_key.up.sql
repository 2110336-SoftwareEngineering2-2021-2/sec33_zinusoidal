DROP TABLE IF EXISTS activation_key;
CREATE TABLE activation_key
(
	id varchar(100) NOT NULL,
	activation_key varchar(100) NOT NULL,
	create_time datetime default NOW(),

	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES fortune_user(id)
);