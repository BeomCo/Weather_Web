$(document).ready(function(){

    var state_icon = "";    //날씨 아이콘의 이름을 초기 변수로 구성 (전역 변수) - https://erikflowers.github.io/weather-icons/ 사이트의 날씨 이미지와 매칭되는 클래스명을 담음

    var city = "Seoul";
    var myKey = "307f00c8a42e069112d8d474783b2935"

    var  w_box = `
    <li>
        <div class="top">
            <div class="cur_icon">
                <i class="wi wi-day-cloudy-windy"></i>
            </div>
            <div class="info">
                <p class="temp"><span>온도</span>&nbsp; °C</p>
                <h4>오늘 날씨</h4>
                <p><span class="city">도시명</span></p>
                <p><span class="nation">국가명</span></p>
            </div>
        </div>
            <div class="bottom">
            <div class="wind">
                <i class="wi wi-strong-wind"></i>
                <p><span>0.00</span>&nbsp;m/s</p>
            </div>
            <div class="humidity">
                <i class="wi wi-humidity"></i>
                <p><span>00</span>&nbsp;%</p>
            </div>
            <div class="cloud">
                <i class="wi wi-cloudy"></i>
                <p><span>00</span>&nbsp;%</p>
            </div>
        </div>
    </li>
    `;

    $.ajax({
        url : "http://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+ myKey,
        dataType : "json",
        success : function(data){
            console.log(data);

            var temp = Math.round(data.main.temp - 273.15);

            console.log("현재온도(°C) : " + temp);

            var humidity = data.main.humidity;
            
            console.log("현재 습도(%) : " + humidity);

            var weather = data.weather[0].main;

            console.log("현재 날씨 :" + weather);

            var wind = data.wind.speed;

            console.log("현재 풍속 : " + wind);

            var cloud = data.clouds.all;

            console.log("현재 구름 양 (%) : " + cloud);
            
            var nation = data.sys.country;

            console.log("국가명 : " + nation)

            var region = data.name;

            console.log("도시명 : " + region)

            //텍스트 날씨(weather) 데이터를 이미지 아이콘으로 변경
            if(weather == "Clear"){
                state_icon = "wi-day-sunny";
            }else if(weather == "Clouds"){
                state_icon = "wi-cloud";
            }else if(weather == "Rain"){
                state_icon = "wi-rain";
            }

            $("#weather ul").append(w_box);
            $("#weather li").find(".cur_icon i").addClass(state_icon);
            $("#weather li").find(".temp span").text(temp);
            $("#weather li").find("h4").text(weather);
            $("#weather li").find(".city").text(region);
            $("#weather li").find(".nation").text(nation);
            $("#weather li").find(".wind span").text(wind);
            $("#weather li").find(".humidity span").text(humidity);
            $("#weather li").find(".cloud span").text(cloud);



        }
    });
});