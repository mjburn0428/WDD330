//Weather API

// select HTML elements in the document
const tempIn = document.querySelector("#temp");
const condition  = document.querySelector("#condition");
const weatherIcon = document.querySelector("#weatherIcon");
const windSpeedIn = document.querySelector("#windSpeed");

const url = "https://api.openweathermap.org/data/2.5/weather?q=Riverton&appid=542273b6e26fb3c2a458704178f80cba&units=imperial";

async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
          const data = await response.json();
          console.log(data); // this is for testing the call
          displayResults(data);
          calWindChill(tempIn, windSpeedIn);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  
apiFetch();

function  displayResults(weatherData) {
    tempIn.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;
    windSpeedIn.innerHTML = `${weatherData.wind.speed}`;
    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    condition.innerHTML = weatherData.weather[0].description;

    // CAPLITALIZE each word in the description
    const lower = condition.innerHTML.toLowerCase();
    const str = lower.split(' ');
    for (let i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    let word = str.join(' ');
    //

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', word);
    captionDesc.textContent = word;
  
}



/** To Calculate Windchill **/
/*Get the temp from the page and make it into a number*/
var temperature = parseFloat(document.querySelector('#temp').textContent)
console.log(temperature)

/*Get the windSpeed from the page and make it into a number*/
var windSpeed = parseFloat(document.querySelector('#windSpeed').textContent)
console.log(windSpeed)

/*define a function to calculat the windSpeed*/
function calWindChill(tempIn, windSpeedIn){

    var windChill = 35.74 + 0.6215*tempIn - (35.75*windSpeedIn**0.16) + 0.4275 * tempIn * windSpeedIn**0.16
    return windChill
}

/*call the function if conditions are met, else give 'NA'*/
var windChillValue = ''
if (tempIn <= 60 && windSpeedIn >= 3) {windChillValue = (calWindChill(tempIn, windSpeedIn)).toFixed(2)}
else {windChillValue = "N/A"}
console.log(windChillValue)


/*place the wind chill value or N/A onto the page.*/
document.querySelector('#windChill').textContent = windChillValue