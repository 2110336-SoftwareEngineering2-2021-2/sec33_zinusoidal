SELECT U.username,
    P.first_name,
    P.last_name,
    P.profile_image,
    P.biography,
    P.work_schedule,
    P.rating,
    S.fortune_type,
    S.price

    FROM provider P
    LEFT JOIN fortune_user U ON U.id = P.id
    LEFT JOIN provider_service S ON P.id = S.provider_id
    WHERE U.id = @id;