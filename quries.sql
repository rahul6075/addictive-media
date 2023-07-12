
--  User Table 
CREATE TABLE `sql12629842`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `dob` VARCHAR(45) NOT NULL,
  `country` VARCHAR(250) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`));

-- Countries
CREATE TABLE `sql12629842`.`countries` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `code` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`)) 

-- Exapmle