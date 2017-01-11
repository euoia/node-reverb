var express = require('express');
var http = require('http');
var path = require('path');
var test = require('./routes/test.js');
var prefs = require('./routes/prefs.js');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var favicon = require('serve-favicon');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var errorhandler = require('errorhandler');

var app = express();

// Use coloured short logging format in development.
if ('development' == app.get('env')) {
	app.use(morgan('dev'));
} else {
	app.use(morgan('combined'));
}

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, '../public', 'images', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
	store: new RedisStore(),
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, '../public')));

// Set up routes.
app.get('/', test.newTest);
app.post('/test/check', test.check);

app.post('/prefs/deselectVerbs', prefs.deselectVerbs);
app.post('/prefs/selectVerbs', prefs.selectVerbs);
app.post('/prefs/deselectMood', prefs.deselectMood);
app.post('/prefs/selectMood', prefs.selectMood);
app.post('/prefs/setAudioEnabled', prefs.setAudioEnabled);
app.post('/prefs/setOptionalAccents', prefs.setOptionalAccents);
app.post('/prefs/setTranslationLanguage', prefs.setTranslationLanguage);

// Development: show errors to the user.
if ('development' == app.get('env')) {
	app.use(errorhandler());
}

app.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
