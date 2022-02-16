SELECT P.id
FROM provider P LEFT JOIN fortune_user U ON P.id = U.id
WHERE P.rating >= @minRating AND
    P.rating <= @maxRating 
    AND
    (  
        P.first_name LIKE @keyword OR
        P.last_name LIKE @keyword OR
        P.biography LIKE @keyword OR
        U.username LIKE @keyword
    ) AND
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

@keyword = '%keyword%'
*/