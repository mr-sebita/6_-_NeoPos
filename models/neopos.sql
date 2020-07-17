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
  `idcarrito` INT NOT NULL,
  `date` VARCHAR(45) NULL,
  `cost` VARCHAR(45) NULL,
  `payment` VARCHAR(45) NULL,
  PRIMARY KEY (`idcarrito`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `neoposdb`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `neoposdb`.`cliente` (
  `idcliente` INT NOT NULL,
  `shop_idshop` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `cuit` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `avatar` VARCHAR(45) NULL,
  PRIMARY KEY (`idcliente`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `neoposdb`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `neoposdb`.`products` (
  `idproducts` INT NOT NULL,
  `img` VARCHAR(45) NULL,
  `price` VARCHAR(45) NULL,
  `brand` VARCHAR(45) NULL,
  `title` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `cliente_idcliente` INT NOT NULL,
  PRIMARY KEY (`idproducts`),

  CONSTRAINT `fk_products_cliente1`
    FOREIGN KEY (`cliente_idcliente`)
    REFERENCES `neoposdb`.`cliente` (`idcliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `neoposdb`.`carrito_productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `neoposdb`.`carrito_productos` (
  `idcarrito_productos` INT NOT NULL,
  `carrito_idcarrito` INT NOT NULL,
  `productos_idproductos` INT(200) NOT NULL,
  `products_idproducts` INT NOT NULL,
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
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `neoposdb`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `neoposdb`.`usuario` (
  `idusuario` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `surname` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `avatar` VARCHAR(45) NULL,
  `carrito_idcarrito` INT NOT NULL,
  PRIMARY KEY (`idusuario`),

  CONSTRAINT `fk_usuario_carrito1`
    FOREIGN KEY (`carrito_idcarrito`)
    REFERENCES `neoposdb`.`carrito` (`idcarrito`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
