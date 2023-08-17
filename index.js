const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const MongoStore = require('connect-mongo');

const analyticsRouter = require('./routes/index.js');
const exampleRouter = require('./routes/index.js');
const initial_pageRouter = require('./routes/index.js');
const indexRouter = require('./routes/index.js');
const loginRouter = require('./routes/index.js');
const my_postsRouter = require('./routes/index.js');
const routinesRouter = require('./routes/index.js');
const signUpRouter = require('./routes/index.js');
const newPostRouter = require('./routes/index.js');

const app = express();
require('./server.js');
require('./passport/local-auth.js');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://Raziel:messi10@cluster0.ajugo4s.mongodb.net/Vibes' }),
  secret: 'keyboard cat', 
  resave: true, 
  saveUninitialized: true 
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.signinMessage = req.flash('signinMessage');
  res.locals.signupMessage = req.flash('signupMessage');
  res.locals.user = req.user;
  console.log(res.locals);
  next();
});

const port = 3000;
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');
app.use(express.static(__dirname));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/analytics', analyticsRouter);
app.use('/example', exampleRouter);
app.use('/initial_page', initial_pageRouter);
app.use('/index', indexRouter);
app.use('/login', loginRouter);
app.use('/my_posts', my_postsRouter);
app.use('/routines', routinesRouter);
app.use('/signUp', signUpRouter);
app.use('/newPost', newPostRouter);

// catch 404 and forward to error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error'); // Asegúrate de que la vista "error" exista y sea 'error.pug'
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
