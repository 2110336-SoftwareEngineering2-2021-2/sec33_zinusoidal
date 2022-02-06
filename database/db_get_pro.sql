SELECT *
    FROM `fortune_user` U 
    RIGHT JOIN `provider` P ON U.`id` = P.`id`
    RIGHT JOIN `provider_service` S ON P.`id` = S.`id`
    WHERE U.`id` = @id;