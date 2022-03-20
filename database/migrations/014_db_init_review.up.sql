DROP TABLE IF EXISTS review;
CREATE TABLE review
(
    appointment_id varchar(100) NOT NULL,
    review_score int NOT NULL,
    review_comment varchar(1000),

    PRIMARY KEY appointment_id,
    CONSTRAINT fk_rev_app FOREIGN KEY (appointment_id) REFERENCES appointment(appointment_id) ON DELETE CASCADE
);