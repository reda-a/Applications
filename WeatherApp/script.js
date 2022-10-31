var key = 'aba6ff9d6de967d5eac6fd79114693cc';
$("form").submit(function (event) {
    event.preventDefault();
    var city = $("#city").val();
    if (city != "") {
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric' + '&APPID=' + key,
            type: 'GET',
            dataType: 'jsonp',
            success: function (data) {
                var widget = show(data);
                $("#weather").html(widget);
                $("#city").val('');
            }
        });
    } else {
        $("#weather").html('<p>Please enter a city.</p>');
    }
});
function show(data) {
    return '<h2>Current weather for ' + data.name + ',' + data.sys.country + '</h2>' +
        '<p>' + data.main.temp + '&deg;C</p>' +
        '<p>' + data.weather[0].main + '</p>';
}