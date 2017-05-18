$(document).ready(function(){
    var long,lati;
    var c = 0;
    var unit = "metric";
     function getLoc(long, lati, unit){
     $.ajax({
        url: "https://www.googleapis.com/geolocation/v1/geolocate?key='Your API KEY'",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        success: function(data, status){
            if(status == "success"){
                 long = data.location['lng'];
                 lati = data.location['lat'];
                 getTemp(long, lati, unit);
            }
            else{
                alert("404");
            }
        }
    });
}
getLoc(long, lati, unit);
function getTemp(long, lati, unit){
    $.ajax({
                     url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lati + "&lon=" + long + "&appid=YOUR API ID" + "&units=" + unit,
                        type: "post",
                        dataType: "json",
                        success: function(data, status){
                            if(status == "success"){
                                $('#cont').html(`
                                 <br/></br/><h4>Country : ${data.sys["country"]}</h4>
                                 <h4>Area : ${data.name}</h4>
                                 <h4>Weather : ${data["weather"][0].main}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="http://openweathermap.org/img/w/${data['weather'][0].icon}.png"></h4>
                                 <h4>Description : ${data["weather"][0].description}</h4>
                                 <h4>Temperature : ${data.main["temp"]}</h4>
                                 <span>Temperature (Min) : ${data.main["temp_min"]}</span>
                                 <span>Temperature (Max) : ${data.main["temp_max"]}</span>
                                 <h4>Humidity : ${data.main["humidity"]}</h4>
                                 <h4>Wind Speed : ${data.wind["speed"]}</h4>
                                 <h4>Clouds : ${data.clouds["all"]}</h4>
                                 
                                `);
                                if(data["weather"][0].main == "clear sky")
                                    $('body').css("background-image","url(images/sunny-day.jpg)");
                                if(data["weather"][0].main == "few clouds")
                                    $('body').css("background-image","url(images/partly.jpg)");
                                if(data["weather"][0].main == "broken clouds")
                                    $('body').css("background-image","url(images/bg_weather_sunny_day.jpg)");
                                if(data["weather"][0].main == "scattered clouds")
                                    $('body').css("background-image","url(images/partly.jpg)");
                                if(data["weather"][0].main == "rain")
                                    $('body').css("background-image","url(images/raindrops.jpg)");
                                if(data["weather"][0].main == "thunderstorm")
                                    $('body').css("background-image","url(images/storm.jpg)");
                                if(data["weather"][0].main == "snow")
                                    $('body').css("background","url(images/Snow.jpg)");
                                if(data["weather"][0].main == "Haze")
                                    $('body').css("background","url(images/windy-weather.jpg)");


                                    $('body').css("background-repeat","no-repeat");
                                    $('body').css("background-size","cover");
                            }
                            else{
                                alert("404");
                            }
                        }
                    });
}
$('#btnChange').click(function(){
    if( c == 0){
         unit = "imperial";
        $('#btnChange').html("Celsius");
        c = 1;
    }
    else{
         unit = "metric";
        $('#btnChange').html("Fahrenheit");
        c = 0;
    }
    getLoc(long, lati, unit);
});
});
    
