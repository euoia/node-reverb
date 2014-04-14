
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var test = require('./routes/test.js');
var prefs = require('./routes/prefs.js');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(session({ store: new RedisStore(), secret: 'keyboard cat' }));
app.use(app.router);
app.use(express.static(path.join(__dirname, '../public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Set up routes.
app.get('/', test.newTest);
app.post('/test/check', test.check);

app.post('/prefs/deselectVerb', prefs.deselectVerb);
app.post('/prefs/selectVerb', prefs.selectVerb);
app.post('/prefs/deselectMood', prefs.deselectMood);
app.post('/prefs/selectMood', prefs.selectMood);
app.post('/prefs/setAudioEnabled', prefs.setAudioEnabled);
app.post('/prefs/setOptionalAccents', prefs.setOptionalAccents);
app.post('/prefs/setTranslationLanguage', prefs.setTranslationLanguage);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
