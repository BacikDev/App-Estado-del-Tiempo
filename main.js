const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity = document.getElementById('city');
const nameCountry = document.getElementById('country');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    callAPI(nameCity.value, nameCountry.value);

    function callAPI(city, country){
        const apiId = '3beb87e6565ad47fa104cbeb95bf82bf';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;
        fetch(url)
            .then(data =>{
                return data.json();
            })
            .then(dataJSON =>{
                if(dataJSON.cod === '404'){
                    alert('Puede que hayas escrito mal tu ciudad');
                }else{
                    clearHTML();
                    showWeather(dataJSON);
                }
            })
    } 

    function showWeather(data){
        const {name, main:{temp, temp_min, temp_max}, weather:[arr]}= data;
        
        const degrees = kelvinToCentigrade(temp);
        const min = kelvinToCentigrade(temp_min);
        const max = kelvinToCentigrade(temp_max);

        const content = document.createElement('div');
        content.innerHTML = `
            <h5>Clima en ${name}</h5>
            <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="">
            <h2>${degrees}°C</h2>
            <p>Max:${max}°C</p>
            <p>Min:${min}°C</p>
        `;

        result.appendChild(content);
    }

    function kelvinToCentigrade(temp){
        return parseInt(temp - 273.15);
    }
})

function clearHTML(){
    result.innerHTML = '';
}