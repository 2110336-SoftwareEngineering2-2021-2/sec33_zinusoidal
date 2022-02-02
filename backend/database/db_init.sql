CREATE DATABASE fortune168;

USE fortune168;

DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` 
(
    `id` varchar(50) NOT NULL,
    `username` varchar(50) NOT NULL,
	`first_name` varchar(50) NOT NULL,
	`last_name` varchar(50) NOT NULL,
	`nickname` varchar(50),
	`birthday` date NOT NULL,
	`gender` int NOT NULL,
	`email` varchar(100) NOT NULL,
	`password` varchar(256) NOT NULL,
	`profile_image` varchar(1000),
	`create_datetime` datetime NOT NULL,
	`delete_datetime` datetime,
	
	CONSTRAINT UNIQUE(`username`),
	CONSTRAINT UNIQUE(`email`),
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `provider`;
CREATE TABLE `provider` 
(
    `id` varchar(50) NOT NULL,
    `username` varchar(50) NOT NULL,
	`first_name` varchar(50) NOT NULL,
	`last_name` varchar(50) NOT NULL,
	`nickname` varchar(50),
	`birthday` date NOT NULL,
	`gender` int NOT NULL,
	`email` varchar(100) NOT NULL,
	`password` varchar(256) NOT NULL,
	`profile_image` varchar(1000),
	`work_experience` text(500),
	`create_datetime` datetime NOT NULL,
	`last_update_datetime` datetime,
	`delete_datetime` datetime,
	
	CONSTRAINT UNIQUE(`username`),
	CONSTRAINT UNIQUE(`email`),
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `customer_login`;
CREATE TABLE `customer_login`
(
	`login_id` varchar(50),
	`customer_id` varchar(50),
	`ip` varchar(50),
	`device` varchar(100),
	`login_time` datetime NOT NULL
	
	FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`),
	PRIMARY KEY(`login_id`)
);

DROP TABLE IF EXISTS `provider_login`;
CREATE TABLE `provider_login`
(
	`login_id` varchar(50),
	`provider_id` varchar(50),
	`ip` varchar(50),
	`device` varchar(100),
	`login_time` datetime NOT NULL
	
	FOREIGN KEY (`provider_id`) REFERENCES `provider`(`id`),
	PRIMARY KEY(`login_id`)
);

DROP TABLE IF EXISTS `provider_service`;
CREATE TABLE `provider_service`
(
	`provider_id` varchar(50),
	`fortune_type` varchar(50),
	`price` int,
	
	FOREIGN KEY (`provider_id`) REFERENCES `provider`(`id`),
	PRIMARY KEY (`provider_id`,`fortune_type`)
);
