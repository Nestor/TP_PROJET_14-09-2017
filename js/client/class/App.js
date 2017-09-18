class App {
    constructor() {
        this.map = null;
        this.currentFestivalSelected = {};
        this.socket = new io(':3000');
        this.showAdminPanel = false;
        this.DPOptions = {
            dayNames : ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
            dayNamesMin : ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
            monthNames : ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"],
            monthNamesShort : ["Jan", "Fev", "Mar", "Avr", "Mai", "Jui", "Jul", "Aou", "Sep", "Oct", "Nov", "Dec"],
            dateFormat : "dd/mm/yy"
        };
    }
    init() {
        this.map = new google.maps.Map($('#map')[0], {
            center: {lat: 0, lng: 0},
            zoom: 12
        });
        var that = this;
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            that.map.setCenter(pos);
        });
        this.event();
    }
    event() {
        var that = this;
        this.map.addListener('click', function(position) {
            if($('#adminMode').is(':checked')) {
                $('#adminPanel').css({
                    "position": "fixed",
                    "top": position.pixel.y,
                    "left": position.pixel.x+$('#container .container-left').width()
                });
                if(that.showAdminPanel == false) {
                    $('#adminPanel').fadeIn();
                    that.showAdminPanel = true;
                    
                } else {
                    $('#adminPanel').fadeOut();
                    that.showAdminPanel = false;
                }

                var position = position.latLng;
                console.log(position);
            }
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

        marker.addListener('click', function() {
            var eventSubscribe = false;
            
            that.currentFestivalSelected = {
                id: markerObjet.id,
                title: markerObjet.title,
                description: markerObjet.description,
                date_debut: markerObjet.date_debut,
                date_fin: markerObjet.date_fin,
                icon: markerObjet.icon,
                participe: eventSubscribe,
                type: markerObjet.type
            };

            if(user.subscribeEvents.indexOf(that.currentFestivalSelected.id) === -1) {
                that.currentFestivalSelected.participe = false;
            } else {
                that.currentFestivalSelected.participe = true;
            }

            $('#popup .header .title').text(that.currentFestivalSelected.title);
            $('#popup .container .description').text('description: '+that.currentFestivalSelected.description);
            $('#popup .container .music-type').text('type: '+that.currentFestivalSelected.type);

            that.DPOptions.minDate = new Date(that.currentFestivalSelected.date_debut);
            that.DPOptions.maxDate = new Date(that.currentFestivalSelected.date_fin);
            $('#popup .container .date-calendar .calendar').datepicker(that.DPOptions);

            if(that.currentFestivalSelected.participe == true) {
                $('#popup #htmlBtn').html('<div id="btn-unsub">Ne plus participer</div>');
                that.currentFestivalSelected.participe = false;
            } else {
                $('#popup #htmlBtn').html('<div id="btn-sub">Participer</div>');
                that.currentFestivalSelected.participe = true;
            }
            user.subscribeEvents = [];
            $('#popup').fadeToggle();
        });

    }
}