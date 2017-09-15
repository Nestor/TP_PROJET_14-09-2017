class App {
    constructor() {
        this.$map = $('#map');
        this.map = null;
        this.main=null;

        this.markers = []; // liste de tout les markers
        this.currentMarkerSelect=null;
        this.currentFestivalSelected = {};
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
            id: markerObjet.id,
            position: pos,
            map: this.map,
            title: markerObjet.title,
            icon: markerObjet.icon,
            description: markerObjet.description
        });
        this.markers.push(marker);
        var info = this.addInfowindow(marker);

        marker.addListener('click', function() {
            that.currentFestivalSelected = {
                id: markerObjet.id,
                title: markerObjet.title,
                description: markerObjet.description,
                date_debut: markerObjet.date_debut,
                date_fin: markerObjet.date_fin,
                icon: markerObjet.icon
            };

            $('#popup .header .title').text(that.currentFestivalSelected.title);
            $('#popup .container .description').text(that.currentFestivalSelected.description);
            $('#popup .container .music-type').text('empty not define in database');
            var options = {
                dayNames : ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
                dayNamesMin : ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
                monthNames : ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"],
                monthNamesShort : ["Jan", "Fev", "Mar", "Avr", "Mai", "Jui", "Jul", "Aou", "Sep", "Oct", "Nov", "Dec"],
                minDate : new Date(that.currentFestivalSelected.date_debut),
                maxDate: new Date(that.currentFestivalSelected.date_fin),
                dateFormat : "dd/mm/yy"
            };
            $('#popup .container .date-calendar .calendar').datepicker( options );
            
            $('#popup').fadeToggle();
        });

    }
    addInfowindow(marker) {
        var infowindow = new google.maps.InfoWindow({
            content: '<h2>'+marker.title+'</h2><p>'+marker.description+'</p><div id="btn">S\'incrire</div><div id="datePck"></div>'
        });
        return infowindow;
    }
}