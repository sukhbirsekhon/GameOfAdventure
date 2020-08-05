if (`geolocation` in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      console.log(position.coords);
  
      function weather() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=` + lat + `&lon=` + long + `&APPID=edcf745ab482c4e9a2b6a1747323e886`).then(response => {
          return response.json();
        }).then(weather => {
          console.log(`City Name: ` + weather.name + `, ` + weather.sys.country);
          console.log(`Weather Description: ` + weather.weather[0].description);
          console.log(`Temperature: ` + weather.main.temp);
          console.log(`Feels like: ` + weather.main.feels_like);
          console.log(`Minimum Temperature: ` + weather.main.temp_min);
          console.log(`Maximum Temperature: ` + weather.main.temp_max);
          console.log(`Pressure: ` + weather.main.pressure);
        })
      }
      weather();
    })
  }
  else {
    console.log('Geolocation not available');
  }
  
  function tempConverter(temp) {
    const fahrenheitTemp = ((temp - 273.15) * (9 / 5)) + 32;
    return fahrenheitTemp;
  }