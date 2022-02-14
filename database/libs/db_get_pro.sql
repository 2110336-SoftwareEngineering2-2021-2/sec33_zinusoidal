SELECT U.username,
    P.first_name,
    P.last_name,
    P.profile_image,
    P.biography,
    P.work_schedule,
    P.rating,
    S.fortune_type,
    S.price

    FROM fortune_user U 
    RIGHT JOIN provider P ON U.id = P.id
    RIGHT JOIN provider_service S ON P.id = S.provider_id
    WHERE U.id = @id;