const apiKey = 'dc96f459f0c12c28b4f0759abbe8fcdf';
const locButton = document.querySelector('.loc-button');
const todayInfo = document.querySelector('.today-info');
const todayWeatherIcon = document.querySelector('.today-weather i');
const todayTemp = document.querySelector('.weather-temp');
const daysList = document.querySelector('.days-list');

// Mapping of weather condition codes to icon class names (Depending on Openweather Api Response)
const weatherIconMap = {
    '01d': 'sun',
    '01n': 'moon',
    '02d': 'sun',
    '02n': 'moon',
    '03d': 'cloud',
    '03n': 'cloud',
    '04d': 'cloud',
    '04n': 'cloud',
    '09d': 'cloud-rain',
    '09n': 'cloud-rain',
    '10d': 'cloud-rain',
    '10n': 'cloud-rain',
    '11d': 'cloud-lightning',
    '11n': 'cloud-lightning',
    '13d': 'cloud-snow',
    '13n': 'cloud-snow',
    '50d': 'water',
    '50n': 'water'
};


function getRecommendationByTemperature(temperature) {
  const temperatureRanges = [
      { min: -100, max: 24, recommendation: "Wear a winter jacket and gloves because it's freezing" },
      { min: 25, max: 44, recommendation: "I would recommend wearing a coat" },
      { min: 45, max: 64, recommendation: "A fleece sweater or a light hoodie should be fine" },
      { min: 65, max: 79, recommendation: "The weather is really nice, so wear some short sleeves" },
      { min: 80, max: 140, recommendation: "It's really hot outside, so wear some shorts" },
  ];

  for (const range of temperatureRanges) {
      if (temperature >= range.min && temperature <= range.max) {
          return range.recommendation;
      }
  }

  return "Temperature range not covered by recommendations";
}

function getClothingEmbed(temperature){

    // Update clothing recommendation in the "clothing-info" div


// Update product image and link based on the temperature range
    const productImageElement = document.getElementById('product-image');
    const amazonLinkElement = document.getElementById('amazon-link');

    const temperatureRanges = [
        { min: -100, max: 24, linker:"Wear a winter jacket and gloves because it's freezing", image: 'cloud1.png'},
        { min: 25, max: 44, linker: "http://tiny.cc/dc9yvz", image: 'hoodie1.png'},
        { min: 45, max: 64, linker: "A fleece sweater or a light hoodie should be fine" },
        { min: 65, max: 79, linker: "The weather is really nice, so wear some short sleeves" },
        { min: 80, max: 140, linker: "It's really hot outside, so wear some shorts" },
    ];

    for (const range of temperatureRanges) {
        if (temperature >= range.min && temperature <= range.max) {
            productImageElement.src = range.image;
            amazonLinkElement.href = range.linker;
    }
}
  
    return "Temperature range not covered by recommendations";
}

function fetchWeatherData(location) {
    // Construct the API url with the location and api key
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=imperial`;

    // Fetch weather data from api
    fetch(apiUrl).then(response => response.json()).then(data => {
        // Update todays info
        const todayWeather = data.list[0].weather[0].description;
        const todayTemperature = `${Math.round(data.list[0].main.temp)}°F`;
        const todayWeatherIconCode = data.list[0].weather[0].icon;

        todayInfo.querySelector('h2').textContent = new Date().toLocaleDateString('en', { weekday: 'long' });
        todayInfo.querySelector('span').textContent = new Date().toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' });
        todayWeatherIcon.className = `bx bx-${weatherIconMap[todayWeatherIconCode]}`;
        todayTemp.textContent = todayTemperature;   

        // Update location and weather description in the "left-info" section
        const locationElement = document.querySelector('.today-info > div > span');
        locationElement.textContent = `${data.city.name}, ${data.city.country}`;

        const weatherDescriptionElement = document.querySelector('.today-weather > h3');
        weatherDescriptionElement.textContent = todayWeather;

        // Update todays info in the "day-info" section
        const todayPrecipitation = `${data.list[0].pop}%`;
        const todayHumidity = `${data.list[0].main.humidity}%`;
        const todayWindSpeed = `${data.list[0].wind.speed} mi/h`;

        const dayInfoContainer = document.querySelector('.day-info');

        const temperature = Math.round(data.list[0].main.temp);
        const clothingRecommendation = getRecommendationByTemperature(temperature);

         // Update clothing recommendation in the "clothing-info" div
         const clothingInfoElement = document.getElementById('clothing-recommendation');
         clothingInfoElement.textContent = clothingRecommendation;
     
         getClothingEmbed(temperature);
       
    }).catch(error => {
        alert(`Error fetching weather data: ${error} (Api Error)`);
    });
}

// Fetch weather data on document load for default location (UIUC)
document.addEventListener('DOMContentLoaded', () => {
    const defaultLocation = 'Champaign';
    fetchWeatherData(defaultLocation);
});

locButton.addEventListener('click', () => {
    const location = prompt('Enter the city where you are staying at :');
    if (!location) return;

    fetchWeatherData(location);
});