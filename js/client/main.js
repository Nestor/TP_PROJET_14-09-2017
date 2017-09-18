var $input = {
    $username: $('#INPUT_username'),
    $password: $('#INPUT_password')
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