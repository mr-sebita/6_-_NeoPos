
CREATE SCHEMA IF NOT EXISTS `neoposdb` DEFAULT CHARACTER SET utf8 ;
USE `neoposdb` ;

-- -----------------------------------------------------
-- Table `neoposdb`.`carrito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `neoposdb`.`carrito` (
  `idcarrito` INT(11) NOT NULL AUTO_INCREMENT,
  `date` DATE NULL DEFAULT NULL,
  `cost` FLOAT NULL DEFAULT NULL,
  `payment` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`idcarrito`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `neoposdb`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `neoposdb`.`cliente` (
  `idcliente` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `cuit` INT(10) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(45) NULL DEFAULT NULL,
  `avatar` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`idcliente`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `neoposdb`.`shop`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `neoposdb`.`shop` (
  `idshop` INT NOT NULL AUTO_INCREMENT,
  `cliente_idcliente` INT(11) NOT NULL,
  PRIMARY KEY (`idshop`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `neoposdb`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `neoposdb`.`products` (
  `idproducts` INT(11) NOT NULL AUTO_INCREMENT,
  `img` VARCHAR(200) NULL DEFAULT NULL,
  `price` FLOAT NULL DEFAULT NULL,
  `brand` VARCHAR(45) NULL DEFAULT NULL,
  `title` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(140) NULL DEFAULT NULL,
  `shop_idshop` INT NOT NULL,
  PRIMARY KEY (`idproducts`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `neoposdb`.`carrito_productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `neoposdb`.`carrito_productos` (
  `idcarrito_productos` INT(11) NOT NULL AUTO_INCREMENT,
  `carrito_idcarrito` INT(11) NOT NULL,
  `products_idproducts` INT(11) NOT NULL,
  PRIMARY KEY (`idcarrito_productos`))
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
  PRIMARY KEY (`idusuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;



