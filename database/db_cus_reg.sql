INSERT INTO `fortune_user`(`id`,`username`,`citizen_id`,`email`,`password`,`create_datetime`)
    VALUES (@id,@username,@citizen_id,@email,@password,NOW());

INSERT INTO `customer`(`id`,`first_name`,`last_name`,`profile_image`)
    VALUES (@id,@first_name,@last_name,@profile_image);
