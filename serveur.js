var http    = require('http');
var mysql   = require('mysql');
var fs      = require('fs'),
nconf       = require('nconf');
var colors  = require('colors/safe');
var sha1 = require('sha1');
var App = require("./js/serveur/class/App");

colors.setTheme({
  info: 'yellow',
  help: 'blue',
  error: 'red',
  debug: 'green'
});

nconf.argv().env().file({ file: __dirname+'/config/app-config.json' });

var con = mysql.createConnection({
  host: nconf.get('database:host'),
  port: nconf.get('database:port'),
  user: nconf.get('database:username'),
  password: nconf.get('database:password'),
  database: nconf.get('database:database')
});
var app = new App(con);

var httpServer = http.createServer();
httpServer.listen(nconf.get('app:port'), function() {
    console.log(colors.info('Serveur en écoute sur le port ')+nconf.get('app:port'));
});
var io = require('socket.io').listen(httpServer);

con.on('error', function(err) {
  console.log(colors.error(err.code));
});

io.sockets.on("connection", function( socket ){
    console.log(colors.info("L'utilisateur ") + socket.id + colors.info(" vient de se connecter"));
    socket.on('login', function(username, password) {
        app.loadUser(username, sha1(password), function(result) {
            if(result != null) {
                socket.emit('login:success', result);
                app.loadData(function(data){
                    socket.emit('loadData', data);
                });
            } else {
                socket.emit('login:wrong', null);
            }
        });
    });
    socket.on('loadSubscribeEvents', function(userId) {
        app.loadSubscribeEvents(userId, function(result) {
            socket.emit('loadSubscribeEvents', result);
        });
    });
    socket.on('SubscribeEvent', function(userId, festivalId) {
        app.addSubscribeEvent(festivalId, userId ,function() {
            app.loadSubscribeEvents(userId, function(result) {
                socket.emit('loadSubscribeEvents', result);
            });
        });
    });
});