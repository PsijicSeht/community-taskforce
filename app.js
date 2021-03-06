require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override')
const usersRouter = require('./routes/users');
const mongoose = require('mongoose')
const app = express();
const citiesController = require('./routes/citiesController')
const issuesController = require('./routes/issuesController')
const volunteersController = require('./routes/volunteersController')
const taskforcesController = require('./routes/taskforcesController')
// view engine setup


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req,res)=>{
  res.render('index')
});

app.use('/cities', citiesController)
app.use('/cities/:cityName/issues', issuesController)
app.use('/cities/:cityName/issues/:issueIndex/taskforces', taskforcesController)
app.use('/cities/:cityName/issues/:issueIndex/taskforces/:taskforceIndex/volunteers', volunteersController)



//listeners
mongoose.connect(process.env.MONGODB_URI)





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
