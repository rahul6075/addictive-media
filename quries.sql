
--  User Table 
CREATE TABLE `sql12629842`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `dob` VARCHAR(45) NOT NULL,
  `country` VARCHAR(250) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL,
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
