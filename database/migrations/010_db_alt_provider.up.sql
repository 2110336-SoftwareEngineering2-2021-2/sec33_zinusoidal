DROP TABLE IF EXISTS provider2;
CREATE TABLE provider2
(
    id varchar(100) NOT NULL,
	first_name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	profile_image varchar(1000),
	biography text(500),
	work_schedule varchar(336),
	last_update_datetime datetime,
	rating float(3,2) default 0.00,
	
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES fortune_user(id)
);

INSERT INTO provider2
SELECT * FROM provider;

DROP TABLE provider;
CREATE TABLE provider
(
    id varchar(100) NOT NULL,
	first_name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	profile_image varchar(1000),
	biography text(500),
	work_schedule varchar(336),
	last_update_datetime datetime,
	rating float(3,2) default 0.00,
	
	PRIMARY KEY (id),
	CONSTRAINT fk_pro_user FOREIGN KEY (id) REFERENCES fortune_user(id) ON DELETE CASCADE
);

INSERT INTO provider
SELECT * FROM provider2;

DROP TABLE provider2;