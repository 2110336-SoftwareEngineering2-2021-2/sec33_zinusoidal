INSERT INTO `fortune_user`(`id`,`username`,`citizen_id`,`email`,`password`,`create_datetime`)
    VALUES (@id,@username,@citizen_id,@email,@password,NOW());

INSERT INTO `provider`(`id`,`first_name`,`last_name`,`profile_image`,`biography`,`schedule`)
    VALUES (@id,@first_name,@last_name,@profile_image,@biography,@schedule);

/* for all service, one-by-one */
INSERT INTO `provider_service`(`provider_id`,`fortune_type`,`price`)
    VALUES (@provider_id,@fortune_type,@price);
