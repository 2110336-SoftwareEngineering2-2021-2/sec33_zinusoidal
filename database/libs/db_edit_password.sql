UPDATE fortune_user U
    SET U.id = @id,
        U.password = @new_password,
    WHERE U.id = @old_password;