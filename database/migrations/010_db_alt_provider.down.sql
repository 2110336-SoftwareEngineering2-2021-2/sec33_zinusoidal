ALTER TABLE provider
	DROP FOREIGN fk_pro_user;

ALTER TABLE provider
    ADD FOREIGN KEY (id) REFERENCES fortune_user(id);