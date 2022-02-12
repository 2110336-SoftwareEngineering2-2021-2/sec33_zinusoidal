SELECT P.id
FROM provider P
WHERE P.rating >= @minRating AND
    P.rating <= @maxRating AND
    EXISTS (
        SELECT *
        FROM provider_service S
        WHERE S.provider_id = P.id AND
            (@fortune_type = " " OR S.fortune_type = @fortune_type) AND
            S.price >= @minPrice AND
            S.price <= @maxPrice 
);