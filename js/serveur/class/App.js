class App {
    constructor(con) {
        this.con=con;
    }
    loadData( callback ) {
        this.con.query("SELECT * FROM festivals", function (err, result, fields) {
            var festivals = [];
            for(var festival of result) {
                festivals.push(festival);
            }
            callback(festivals);
        });
    }
    loadUser(username, password, callback ) {
        this.con.query("SELECT * FROM accounts WHERE username='"+username+"' AND password='"+password+"'", function (err, result, fields) {
            callback(result[0]);
        });
    }
    loadSubscribeEvents(userId, callback) {
        var req = "SELECT f.* FROM festivals f JOIN subscribeEvents ev ON ev.userId = ? WHERE f.id = ev.eventId";
        this.con.query(req, [userId], function (err, result, fields) {
            callback(result);
        });
    }
    addSubscribeEvent(eventId, userId, callback) {
        this.con.query("INSERT INTO SubscribeEvents (eventId, userId) VALUES ('"+eventId+"', '"+userId+"')", function (err, result) {
            callback(result);
        });
    }
}
module.exports = App;