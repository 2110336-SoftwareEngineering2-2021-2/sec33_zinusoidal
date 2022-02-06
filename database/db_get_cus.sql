SELECT *
FROM `fortune_user` U RIGHT JOIN `customer` C ON U.`id` = C.`id`
WHERE U.`id` = @id;