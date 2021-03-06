-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema algorithmpracticedb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `algorithmpracticedb` ;

-- -----------------------------------------------------
-- Schema algorithmpracticedb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `algorithmpracticedb` DEFAULT CHARACTER SET utf8 ;
USE `algorithmpracticedb` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `password_UNIQUE` (`password` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `algorithm`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `algorithm` ;

CREATE TABLE IF NOT EXISTS `algorithm` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `description` VARCHAR(1000) NOT NULL,
  `rating` INT NULL,
  `user_id` INT NOT NULL,
  `sample` VARCHAR(1000) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `title_UNIQUE` (`title` ASC),
  INDEX `fk_algorithm_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_algorithm_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tracker`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tracker` ;

CREATE TABLE IF NOT EXISTS `tracker` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(1000) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` TIMESTAMP NULL,
  `user_id` INT NOT NULL,
  `algorithm_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_comment_user_idx` (`user_id` ASC),
  INDEX `fk_comment_algorithm1_idx` (`algorithm_id` ASC),
  CONSTRAINT `fk_comment_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_algorithm1`
    FOREIGN KEY (`algorithm_id`)
    REFERENCES `algorithm` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `language`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `language` ;

CREATE TABLE IF NOT EXISTS `language` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `solution`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `solution` ;

CREATE TABLE IF NOT EXISTS `solution` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `image_url` VARCHAR(500) NOT NULL,
  `algorithm_id` INT NOT NULL,
  `description` VARCHAR(1000) NULL,
  `language_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`image_url` ASC),
  INDEX `fk_solution_algorithm1_idx` (`algorithm_id` ASC),
  INDEX `fk_solution_language1_idx` (`language_id` ASC),
  INDEX `fk_solution_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_solution_algorithm1`
    FOREIGN KEY (`algorithm_id`)
    REFERENCES `algorithm` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_solution_language1`
    FOREIGN KEY (`language_id`)
    REFERENCES `language` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_solution_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS apuser@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'apuser'@'localhost' IDENTIFIED BY 'apuser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'apuser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `algorithmpracticedb`;
INSERT INTO `user` (`id`, `name`, `username`, `email`, `password`) VALUES (1, 'admin', 'admin', 'admin@admin.com', 'admin');
INSERT INTO `user` (`id`, `name`, `username`, `email`, `password`) VALUES (2, 'user1 ', 'user1', 'user1@user1.com', 'user1');
INSERT INTO `user` (`id`, `name`, `username`, `email`, `password`) VALUES (3, 'user2', 'user2', 'user2@user2.com', 'user2');

COMMIT;


-- -----------------------------------------------------
-- Data for table `algorithm`
-- -----------------------------------------------------
START TRANSACTION;
USE `algorithmpracticedb`;
INSERT INTO `algorithm` (`id`, `title`, `description`, `rating`, `user_id`, `sample`) VALUES (1, 'Two Number Sum', 'Write a function that takes in a non-empty array of distinct integers and an integer representing a target sum.', 1, 1, 'array = [5, -4, 8, 11, -1] targetSum = 10 Output: [-1, 11]');
INSERT INTO `algorithm` (`id`, `title`, `description`, `rating`, `user_id`, `sample`) VALUES (2, 'Validate Subsequence ', 'Given two non-empty arrays of integers, write a function that determines whether the second array is a subsequence of the first one.', 2, 1, 'array = [5, 1, 22, 25, 6, -1, 8, 10] sequence = [1, 6, -1, 10]  Output: true ');
INSERT INTO `algorithm` (`id`, `title`, `description`, `rating`, `user_id`, `sample`) VALUES (3, 'Minimum Wait Time ', 'Write a funciton that returns the minimum amount of total wait time for all queries ', 3, 1, 'queries = [1, 4, 5] => [5, 1, 4]  Output: (0) + (5) + (5 + 1) = 11');
INSERT INTO `algorithm` (`id`, `title`, `description`, `rating`, `user_id`, `sample`) VALUES (4, 'Sorted Squared Array ', 'Write a function that takes in a non-empty array of integers that are sorted in ascending order and returns a new array of the same length with the squares of the original integers also sorted in ascending order.', 1, 1, 'array = [1, 2, 3, 5, 6, 8, 9] Output: [1, 4, 9, 25, 36, 64, 81]');
INSERT INTO `algorithm` (`id`, `title`, `description`, `rating`, `user_id`, `sample`) VALUES (5, 'Remove Duplicates From Linked List', 'Write a function that returns a modified linked list that doesn\'t contain any repeating nodes', 3, 1, 'linkedList = 1 -> 1 -> 4 -> 4 -> 6 Output: 1 -> 4 -> 6');

COMMIT;


-- -----------------------------------------------------
-- Data for table `tracker`
-- -----------------------------------------------------
START TRANSACTION;
USE `algorithmpracticedb`;
INSERT INTO `tracker` (`id`, `content`, `created_at`, `updated_at`, `user_id`, `algorithm_id`) VALUES (1, 'pretty easy! strategized using  for loops to access array', '2021-01-01 09:00:00 ', '2021-01-01 00:00:00 ', 1, 1);
INSERT INTO `tracker` (`id`, `content`, `created_at`, `updated_at`, `user_id`, `algorithm_id`) VALUES (2, 'maybe try another solution using hash maps for faster approach', '2021-01-02 09:00:00', '2021-01-02 09:00:00', 1, 1);
INSERT INTO `tracker` (`id`, `content`, `created_at`, `updated_at`, `user_id`, `algorithm_id`) VALUES (3, 'note to self to implement a variable to store position in subsequence', '2021-01-02 09:00:00', '2021-01-02 09:00:00', 1, 2);
INSERT INTO `tracker` (`id`, `content`, `created_at`, `updated_at`, `user_id`, `algorithm_id`) VALUES (4, 'maybe review while loops and comparing array indexes to another', '2021-01-03 10:00:00', '2021-01-03 10:00:00', 1, 2);
INSERT INTO `tracker` (`id`, `content`, `created_at`, `updated_at`, `user_id`, `algorithm_id`) VALUES (5, 'in progress', '2021-01-05 10:30:00', '2021-01-03 10:30:00', 1, 3);
INSERT INTO `tracker` (`id`, `content`, `created_at`, `updated_at`, `user_id`, `algorithm_id`) VALUES (6, 'write down what the question is asking. the formula is in the sample output', '2021-01-05 11:45:00', '2021-01-03 10:00:00', 1, 3);
INSERT INTO `tracker` (`id`, `content`, `created_at`, `updated_at`, `user_id`, `algorithm_id`) VALUES (7, 'go back and look at methods that the array can call ', '2021-01-06 11:00:00', '2021-01-07 10:00:00', 1, 4);
INSERT INTO `tracker` (`id`, `content`, `created_at`, `updated_at`, `user_id`, `algorithm_id`) VALUES (8, 'another technique: dont have to sort', '2021-01-06 11:33:00', '2021-01-07 10:00:00', 1, 4);
INSERT INTO `tracker` (`id`, `content`, `created_at`, `updated_at`, `user_id`, `algorithm_id`) VALUES (9, 'tried brute force and used the hash map ', '2021-01-09 12:00:00', '2021-01-09 10:00:00', 1, 5);

COMMIT;


-- -----------------------------------------------------
-- Data for table `language`
-- -----------------------------------------------------
START TRANSACTION;
USE `algorithmpracticedb`;
INSERT INTO `language` (`id`, `name`) VALUES (1, 'Java');
INSERT INTO `language` (`id`, `name`) VALUES (2, 'JavaScript');
INSERT INTO `language` (`id`, `name`) VALUES (3, 'Go');
INSERT INTO `language` (`id`, `name`) VALUES (4, 'Python');
INSERT INTO `language` (`id`, `name`) VALUES (5, 'Typescript');

COMMIT;


-- -----------------------------------------------------
-- Data for table `solution`
-- -----------------------------------------------------
START TRANSACTION;
USE `algorithmpracticedb`;
INSERT INTO `solution` (`id`, `image_url`, `algorithm_id`, `description`, `language_id`, `user_id`) VALUES (1, 'images/a1sgo1.PNG', 1, 'Go sample solution ', 3, 1);
INSERT INTO `solution` (`id`, `image_url`, `algorithm_id`, `description`, `language_id`, `user_id`) VALUES (2, 'images/a1sjava1.PNG', 1, 'I found another solution that should work with GO', 1, 1);
INSERT INTO `solution` (`id`, `image_url`, `algorithm_id`, `description`, `language_id`, `user_id`) VALUES (3, 'images/a1sjava2.PNG', 1, 'Java sample solution 1 to question 1 ', 1, 1);
INSERT INTO `solution` (`id`, `image_url`, `algorithm_id`, `description`, `language_id`, `user_id`) VALUES (4, 'images/a1sjavascript1.PNG', 1, 'Another possible way to solve...', 2, 1);
INSERT INTO `solution` (`id`, `image_url`, `algorithm_id`, `description`, `language_id`, `user_id`) VALUES (5, 'images/a1sjavascript2.PNG', 1, 'Another JavaScript solution', 2, 1);
INSERT INTO `solution` (`id`, `image_url`, `algorithm_id`, `description`, `language_id`, `user_id`) VALUES (6, 'images/a2go1.PNG', 2, 'Go solution to 2 ', 3, 1);
INSERT INTO `solution` (`id`, `image_url`, `algorithm_id`, `description`, `language_id`, `user_id`) VALUES (7, 'images/a2java1.PNG', 2, 'Java sample solution', 1, 1);
INSERT INTO `solution` (`id`, `image_url`, `algorithm_id`, `description`, `language_id`, `user_id`) VALUES (8, 'images/a2javascript1.PNG', 2, 'JavaScript sample solution', 2, 1);
INSERT INTO `solution` (`id`, `image_url`, `algorithm_id`, `description`, `language_id`, `user_id`) VALUES (9, 'images/a2go2.PNG', 2, 'go sample solution ', 3, 1);
INSERT INTO `solution` (`id`, `image_url`, `algorithm_id`, `description`, `language_id`, `user_id`) VALUES (10, 'images/a2javascript2.PNG', 2, 'JavaScript sample solution to question 4', 2, 1);
INSERT INTO `solution` (`id`, `image_url`, `algorithm_id`, `description`, `language_id`, `user_id`) VALUES (11, 'images/a2typescript1.PNG', 2, 'typescript sample solution', 5, 1);
INSERT INTO `solution` (`id`, `image_url`, `algorithm_id`, `description`, `language_id`, `user_id`) VALUES (12, 'images/a3sjavascript1.PNG', 3, 'javascript sample solution', 2, 1);
INSERT INTO `solution` (`id`, `image_url`, `algorithm_id`, `description`, `language_id`, `user_id`) VALUES (13, 'images/a3sjava1.PNG', 3, 'Java sample solution to question 3', 1, 1);
INSERT INTO `solution` (`id`, `image_url`, `algorithm_id`, `description`, `language_id`, `user_id`) VALUES (14, 'images/a3spython1.PNG', 3, 'python sample solution', 4, 1);
INSERT INTO `solution` (`id`, `image_url`, `algorithm_id`, `description`, `language_id`, `user_id`) VALUES (15, 'images/a4stypescript.PNG', 4, 'typescript sample solution', 5, 1);
INSERT INTO `solution` (`id`, `image_url`, `algorithm_id`, `description`, `language_id`, `user_id`) VALUES (16, 'images/a4sjava1.PNG', 4, 'java sample solution', 1, 1);
INSERT INTO `solution` (`id`, `image_url`, `algorithm_id`, `description`, `language_id`, `user_id`) VALUES (17, 'images/a4sjavascript1.PNG', 4, 'javascript sample solution', 2, 1);
INSERT INTO `solution` (`id`, `image_url`, `algorithm_id`, `description`, `language_id`, `user_id`) VALUES (18, 'images/a5spython.PNG', 5, 'python sample solution', 4, 1);
INSERT INTO `solution` (`id`, `image_url`, `algorithm_id`, `description`, `language_id`, `user_id`) VALUES (19, 'images/a5sjavascript.PNG', 5, 'javascript sample solution', 2, 1);
INSERT INTO `solution` (`id`, `image_url`, `algorithm_id`, `description`, `language_id`, `user_id`) VALUES (20, 'images/a5sjava1.PNG', 5, 'java sample solution', 1, 1);

COMMIT;

