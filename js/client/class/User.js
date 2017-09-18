class User {
    constructor(data) {
        this.hydrate(data);
        this.subscribeEvents = [];
        if(this.grade == "admin") {
            $('#adminMain').html('<label for="adminMode">Mode administrateur</label><input id="adminMode" type="checkbox">')
        }
    }
    hydrate(data) {
        for (var key in data){
            if (data.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
    }
    subscribeFestival() {
        app.socket.emit('SubscribeEvent', this.id, app.currentFestivalSelected.id);
    }
    unSubscribeFestival() {
        app.socket.emit('UnSubscribeEvent', this.id, app.currentFestivalSelected.id);
    }
}