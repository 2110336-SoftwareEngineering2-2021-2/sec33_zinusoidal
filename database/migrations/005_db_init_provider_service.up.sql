DROP TABLE IF EXISTS provider_service;
CREATE TABLE provider_service
(
	provider_id varchar(100),
	fortune_type varchar(100),
	price int,
	
	FOREIGN KEY (provider_id) REFERENCES provider(id),
	PRIMARY KEY (provider_id,fortune_type)
);