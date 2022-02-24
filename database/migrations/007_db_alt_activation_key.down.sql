ALTER TABLE activation_key
	DROP FOREIGN KEY fk_acti_user;

ALTER TABLE activation_key
    ADD FOREIGN KEY (id) REFERENCES fortune_user(id);