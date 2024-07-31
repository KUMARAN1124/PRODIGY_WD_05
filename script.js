const container = document.querySelector('.container');
const searchBtn = document.querySelector('.search button');
const weatherBox = document.querySelector('.weather');
const reportBox = document.querySelector('.report');

searchBtn.addEventListener('click', () => {
    const APIKey = '1822eedca103e9202cccb7f7d6b00fb7';
    const city = document.querySelector('.search input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            const image = document.querySelector('.weather img');
            const temp = document.querySelector('.weather .temperature');
            const desc = document.querySelector('.weather .description');
            const humidity = document.querySelector('.report .humidity span');
            const wind = document.querySelector('.wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear.png';
                    break;
                case 'Rain':
                    image.src = 'rainy.png';
                    break;
                case 'Snow':
                    image.src = 'snow.png';
                    break;
                case 'Clouds':
                    image.src = 'clouds.png';
                    break;
                case 'Mist':
                    image.src = 'Mist.png';
                    break;
                default:
                    image.src = 'clouds.png';
            }

            temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            desc.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            reportBox.style.display = '';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('An error occurred while fetching the weather data. Please try again.');
        });
});