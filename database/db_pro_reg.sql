INSERT INTO fortune_user(id,username,citizen_id,email,password,user_type)
    VALUES (@id,@username,@citizen_id,@email,@password,1);

INSERT INTO provider(id,first_name,last_name,profile_image,biography,work_schedule)
    VALUES (@id,@first_name,@last_name,@profile_image,@biography,@work_schedule);

/* for all service, one-by-one */
INSERT INTO provider_service(provider_id,fortune_type,price)
    VALUES (@id,@fortune_type,@price);
