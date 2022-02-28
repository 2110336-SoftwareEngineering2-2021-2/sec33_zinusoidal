SELECT DISTINCT S.fortune_type
FROM appointment A left join appointment_service S ON A.appointment_id = S.appointment_id
WHERE A.provider_id=@provider_id and A.status=2;