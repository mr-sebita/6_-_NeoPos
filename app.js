var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
/*---- Listado de productos --*/
var indexRouter = require('./routes/index');
/*---- Seccion Usuarios --*/
var userRouter = require('./routes/user');
/*---- Seccion Productos ----*/
var productRouter = require('./routes/product');
/*--Carrito de productos que ya compramos y vamos a pagar ----*/
var cartRouter = require('./routes/cart');
/*--Landing page del Ecommerce ----*/
var shopRouter = require('./routes/shop');
var app = express();
//METODOS PARA PUT Y DELETE
const methodOverride = require('method-override');
// Requerimos Session
let session = require('express-session');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session({ secret: 'Secreto!!' }));


app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/shop', shopRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
//<<<<<<< HEAD:NeoPos/app/app.js
//    res.status(404).render('error404');
//    next();
//=======
   // next(createError(404));
    res.render('404');
//>>>>>>> 6088ec68a1bea25218919a511b3de6fd8113313d:app.js
});


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
