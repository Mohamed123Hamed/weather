
let apiKey = 'ac6ee6f58bd74148a6b234831242201'
async function getWeather(a) {
  let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${a}&days=3`);
  if (response.ok && 400 != response.status) {
    let res = await response.json();
    displayCurrent(res.location, res.current),
    displayAnother(res.forecast.forecastday);
  }
}
document.getElementById("search").addEventListener("keyup", (x) => {
  getWeather(x.target.value);
});
// date time
let day = new Date(Date.now())   // instance
let days = day.toLocaleDateString("en-us",{weekday:"long"})   // days
let monthD = day.toLocaleDateString("en-us",{monthNames:"long"})  //months

function displayCurrent(a, t) {
  if (null != t) {
    var e = new Date(t.last_updated.replace(" ", "T"));
    let n = `<div class="today forecast">\n    <div class="forecast-header"  id="today">\n    <div class="day">
    ${ days  }
    </div>\n    <div class=" date">
    ${monthD}
    </div>\n </div> \x3c!-- .forecast-header --\x3e\n   
    <div class="forecast-content" id="current">\n    <div class="location">
    ${a.name}
    </div>\n    <div class="degree">\n  
    <div class="num">${t.temp_c}
    <sup>o</sup>C</div>\n      \n        <div class="forecast-icon">\n            <img src="https:${
      t.condition.icon
    }" alt="" width=90>\n        </div>\t\n    \n    </div>\n    <div class="custom">${
      t.condition.text
    }</div>\n    <span><img src="images/icon-umberella.png" alt="">20%</span>\n\t\t\t\t\t\t\t\t<span><img src="images/icon-wind.png" alt="">18km/h</span>\n\t\t\t\t\t\t\t\t<span><img src="images/icon-compass.png" alt="">East</span>\n    </div>\n</div>`;
    document.getElementById("forecast").innerHTML = n;
  }
}
function displayAnother(a) {
  let container = "";
  for (let e = 1; e < a.length; e++)
   {
    let date = new Date(a[e].date)
    let weekDay = date.toLocaleDateString("en-us",{weekday:"long"})
   
   container += `\t<div class="forecast">\n        <div class="forecast-header">\n            <div class="day">
    ${weekDay}
    }</div>\n        </div> \x3c!-- .forecast-header --\x3e\n        <div class="forecast-content">\n            <div class="forecast-icon">\n                <img src="https:${
      a[e].day.condition.icon
    }" alt="" width=48>\n            </div>\n            <div class="degree">${
      a[e].day.maxtemp_c
    }<sup>o</sup>C</div>\n            <small>${
      a[e].day.mintemp_c
    }<sup>o</sup></small>\n            <div class="custom">${
      a[e].day.condition.text
    }</div>\n        </div>\n        </div>`;
   }
  document.getElementById("forecast").innerHTML += container;
}
getWeather("minia");
