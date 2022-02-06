SELECT U.`id`
    FROM `fortune_user` U
    WHERE U.`username` = @username AND U.`password` = @password;