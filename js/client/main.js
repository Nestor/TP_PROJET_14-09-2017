var $username = $('#INPUT_username');
var $password = $('#INPUT_password');
$('#loginForm').submit(function(e) {
    e.preventDefault();
    socket.emit('login', $username.val(), $password.val());
});
$( "#popup" ).on( "click", "#btn", function() {
    socket.emit('SubscribeEvent', user.id, app.currentFestivalSelected.id);
});
$('#popup').on('click', '.header .btn-close', function() {
    $('#popup').fadeToggle();
});