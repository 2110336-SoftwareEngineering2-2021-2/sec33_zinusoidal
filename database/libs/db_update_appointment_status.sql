UPDATE appointment A
    SET A.status = @status
    WHERE A.id = @appointment_id;