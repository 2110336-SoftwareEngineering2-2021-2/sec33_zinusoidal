INSERT INTO fortune_user(id,username,citizen_id,email,password,user_type)
    VALUES (@id,@username,@citizen_id,@email,@password,0);

INSERT INTO customer(id,first_name,last_name,profile_image)
    VALUES (@id,@first_name,@last_name,@profile_image);
