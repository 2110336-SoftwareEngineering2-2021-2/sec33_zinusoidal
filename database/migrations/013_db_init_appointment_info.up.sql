DROP TABLE IF EXISTS appointment_info;
CREATE TABLE appointment_info
(
    appointment_id varchar(100),
	info_name varchar(100),
    info_value varchar(500),

    PRIMARY KEY (appointment_id,info_name),
    CONSTRAINT fk_app_inf FOREIGN KEY (appointment_id) REFERENCES appointment(appointment_id) ON DELETE CASCADE
);