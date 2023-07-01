
--  User Table 
CREATE TABLE `studentdb`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `contact` VARCHAR(12) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) NULL,
  PRIMARY KEY (`id`));
-- Subject Table
CREATE TABLE `studentdb`.`subjects` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `marksObitained` INT NOT NULL,
  `max` INT NULL DEFAULT 100,
  PRIMARY KEY (`id`));

ALTER TABLE `studentdb`.`subjects` 
ADD COLUMN `userId` INT NOT NULL AFTER `max`,
ADD INDEX `userId_idx` (`userId` ASC) VISIBLE;
;
ALTER TABLE `studentdb`.`subjects` 
ADD CONSTRAINT `userId`
  FOREIGN KEY (`userId`)
  REFERENCES `studentdb`.`user` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;
