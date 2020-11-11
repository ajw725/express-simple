const getForecast = (address) => {
  const safeAddress = encodeURIComponent(address);
  const locationPara = document.getElementById('location');
  const forecastPara = document.getElementById('forecast');
  locationPara.innerText = 'Searching...';
  forecastPara.innerText = '';

  fetch(`/weather?address=${safeAddress}`)
    .then((resp) => {
      resp
        .json()
        .then((data) => {
          if (data.error) {
            console.error('Error fetching weather:', data.error);
            locationPara.innerText = 'Unable to retrieve weather';
            forecastPara.innerText = '';
          } else {
            const { address, location, forecast } = data;
            locationPara.innerText = location;
            forecastPara.innerText = forecast;
          }
        })
        .catch((err) => {
          console.error('Error fetching weather:', err);
          locationPara.innerText = 'Unable to retrieve weather';
          forecastPara.innerText = '';
        });
    })
    .catch((err) => {
      console.error('Error fetching weather:', err);
      locationPara.innerText = 'Unable to retrieve weather';
      forecastPara.innerText = '';
    });
};

const weatherForm = document.querySelector('form');
const searchInput = document.getElementById('search-input');
weatherForm.addEventListener('submit', (e, something) => {
  e.preventDefault();
  getForecast(searchInput.value);
});
