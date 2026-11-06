const weatherdata = document.querySelector(".weatherData");
const city = document.querySelector("#city");
const datadetails = document.querySelector(".WeatherResult");

const api_key= "6a87102f7018ec97f560d310bff03525";



weatherdata.addEventListener("submit", async event => {
    event.preventDefault();

    const cityName = city.value;
    console.log(cityName);
    // await getWeather(cityName);

    if(cityName) {
        try{
            const weatherDetails = await getWeather(cityName);
            displayWeather(weatherDetails);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city name");
    }

})

async function getWeather(cityName) {
const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`;
 
const response = await fetch(api_url);
console.log(response);

if(!response.ok) {
    throw new Error("City not found");  
}
return await response.json();
}
 
function displayWeather(datainfo) {
    console.log(datainfo);

     const {name: city,
        main:{temp},
        weather:[{description, id}]
     } = datainfo;

    datadetails.textContent = "";
    datadetails.style.display = "block";

    const displayCity = document.createElement("h2");
    const displayTemp = document.createElement("span");
    const displayCondition = document.createElement("p");
    const displayImage = document.createElement("p");

    displayCity.textContent = `Weather in ${city}`;
    displayTemp.textContent = `${Math.round(temp - 273.15)}°C`;
    displayCondition.textContent = description;
    displayImage.textContent = getWeatherImage(id);

    displayCity.classList.add("cityName");
    displayTemp.classList.add("temperature");
     displayCondition.classList.add("condition");
      displayImage.classList.add("weather-image");

      datadetails.appendChild(displayCity);
      datadetails.appendChild(displayTemp);
      datadetails.appendChild(displayCondition);
      datadetails.appendChild(displayImage);
}

function getWeatherImage(weatherId) {
    // Return the appropriate image URL based on the weather ID
   

    switch (true) {
        case weatherId >= 200 && weatherId < 300:
            // return "img/thunderstorm.png";
            return "⛈️";

        case weatherId >= 300 && weatherId < 500:
            // return "img/drizzle.png";
            return "🌦️";

        case weatherId >= 500 && weatherId < 600:
            // return "img/rain.png";
            return "🌧️";

        case weatherId >= 600 && weatherId < 700:
            // return "img/snow.png";
            return "❄️";

        case weatherId >= 700 && weatherId < 800:
            // return "img/atmosphere.png";
            return "🌫️";

        case weatherId === 800:
            // return "img/clear.png";
            return "☀️";

        case weatherId > 800:
            // return "img/clouds.png";
            return "☁️";

    }
}

function displayError(message) {
 const noCityNamevar = document.createElement("p");
 noCityNamevar.textContent = message;
 noCityNamevar.classList.add("noCityName");
 

 datadetails.textContent = "";
 datadetails.style.display = "block";
 datadetails.appendChild(noCityNamevar);
}

