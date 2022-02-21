DROP TABLE IF EXISTS activation_key2;
CREATE TABLE activation_key2
(
	id varchar(100) NOT NULL,
	activation_key varchar(100) NOT NULL,
	create_time datetime default NOW(),

	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES fortune_user(id)
);

INSERT INTO activation_key2
SELECT * FROM activation_key;

DROP TABLE activation_key;
CREATE TABLE activation_key
(
	id varchar(100) NOT NULL,
	activation_key varchar(100) NOT NULL,
	create_time datetime default NOW(),

	PRIMARY KEY (id),
    CONSTRAINT fk_acti_user FOREIGN KEY (id) REFERENCES fortune_user(id) ON DELETE CASCADE
);

INSERT INTO activation_key
SELECT * FROM activation_key2;

DROP TABLE activation_key2;