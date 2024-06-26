var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const createError = require('http-errors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products'); // Impor rute products
var categoriesRouter = require('./routes/categories'); // Impor rute categories
var authRouter = require('./routes/auth');
var ordersRouter = require("./routes/order");
var customersRouter = require("./routes/customer");
var employeesRouter = require("./routes/employee");
var orderDetailsRouter = require("./routes/orderDetail");
var shippersRouter = require("./routes/shipper");

var sequelize = require('./models/index'); // Tambahkan ini untuk memuat koneksi database
var Category = require('./models/category');
var Supplier = require('./models/supplier');
var Product = require('./models/products');

var Shipper = require('./models/shipper');
var Customer = require('./models/customer');
var Employee = require('./models/employee');
var Order = require('./models/order');

var OrderDetail=require('./models/orderDetail');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/auth', authRouter);
app.use('/orders', ordersRouter);
app.use('/customers', customersRouter);
app.use('/employees', employeesRouter);
app.use('/orderDetails', orderDetailsRouter);
app.use('/shippers', shippersRouter);
app.use('/uploads', express.static('uploads')); // Middleware untuk menyajikan file statis


sequelize.sync()
    .then(() => {
      console.log('Database synchronized');
    })
    .catch(err => {
      console.error('Error synchronizing database:', err);
    });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send json response for errors
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;