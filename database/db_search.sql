SELECT P.id
FROM provider P
WHERE P.rating >= @minRating AND
    P.rating <= @maxRating AND
    EXISTS (
        SELECT *
        FROM provider_service S
        WHERE S.provider_id = P.id AND
            S.fortune_type IN @fortune_list AND
            S.price >= @minPrice AND
            S.price <= @maxPrice 
);

/*
@fortune_list = ('tarot','ball','ppl')
*/