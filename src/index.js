import css from './style.css';

const city = document.querySelector('.city');
const cityBtn = document.querySelector('.search');
const slider = document.querySelector('input[type=checkbox]');
let currentData;
let temp = 'c';

slider.addEventListener('click', () => {
  temp === 'c' ? (temp = 'f') : (temp = 'c');

  if (document.querySelector('.day1-temp').firstChild) {
    setTemp(currentData);
  }
});

cityBtn.addEventListener('click', () => {
  fetch(
    'https://api.weatherapi.com/v1/forecast.json?key=b8370777e4ad43379ad145837240603&q=' +
      `${city.value}` +
      '&days=3&aqi=no&alerts=no',
    { mode: 'cors' },
  )
    .then((resp) => {
      if (resp.status === 400) {
        throw new Error('City does not exist!');
      }
      return resp.json();
    })
    .then(displayData)
    .catch((error) => alert('City does not exist!'));
});

function displayData(data) {
  for (let i = 1; i <= 3; i++) {
    // Select Elements
    const dayIcon = document.querySelector('.day' + `${i}-` + 'weatherIcon');
    const dayDate = document.querySelector('.day' + `${i}-` + 'date');
    const dayDesc = document.querySelector('.day' + `${i}-` + 'desc');

    // Set Icon
    dayIcon.src = `https:${data.forecast.forecastday[i - 1].day.condition.icon}`;

    // Text Content
    dayDate.textContent = data.forecast.forecastday[i - 1].date;
    dayDesc.textContent = data.forecast.forecastday[i - 1].day.condition.text;
  }
  currentData = data;
  setTemp(data);
}

function setTemp(data) {
  for (let i = 1; i <= 3; i++) {
    const dayTemp = document.querySelector('.day' + `${i}-` + 'temp');
    const minTemp = document.createElement('div');
    const avgTemp = document.createElement('div');
    const maxTemp = document.createElement('div');

    if (temp === 'c') {
      minTemp.textContent = `Min Temp ${data.forecast.forecastday[i - 1].day.mintemp_c}C`;
      avgTemp.textContent = `Avg Temp ${data.forecast.forecastday[i - 1].day.avgtemp_c}C`;
      maxTemp.textContent = `Max Temp ${data.forecast.forecastday[i - 1].day.maxtemp_c}C`;
    } else {
      minTemp.textContent = `Min Temp ${data.forecast.forecastday[i - 1].day.mintemp_f}F`;
      avgTemp.textContent = `Avg Temp ${data.forecast.forecastday[i - 1].day.avgtemp_f}F`;
      maxTemp.textContent = `Max Temp ${data.forecast.forecastday[i - 1].day.maxtemp_f}F`;
    }
    deleteChildNodes(dayTemp);

    dayTemp.appendChild(minTemp);
    dayTemp.appendChild(avgTemp);
    dayTemp.appendChild(maxTemp);
  }
}

function deleteChildNodes(node) {
  while (node.firstChild) {
    node.firstChild.remove();
  }
}
