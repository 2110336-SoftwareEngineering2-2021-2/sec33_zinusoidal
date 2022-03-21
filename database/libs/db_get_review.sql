SELECT C.first_name,
    C.last_name,
    C.id,
    C.profile_image,
    R.score,
    R.comment

FROM (review R left join appointment A on R.appointment_id = A.appointment_id)
    left join customer C on A.customer_id = C.id

WHERE A.provider_id = @provider_id ;