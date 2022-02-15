DROP TABLE IF EXISTS fortune_user;
CREATE TABLE fortune_user
(
	id varchar(100) NOT NULL,
	username varchar(50) NOT NULL,
	citizen_id varchar(13) NOT NULL,
	email varchar(100) NOT NULL,
	password varchar(256) NOT NULL,
	create_datetime datetime default NOW(),
	delete_datetime datetime,
	user_type bit NOT NULL,
	email_confirmed bit default 0,

	CONSTRAINT UNIQUE(username),
	CONSTRAINT UNIQUE(email),
    PRIMARY KEY (id)
);