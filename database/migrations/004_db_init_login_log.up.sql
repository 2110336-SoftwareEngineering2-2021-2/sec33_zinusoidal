DROP TABLE IF EXISTS login_log;
CREATE TABLE login_log
(
	login_id varchar(100),
	id varchar(100),
	ip varchar(50),
	device varchar(100),
	login_datetime datetime default NOW(),
	
	FOREIGN KEY (id) REFERENCES fortune_user(id),
	PRIMARY KEY(login_id)
);