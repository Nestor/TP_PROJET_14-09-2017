class App {
    constructor() {
        this.$map = $('#map');
        this.map = null;
        this.main=null;

        this.markers = []; // liste de tout les markers
    }
    init() {
        this.map = new google.maps.Map(this.$map[0], {
            center: {lat: 0, lng: 0},
            zoom: 12
        });
        this.map.addListener('click', function(position) {
            var position = position.latLng;
            console.log("lat: "+position.lat()+"\nlng: "+position.lng());
        });
        this.main();
    }
    centerPosition() {
        var that = this;
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            that.map.setCenter(pos);
        });
    }
    loadMarkers(markers) {
        for(var marker of markers) {
            this.addMarker(marker);
        }
    }
    addMarker(markerObjet) {
        var that = this;
        var pos = {
            lat: parseFloat(markerObjet.latitude),
            lng: parseFloat(markerObjet.longitude)
        };
        var marker = new google.maps.Marker({
            position: pos,
            map: this.map,
            title: markerObjet.title,
            icon: markerObjet.icon,
            description: markerObjet.description
        });
        this.markers.push(marker);
        var info = this.addInfowindow(marker);
        marker.addListener('click', function() {
            info.open(that.map, marker);
        });
    }
    addInfowindow(marker) {
        var infowindow = new google.maps.InfoWindow({
            content: '<h2>'+marker.title+'</h2><p>'+marker.description+'</p>'
        });
        return infowindow;
    }
}