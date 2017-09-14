var http    = require('http');
var mysql   = require('mysql');
var fs      = require('fs'),
nconf       = require('nconf');
var colors  = require('colors/safe');
colors.setTheme({
  info: 'yellow',
  help: 'blue',
  error: 'red',
  debug: 'green'
});
nconf.argv().env().file({ file: __dirname+'/config/app-config.json' });

var httpServer = http.createServer();
httpServer.listen(nconf.get('app:port'), function() {
    console.log(colors.info('Serveur en écoute sur le port ')+nconf.get('app:port'));
});
var io = require('socket.io').listen(httpServer);

var con = mysql.createConnection({
  host: nconf.get('database:host'),
  port: nconf.get('database:port'),
  user: nconf.get('database:username'),
  password: nconf.get('database:password'),
  database: nconf.get('database:database')
});

function loadData( callback ) {
    con.connect(function(err) {
        con.query("SELECT * FROM festivals", function (err, result, fields) {
            // console.log(result.length);
            var festivals = [];
            for(festival of result) {
                festivals.push(festival);
            }
            callback(festivals);
        });
    });
}
con.on('error', function(err) {
  console.log(colors.error(err.code));
});

io.sockets.on("connection", function( socket ){
    console.log(colors.info("L'utilisateur ") + socket.id + colors.info(" vient de se connecter"));
    loadData(function(data){
        socket.emit('loadData', data);
    });
});