INSERT INTO appointment(appointment_id,customer_id,provider_id)
    VALUES (@appointment_id,@customer_id,@provider_id);

INSERT INTO appointment_service(appointment_id,fortune_type,price,start_time,finish_time)
    VALUES @id+fortune_type+price_+startfinishtime_list;

INSERT INTO appointment_info(appointment_id,info_name,info_value)
    VALUES @id+nam+valu;

/* example
@id+fortune_type+price_+startfinishtime_list = ("idaa","fxx",50,"2022-02-23 05:00:00","2022-02-23 06:00:00"),("idaa","fyy",99,"2022-02-22 22:00:00","2022-02-22 22:30:00")
@id+nam+valu = ("idaa","phone","088-888-8888"),("idaa","car license plate","AE 0712")
*/