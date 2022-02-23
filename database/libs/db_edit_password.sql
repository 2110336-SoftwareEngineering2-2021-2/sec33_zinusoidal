UPDATE fortune_user U
    SET U.password = @new_password
    WHERE U.id = @id AND U.password = @old_password;