const request = require("request");
const argv = require("yargs").argv;

let apiKey = "d95e94e678bb4b70e8894b34cacc6b64";
let city = argv.c || "Seattle";
let url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";

request(url, function (err, response, body) {
    if (err) {
        console.log("error:", error);
    } else {
        console.log("body:", body);
        let weather = JSON.parse(body);
        let message = "It's " + weather.main.temp + " degrees in " + weather.name;
        console.log(message);
    }
}); 