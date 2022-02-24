ALTER TABLE provider
    ADD FOREIGN KEY (id) REFERENCES fortune_user(id);