UPDATE appointment A
    SET A.status = @status
    WHERE A.appointment_id = @appointment_id and A.provider_id = @provider_id;