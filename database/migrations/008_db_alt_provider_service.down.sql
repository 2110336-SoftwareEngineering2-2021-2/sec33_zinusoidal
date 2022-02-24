ALTER TABLE provider_service
	DROP FOREIGN KEY fk_service_prov;

ALTER TABLE provider_service
	ADD FOREIGN KEY (provider_id) REFERENCES provider(id);