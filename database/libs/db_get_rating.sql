SELECT AVG(*)
FROM review R left join appointment A on R.appointment_id = A.appointment_id
WHERE A.provider_id = @provider_id ;