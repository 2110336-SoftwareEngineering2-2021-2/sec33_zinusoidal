DELETE U FROM fortune_user U
WHERE U.id = @id AND U.password = @password AND NOT EXISTS(
    SELECT *
    FROM appointment A
    WHERE (A.provider_id = @id OR A.customer_id = @id) and A.status = 2
);