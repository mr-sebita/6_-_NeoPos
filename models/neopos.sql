-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema neopos
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema neopos
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `neopos` DEFAULT CHARACTER SET utf8 ;
USE `neopos` ;

-- -----------------------------------------------------
-- Table `neopos`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `neopos`.`productos` (
  `idproductos` INT NOT NULL AUTO_INCREMENT,
  `img` VARCHAR(45) NULL,
  `price` VARCHAR(45) NULL,
  `brand` VARCHAR(45) NULL,
  `title` VARCHAR(45) NULL,
  `discount` VARCHAR(45) NULL,
  `priceWithDiscount` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`idproductos`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `neopos`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `neopos`.`user` (
  `iduser` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `surname` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`iduser`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `neopos`.`user_produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `neopos`.`user_produto` (
  `iduser_producto` INT NOT NULL,
  `user_iduser` INT NOT NULL,
  `productos_idproductos` INT NOT NULL,
  PRIMARY KEY (`iduser_producto`, `user_iduser`, `productos_idproductos`),
  CONSTRAINT `fk_pedidos_user`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `neopos`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedidos_productos1`
    FOREIGN KEY (`productos_idproductos`)
    REFERENCES `neopos`.`productos` (`idproductos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

