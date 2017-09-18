var $input = {
    $username: $('#INPUT_username'),
    $password: $('#INPUT_password'),

    $titre: $('#ADMTitre'),
    $description: $('#ADMDescription'),
    $latitude: $('#ADMLatitude'),
    $longitude: $('#ADMLongitude'),
    $date_debut: $('#ADMDate_debut'),
    $date_fin: $('#ADMDate_fin'),
    $icon: $('#ADMIcon')
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
});