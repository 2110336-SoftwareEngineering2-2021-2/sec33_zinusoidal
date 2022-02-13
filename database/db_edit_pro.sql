UPDATE provider P
    SET P.first_name = @first_name,
        P.last_name = @last_name,
        P.biography = @biography,
        P.work_schedule = @work_schedule,
        P.last_update_datetime = NOW()
    WHERE P.id = @id;

DELETE FROM provider_service S
    WHERE S.provider_id = @id;

INSERT INTO provider_service(provider_id,fortune_type,price)
    VALUES @id+fortune_type+price_list;

/* example
@id+fortune_type+price_list = (4763,"ggggg",123.45),(2223,"e",167.89),(123,"sad",34.56)
*/