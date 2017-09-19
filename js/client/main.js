var $input = {
    $username: $('#INPUT_username'),
    $password: $('#INPUT_password'),

    $titre: $('#ADMTitre'),
    $description: $('#ADMDescription'),
    $latitude: $('#ADMLatitude'),
    $longitude: $('#ADMLongitude'),
    $date_debut: $('#ADMDate_debut'),
    $date_fin: $('#ADMDate_fin'),
    $icon: $('#ADMIcon'),
    $checkbox: $('input[type="checkbox"]')
};


$('#loginForm').submit(function(e) {
    e.preventDefault();
    app.socket.emit('login', $input.$username.val(), $input.$password.val());
});
$( "#popup" ).on( "click", "#btn-sub", function() {
    user.subscribeFestival();
    $('#popup').fadeToggle();
});
$( "#popup" ).on( "click", "#btn-unsub", function() {
    user.unSubscribeFestival();
    $('#popup').fadeToggle();
});
$('#popup').on('click', '.header .btn-close', function() {
    $('#popup').fadeToggle();
});
$('#adminAddMarker').submit(function(e) {
    e.preventDefault();
    var styleType = "";

    for(var i=0; i<$input.$checkbox.length; i++) {
        if($($input.$checkbox[i]).is(':checked')) {
            styleType += $($input.$checkbox[i]).attr('data-type')+' ';
        }
    }
    styleType = styleType.substr(0,styleType.length-1);

    data = [
        $input.$titre.val(),
        $input.$description.val(),
        $input.$date_debut.val(),
        $input.$date_fin.val(),
        'images/type/'+$input.$icon.val()+'.png',
        $input.$latitude.val(),
        $input.$longitude.val(),
        styleType
    ];
    app.socket.emit('addEvent', data);
});
$( "#itemsParticipeContainer" ).on( "click", ".btn-loc", function() {
    app.setPosition($(this).attr('data-lat'), $(this).attr('data-lng'));
});
$('.cbs').click(function(){
    if($(this).is(':checked')) {
        app.addFilter($(this).attr('data-type'));
    } else {
        app.removeFilter($(this).attr('data-type'));
    }
    app.applyFilter();
    
});
