SELECT U.id, U.username, C.first_name, C.last_name, C.profile_image 
    FROM fortune_user U RIGHT JOIN customer C ON U.id = C.id
    WHERE U.username = @username AND U.password = @password
UNION
SELECT U.id, U.username, P.first_name, P.last_name, P.profile_image 
    FROM fortune_user U RIGHT JOIN provider P ON U.id = P.id
    WHERE U.username = @username AND U.password = @password;