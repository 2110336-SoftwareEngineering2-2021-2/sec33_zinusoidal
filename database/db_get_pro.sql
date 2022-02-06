SELECT *
FROM `fortune_user` U RIGHT JOIN `provider` P ON U.`id` = P.`id`
WHERE U.`id` = @id;