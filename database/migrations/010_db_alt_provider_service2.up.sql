CREATE TABLE provider_service
(
    provider_id varchar(100),
	fortune_type varchar(100),
	price int,

    PRIMARY KEY (provider_id,fortune_type),
    CONSTRAINT fk_service_prov FOREIGN KEY (provider_id) REFERENCES provider(id) ON DELETE CASCADE
);

INSERT INTO provider_service
SELECT * FROM provider_service2;

DROP TABLE provider_service2;