SELECT *
FROM appointment A
WHERE A.customer_id = @customer_id AND (A.status = 2 or A.status = 0);