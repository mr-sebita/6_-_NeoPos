-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema neoposdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema neoposdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `neoposdb` DEFAULT CHARACTER SET utf8 ;
USE `neoposdb` ;

-- -----------------------------------------------------
-- Table `neoposdb`.`carrito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `neoposdb`.`carrito` (
  `idcarrito` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `date` DATE NULL DEFAULT NULL,
  `cost` FLOAT UNSIGNED NULL DEFAULT NULL,
  `payment` TINYINT(1) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`idcarrito`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `neoposdb`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `neoposdb`.`cliente` (
  `idcliente` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `shop_idshop` INT(11) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `cuit` INT(10) UNSIGNED NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(45) NULL DEFAULT NULL,
  `avatar` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`idcliente`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `neoposdb`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `neoposdb`.`products` (
  `idproducts` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `img` VARCHAR(200) NULL DEFAULT NULL,
  `price` FLOAT UNSIGNED NULL DEFAULT NULL,
  `brand` VARCHAR(45) NULL DEFAULT NULL,
  `title` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(140) NULL DEFAULT NULL,
  `cliente_idcliente` INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`idproducts`),
  CONSTRAINT `fk_products_cliente1`
    FOREIGN KEY (`cliente_idcliente`)
    REFERENCES `neoposdb`.`cliente` (`idcliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `neoposdb`.`carrito_productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `neoposdb`.`carrito_productos` (
  `idcarrito_productos` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `carrito_idcarrito` INT(11) NOT NULL,
  `products_idproducts` INT(11) NOT NULL,
  PRIMARY KEY (`idcarrito_productos`),
  CONSTRAINT `fk_carrito_productos_carrito`
    FOREIGN KEY (`carrito_idcarrito`)
    REFERENCES `neoposdb`.`carrito` (`idcarrito`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_carrito_productos_products1`
    FOREIGN KEY (`products_idproducts`)
    REFERENCES `neoposdb`.`products` (`idproducts`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `neoposdb`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `neoposdb`.`usuario` (
  `idusuario` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `surname` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(45) NULL DEFAULT NULL,
  `avatar` VARCHAR(200) NULL DEFAULT NULL,
  `carrito_idcarrito` INT(11) NOT NULL,
  PRIMARY KEY (`idusuario`),
  CONSTRAINT `fk_usuario_carrito1`
    FOREIGN KEY (`carrito_idcarrito`)
    REFERENCES `neoposdb`.`carrito` (`idcarrito`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
