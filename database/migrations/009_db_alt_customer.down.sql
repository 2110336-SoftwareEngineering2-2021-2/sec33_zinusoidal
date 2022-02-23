ALTER TABLE customer
	DROP FOREIGN KEY fk_acti_user;

ALTER TABLE customer
    ADD FOREIGN KEY (id) REFERENCES fortune_user(id);