document.getElementById("search").addEventListener("click", function () {
  const city = document.getElementById("city").value;
  const apiKey = "a9959d30e3901f006e1609749b5f9aaf";

  if (!city) return alert("Please enter a city name");

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  // Fetch current weather
  fetch(currentWeatherUrl)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === 200) {
        document.getElementById("temp").innerHTML = `${Math.round(data.main.temp)}°`;
        document.getElementById("condition").innerHTML = data.weather[0].main;
        document.getElementById("desc").innerHTML = data.weather[0].description;
        document.getElementById("feels").innerHTML = `${Math.round(data.main.feels_like)}°`;
        document.getElementById("humidity").innerHTML = `${data.main.humidity}%`;
        document.getElementById("visibility").innerHTML = `${(data.visibility / 1000).toFixed(1)} km`;
        document.getElementById("precip").innerHTML = data.rain ? `${data.rain["1h"] || 0} mm` : "0 mm";
        document.getElementById("wind").innerHTML = `${data.wind.speed} m/s`;
        document.getElementById("uv").innerHTML = Math.floor(Math.random() * 6) + 1; // Mock UV value
      } else {
        alert("City not found!");
      }
    });

  // Fetch hourly forecast
  fetch(forecastUrl)
    .then((res) => res.json())
    .then((data) => {
      const hourlyDiv = document.getElementById("hourly");
      hourlyDiv.innerHTML = "";
      const hours = data.list.slice(0, 5); // next 5 intervals (~3 hours each)
      hours.forEach((h) => {
        const time = new Date(h.dt * 1000).getHours();
        const temp = Math.round(h.main.temp);
        const icon = h.weather[0].icon;
        hourlyDiv.innerHTML += `
          <div class="hour">
            <p>${time}:00</p>
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="">
            <p>${temp}°</p>
          </div>`;
      });
    });
});

  
 










  a9959d30e3901f006e1609749b5f9aaf