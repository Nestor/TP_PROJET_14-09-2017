var http    = require('http');
var mysql   = require('mysql');
var fs      = require('fs'),
nconf       = require('nconf'); // pour le fichier de configuration

/* pour avoir une coloration au niveau des logs console */
var colors  = require('colors/safe');
colors.setTheme({
  info: 'yellow',
  help: 'blue',
  error: 'red',
  debug: 'green'
});

// pour être 100% safe
var sha1 = require('sha1');

// Les class
var App = require("./js/serveur/class/App");

// Importation du fichier config
nconf.argv().env().file({ file: __dirname+'/config/app-config.json' });

// On applique la configuration MYSQL du fichier app-config
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

/* Gestion des erreurs MYSQL */
con.on('error', function(err) {
  console.log(colors.error(err.code));
});

/* 
    Evènements du socket
    Les requetes MYSQL sont dans la class App
*/
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
    socket.on('UnSubscribeEvent', function(userId, festivalId) {
        app.removeSubscribeEvent(festivalId, userId ,function() {
            app.loadSubscribeEvents(userId, function(result) {
                socket.emit('loadSubscribeEvents', result);
            });
        });
    });
    socket.on('addEvent', function(data) {
        app.addEvent(data, function() {
            // console.log(result);
            app.loadData(function(data){
                socket.emit('loadData', data);
            });
        });
    });
});
