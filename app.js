require('dotenv').config();

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const registerHelpers = require('./loaders/hbs')
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

const homeRouter = require('./routes/homepage');
const authRouter = require('./routes/auth');
const bookingsRouter = require('./routes/bookings');
const chefRouter = require('./routes/chef');
const recipesRouter = require('./routes/recipes');
const userRouter = require('./routes/user');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//To use the partial views
hbs.registerPartials(__dirname + '/views/partials');

// Middleware Setup
app.use(logger('dev'));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//HBS helpers
registerHelpers(hbs);

//SESSION MIDDLEWARE
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 600000 //10 min
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 //1 day
  })
}));

//Para verificar el estado de la session, este middleware nos permite personalisar la homepage facilmente en auth/homepage.hbs
app.use((req, res, next) => {
  if (req.session.currentUser) {
    //La información del usuario de la sesión (solo disponible si ha iniciado sesión).
    res.locals.currentUserInfo = req.session.currentUser;
    //Un booleano que indica si hay un usuario conectado o no.
    res.locals.userIsLoggedIn = true;
  } else {
    res.locals.userIsLoggedIn = false;
  }

  next();
})

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/', bookingsRouter);
app.use('/', chefRouter);
app.use('/', recipesRouter);
app.use('/', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;