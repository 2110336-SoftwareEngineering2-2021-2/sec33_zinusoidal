DROP TABLE IF EXISTS appointment_service;
CREATE TABLE appointment_service
(
    appointment_id varchar(100),
	fortune_type varchar(100),
    price int,
    start_time datetime NOT NULL,
    finish_time datetime NOT NULL,

    PRIMARY KEY (appointment_id,start_time)
);