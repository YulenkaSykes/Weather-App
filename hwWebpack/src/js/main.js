const input = document.querySelector("input");

const button = document.querySelector("button");


button.addEventListener("click", function(){

  const settings = {
    async: true,
    crossDomain: true,
    url: `https://community-open-weather-map.p.rapidapi.com/weather?q=${input.value}&units=metric&mode=xml%2C%20html`,
    method: "GET",
    headers: {
      "x-rapidapi-key": "2ecc6a18f1msh149a8c93469a116p1ff3e3jsn92ea038f0326",
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    new Card(response);
  });
})
  
  
  class Card {
    constructor(data){
      let div = document.createElement("div")
      div.classList.add("card");
      const sunset = new Date(data.sys.sunset)
      const sunrise = new Date(data.sys.sunrise)
      div.innerHTML = `
        <h3>${input.value}</h3>
        <img src = "http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" class = "icon">
        <p>${data.weather[0].main}</p>
        <p>${data.weather[0].description}</p>
        <p>${data.main.temp}</p>
        <p>Feels like: ${data.main.feels_like}</p>
        <p>Sunrise: ${sunrise.getHours()}:${sunrise.getMinutes()}</p>
        <p>Sunset: ${sunset.getHours()}:${sunset.getMinutes()}</p>
        <button>Delete</button>
      `
      div.querySelector("button").addEventListener("click", function (){
        document.body.removeChild(this.parentElement)
      })
      document.body.appendChild(div);
      console.log(data);
    }
  }

  