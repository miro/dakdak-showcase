const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const flash = require('express-flash');
const path = require('path');

const image = require('./core/image-core');


// # Initialize Express app
const app = express();

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(compression());

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET || 'lololz'
  // store: new MongoStore({
  //   url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
  //   autoReconnect: true
  // })
}));

app.use(flash());

// TODO: maybe enable this later?
// app.use((req, res, next) => {
//   if (req.path === '/api/upload') {
//     next();
//   } else {
//     lusca.csrf()(req, res, next);
//   }
// });
// app.use(lusca.xframe('SAMEORIGIN'));
// app.use(lusca.xssProtection(true));

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// TODO: maybe enable this later?
// app.use((req, res, next) => {
//   // After successful login, redirect back to the intended page
//   if (!req.user &&
//       req.path !== '/login' &&
//       req.path !== '/signup' &&
//       !req.path.match(/^\/auth/) &&
//       !req.path.match(/\./)) {
//     req.session.returnTo = req.path;
//   }
//   next();
// });


// # Routes
app.get('/', (req, res) => image.getLatest()
  .then(images => res.render('home', { images }))
  .catch(error => res.render('error', { error }))
);

app.get('/image/:id', (req, res) => image.get(req.params.id)
  .then(imageModel => res.render('image', { image: imageModel }))
  .catch(error => res.render('error', { error }))
);

app.get('/ig', (req, res) => res.render('instagram-test'));


// # Static content
app.use('/', express.static(`${__dirname}/../dist/`));


app.use(errorHandler());


// # Start
app.listen(app.get('port'), () => {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
