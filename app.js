var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();
const port = 3000


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res,) => { 
  res.sendFile(path.join(__dirname + '/public', '/initial_page.html'));
});
app.get('/home', (req, res,) => { 
  res.sendFile(path.join(__dirname + '/public', '/initial_page.html'));
});
app.get('/stats', (req, res, ) => { 
  res.sendFile(path.join(__dirname + '/public', '/analytics.html'));
}); 
app.get('/landing', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', '/landing.html'));
});

app.get('/activity', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', '/my_posts.html'));
});

app.get('/routines', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', '/routines.html'));
});

app.get('/example', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', '/example.html'));
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
