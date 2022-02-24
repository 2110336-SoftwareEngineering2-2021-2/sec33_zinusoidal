DROP TABLE IF EXISTS provider_service2;
CREATE TABLE provider_service2
(
    provider_id varchar(100),
	fortune_type varchar(100),
	price int,

	PRIMARY KEY (provider_id,fortune_type)
);

INSERT INTO provider_service2
SELECT * FROM provider_service;

DROP TABLE provider_service;