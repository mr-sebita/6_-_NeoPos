/**
 * Neopos App entry point
 *
 * Importacion de modulos y librerias
 *
 * @link   
 * @file   This files defines the entry point
 * @author Martin, Mauricio, Jesus, Seba
 * @since  2020
 */

/**
 * Node modules
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

/**
 * Application Modules
 */
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var productRouter = require('./routes/product');
var cartRouter = require('./routes/cart');
var shopRouter = require('./routes/shop');
var app = express();

/**
 * Methods
 */
const methodOverride = require('method-override');

/**
 * Middlewares
 */



/**
 * Applications Setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session({ secret: 'Secreto!!' }));

/**
 * Routes
 */
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/shop', shopRouter);
app.use(function(req, res, next) {
    res.status(404).render('error404');
    next();
});

/**
 * Error Handler
 */
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error404');
});

module.exports = app;
