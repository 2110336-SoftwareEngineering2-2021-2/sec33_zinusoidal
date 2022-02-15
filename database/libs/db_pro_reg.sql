INSERT INTO fortune_user(id,username,citizen_id,email,password,user_type)
    VALUES (@id,@username,@citizen_id,@email,@password,1);

INSERT INTO provider(id,first_name,last_name,profile_image,biography,work_schedule)
    VALUES (@id,@first_name,@last_name,@profile_image,@biography,@work_schedule);

INSERT INTO provider_service(provider_id,fortune_type,price)
    VALUES @id+fortune_type+price_list;

/* example
@id+fortune_type+price_list = (4763,"ggggg",123.45),(2223,"e",167.89),(123,"sad",34.56)
*/