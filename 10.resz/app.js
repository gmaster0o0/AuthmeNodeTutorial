const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

require('dotenv').config();

const AppError = require('./utils/error');
const globalErrorHandler = require('./controllers/errorController');

const usersRouter = require('./routes/userRoute');
const viewRouter = require('./routes/viewRoute');
const adminRouter = require('./routes/adminRouter');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/users', limiter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Security
app.use(helmet());

app.use('/', viewRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`${req.originalUrl} Oldal nem található a szerveren`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
