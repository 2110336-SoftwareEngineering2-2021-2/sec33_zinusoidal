SELECT U.username,
    C.first_name,
    C.last_name,
    C.profile_image
FROM fortune_user U RIGHT JOIN customer C ON U.id = C.id
WHERE U.id = @id;