/**
 * 
 *  Rutas de Usuario
 * 
 */

/**
 * Modulos Node
 */
var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');
var path = require('path');
var { check, validationResult, body } = require('express-validator');

/**
 * User CRUD
 */
router.get('/login', userController.getLogin);
router.post('/login', [
    /* Express Validator - Check middleware*/
    check('email').isEmail().withMessage('Coloque su E-mail'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener como mínimo 8 caracteres'),
], userController.login);

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

router.get('/registerUser', userController.user);
router.post('/registerUser', [
    /* Express Validator - Check middleware */
    check('name'),
    check('email').isEmail().withMessage('Ingrese un email válido para poder registrarse'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener como mínimo 8 caracteres'),
], userController.registerUser);

router.get('/registerAdmin', userController.admin);
router.post('/registerAdmin', [
    /* Express Validator - Check middleware */
    check('name'),
    check('email').isEmail().withMessage('Ingrese un email válido para poder registrarse'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener como mínimo 8 caracteres'),
], userController.registerAdmin);

module.exports = router;