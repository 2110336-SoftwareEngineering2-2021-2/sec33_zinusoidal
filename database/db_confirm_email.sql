/* if key in activation_key, edit confirmed_email to 1*/

UPDATE fortune_user
    SET email_confirmed = 1
    WHERE EXISTS
    (
        SELECT 1
        FROM activation_key
        WHERE fortune_user.id = activation_key.id AND activation_key.activation_key = @key
    );