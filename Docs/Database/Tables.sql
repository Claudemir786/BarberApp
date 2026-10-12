CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` char(2) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/

CREATE TABLE `barbers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `barbershop_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `barbershop_id` (`barbershop_id`),
  CONSTRAINT `barbers_ibfk_1` FOREIGN KEY (`barbershop_id`) REFERENCES `barbershops` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/


CREATE TABLE `appointments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `barbershop_id` int NOT NULL,
  `service_id` int NOT NULL,
  `barber_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `appointment_date` date NOT NULL,
  `appointment_time` time NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  `reminder_sent` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `barbershop_id` (`barbershop_id`),
  KEY `service_id` (`service_id`),
  KEY `barber_id` (`barber_id`),
  KEY `fk_appointment_customer` (`customer_id`),
  CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`barbershop_id`) REFERENCES `barbershops` (`id`),
  CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`),
  CONSTRAINT `appointments_ibfk_3` FOREIGN KEY (`barber_id`) REFERENCES `barbers` (`id`),
  CONSTRAINT `fk_appointment_customer` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/

CREATE TABLE `barbershops` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `contact_phone` varchar(20) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `city` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `barbershops_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/

CREATE TABLE `business_hours` (
  `id` int NOT NULL AUTO_INCREMENT,
  `barbershop_id` int NOT NULL,
  `weekday_open` time NOT NULL,
  `weekday_close` time NOT NULL,
  `works_saturday` tinyint(1) DEFAULT '0',
  `saturday_open` time DEFAULT NULL,
  `saturday_close` time DEFAULT NULL,
  `works_sunday` tinyint(1) DEFAULT '0',
  `sunday_open` time DEFAULT NULL,
  `sunday_close` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `barbershop_id` (`barbershop_id`),
  CONSTRAINT `business_hours_ibfk_1` FOREIGN KEY (`barbershop_id`) REFERENCES `barbershops` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*----------------------------------------------------------------------------------------------------------------------------------------------------*/


CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `barbershop_id` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `duration_minutes` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `barbershop_id` (`barbershop_id`),
  CONSTRAINT `services_ibfk_1` FOREIGN KEY (`barbershop_id`) REFERENCES `barbershops` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




