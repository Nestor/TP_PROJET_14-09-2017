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
            // dateFormat : "dd/mm/yy"
            dateFormat : "yy/mm/dd"
        };
        this.markers = [];
        this.filter = [];
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
                $input.$latitude.val(position.latLng.lat);
                $input.$longitude.val(position.latLng.lng);
                if(that.showAdminPanel == false) {
                    $('#adminPanel').fadeIn();
                    that.showAdminPanel = true;
                    
                } else {
                    $('#adminPanel').fadeOut();
                    that.showAdminPanel = false;
                }
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
            description: markerObjet.description,
            type: markerObjet.type
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
        this.markers.push(marker);
    }
    setPosition(lat, lng) {
        var pos = {
            lat: parseFloat(lat),
            lng: parseFloat(lng)
        };
        this.map.setZoom(15);
        this.map.setCenter(pos);
    }
    setSearch(type, bool) {
        for( var i=0; i<this.markers.length; i++ ) {
            var markerType = this.markers[i].type;
            var markerFilters = markerType.split(" ");

            for(var markerFilter of markerFilters) {
                if(type == markerFilter) {
                    this.markers[i].setVisible(bool);
                    break;
                } else {
                    this.markers[i].setVisible(false);
                }
            }
        }
    }
    test() {
        for(var marker of this.markers) {
            console.log(marker);
        }
    }
    addFilter(type) {
        this.filter.push(type);
    }
    removeFilter(type) {
        for(var i=0;i<this.filter.length;i++) {
            if(this.filter[i] == type) {
                this.filter.splice(i, 1);
            }
        }
    }
    applyFilter() {
        for( var  marker of this.markers){
            marker.setVisible(false);
            var typem = marker.type.split(' ');
            for( var type of typem){
                for( var filtre of this.filter){
                    if( type == filtre){
                        marker.setVisible(true);
                    }
                }
            }
        }
        if(this.filter.length == 0) {
            this.displayAllMarker();
        }
    }
    displayAllMarker() {
        for( var marker of this.markers){
            marker.setVisible(true);
        }
    }
    dateDiff(eventDate) {
        var date = new Date();
        var today = {
            year: date.getFullYear(),
            month: date.getMonth()+1,
            day: date.getDate()
        };
        var funcDate = new Date(eventDate);
        var dateEvent = {
            year: funcDate.getFullYear(),
            month: funcDate.getMonth()+1,
            day: funcDate.getDate()
        };
        if(today.year == dateEvent.year) {
            if(today.month == dateEvent.month) {
                if(today.day < dateEvent.day) {
                    var diff = dateEvent.day%today.day;
                    if(diff>1) {
                        return 'Festival dans '+dateEvent.day%today.day+' jours';
                    } else {
                        return 'Festival dans '+dateEvent.day%today.day+' jour';
                    }
                } else if(today.day == dateEvent.day) {
                    return 'en_cours';
                }
            } else if(today.month < dateEvent.month) {
                var diff = dateEvent.month%today.month;
                return 'Le Festival est dans '+diff+' mois';
            }
        } else if(today.year < dateEvent.year) {
            var diff = dateEvent.year%today.year;
            return 'Le Festival est dans '+diff+' ans';
        }
    }
}