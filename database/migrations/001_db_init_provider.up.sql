DROP TABLE IF EXISTS provider;
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
	FOREIGN KEY (id) REFERENCES fortune_user(id)
);