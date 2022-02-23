SELECT *
FROM appointment A
WHERE A.provider_id = @provider_id AND (A.status = 2 or A.status = 0);