var express          = require('express');
var path             = require('path');
var favicon          = require('serve-favicon');
var logger           = require('morgan');
var cookieParser     = require('cookie-parser');
var bodyParser       = require('body-parser');
const MongoClient    = require('mongodb').MongoClient;
const db             = require('./config/db');
const port           = 3000;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(favicon(path.join(__dirname, 'public', 'images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

MongoClient.connect(db.url, (err, database) => {
    const finedb = database.db('fine');
    if (err) return console.log(err)
    require('./routes')(app, finedb);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
})

module.exports = app;
