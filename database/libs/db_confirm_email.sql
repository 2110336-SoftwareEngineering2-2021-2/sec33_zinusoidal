/* if key in activation_key, edit confirmed_email to 1*/

UPDATE fortune_user U
    SET U.email_confirmed = 1
    WHERE EXISTS
    (
        SELECT 1
        FROM activation_key A
        WHERE U.id = A.id AND A.activation_key = @key
    );