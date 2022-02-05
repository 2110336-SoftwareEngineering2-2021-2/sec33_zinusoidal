CREATE DATABASE `fortune168`;

USE `fortune168`;

DROP TABLE IF EXISTS `fortune_user`;
CREATE TABLE `fortune_user`
(
	`id` varchar(100) NOT NULL,
	`username` varchar(50) NOT NULL,
	`citizen_id` varchar(13) NOT NULL,
	`email` varchar(100) NOT NULL,
	`password` varchar(256) NOT NULL,
	`create_datetime` datetime NOT NULL,
	`delete_datetime` datetime,
	`user_type` bit NOT NULL,
	`email_confirmed` bit,

	CONSTRAINT UNIQUE(`username`),
	CONSTRAINT UNIQUE(`email`),
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `activation_key`;
CREATE TABLE `activation_key`
(
	`id` varchar(100) NOT NULL,
	`activation_key` varchar(100) NOT NULL,
	`create_time` datetime,

	PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` 
(
    `id` varchar(100) NOT NULL,
	`first_name` varchar(50) NOT NULL,
	`last_name` varchar(50) NOT NULL,
	`profile_image` varchar(1000),
	
    PRIMARY KEY (`id`),
	FOREIGN KEY (`id`) REFERENCES `fortune_user`(`id`)
);

DROP TABLE IF EXISTS `provider`;
CREATE TABLE `provider` 
(
    `id` varchar(100) NOT NULL,
	`first_name` varchar(50) NOT NULL,
	`last_name` varchar(50) NOT NULL,
	`profile_image` varchar(1000),
	`biography` text(500),
	`last_update_datetime` datetime,
	
	PRIMARY KEY (`id`),
	FOREIGN KEY (`id`) REFERENCES `fortune_user`(`id`)
);

DROP TABLE IF EXISTS `login_log`;
CREATE TABLE `login_log`
(
	`login_id` varchar(100),
	`id` varchar(100),
	`ip` varchar(50),
	`device` varchar(100),
	`login_datetime` datetime NOT NULL,
	
	FOREIGN KEY (`id`) REFERENCES `fortune_user`(`id`),
	PRIMARY KEY(`login_id`)
);

DROP TABLE IF EXISTS `provider_service`;
CREATE TABLE `provider_service`
(
	`provider_id` varchar(100),
	`fortune_type` varchar(100),
	`price` int,
	
	FOREIGN KEY (`provider_id`) REFERENCES `provider`(`id`),
	PRIMARY KEY (`provider_id`,`fortune_type`)
);
