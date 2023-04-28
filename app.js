var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');
const passport = require('passport');
require('./config/passport')(passport);
const authRouter = require('./routes/auth');

var indexRouter = require('./routes/index');
// var basketsRouter = require('./routes/baskets');
// var itemsRouter = require('./routes/items');
// var ordersRouter = require('./routes/orders');
// var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
      secret: 'thurs-auth',
      resave: false,
      saveUninitialized: false,
    })
  );
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/auth', authRouter);
// app.use('/baskets', basketsRouter);
// app.use('/items', itemsRouter);
// app.use('/orders', ordersRouter);
// app.use('/users', usersRouter);

module.exports = app;
