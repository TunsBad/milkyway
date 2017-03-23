var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

var app = express();

app.set('port', (process.env.PORT || 5000));

//mongoose.connect('mongodb://localhost:27017/Milkyway');
mongoose.connect('mongodb://tundebadmus:BB.Inc_3@milkyway-shard-00-00-1zmvt.mongodb.net:27017,milkyway-shard-00-01-1zmvt.mongodb.net:27017,milkyway-shard-00-02-1zmvt.mongodb.net:27017/Milkyway?ssl=true&replicaSet=Milkyway-shard-0&authSource=admin')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});

var routes = require('./routes/index');
var users = require('./routes/users');
var enquiryRouter = require('./routes/enquiryRouter');

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'app')));

app.use('/', routes);
app.use('/users', users);
app.use('/enquiries', enquiryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.listen(app.get('port'), function() {
  console.log('The app is running on port', app.get('port'));
});
