DROP TABLE IF EXISTS appointment;
CREATE TABLE appointment
(
    appointment_id varchar(100),
	customer_id varchar(100) NOT NULL,
    provider_id varchar(100) NOT NULL,
	fortune_type varchar(100),
    information varchar(500),
    
    price int,
    start_time datetime NOT NULL,
    finish_time datetime NOT NULL,
    status BIT(2) default 0,   /* 0 pending, 1 rejected, 2 accepted */

    PRIMARY KEY (appointment_id),
    CONSTRAINT fk_app_cus FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE,
    CONSTRAINT fk_app_pro FOREIGN KEY (provider_id) REFERENCES customer(id) ON DELETE CASCADE
);