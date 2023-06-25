const InputSearch = document.getElementById('search')
const errorMessage = document.getElementById('error')
const displayCurrentW = document.getElementById('currentW')
const displayCountry = document.getElementById('country')
const displayLocation = document.getElementById('location')
const displayLocalTime = document.getElementById('localTime')
const displayLastUpdate = document.getElementById('lastUpdate')
const displayCurrentTempC = document.getElementById('currentTempC')
const displayNextDayW = document.getElementById('nextDayW')
const displayNext2DayW = document.getElementById('next2DayW')

let Inputlocation = 'Taipei' //default locate
let country
let localTime
let currentW
let Location
let CurrentTempC
let lastUpdate
let nextDayW
let next2DayW

const displayCurrentFunction = json => {
  displayCurrentW.innerHTML = json.current.condition.text
  displayCountry.innerHTML = json.location.country
  displayLocalTime.innerHTML = `localtime: ${json.location.localtime}`
  console.log(typeof json.location.localtime)
  displayLocation.innerHTML = json.location.name
  displayLastUpdate.innerHTML = `last update: ${json.current.last_updated}`
  displayCurrentTempC.innerHTML = `${json.current.temp_c}°C`
}

const displayForecastFunction = json => {
  displayNextDayW.innerHTML = `nextday : ${json.forecast.forecastday[1].day.condition.text}`
  displayNext2DayW.innerHTML = `next2day :${json.forecast.forecastday[2].day.condition.text}`
}

const getCurrentWeather = async (passinlocate = Inputlocation) => {
  const getUrl = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=f97b68589cc84d73bf654833232306&q=${passinlocate}&aqi=no`,
    { mode: 'cors' }
  )
  const json = await getUrl.json()
  if (!getUrl.ok) {
    errorMessage.innerHTML = json.error.message
    return
  } else {
    errorMessage.innerHTML = ''
    console.log(json)
  }

  country = json.location.country
  displayCurrentFunction(json)
}

const getForecastWeather = async (passinlocate = Inputlocation) => {
  const getUrl = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=f97b68589cc84d73bf654833232306&q=${passinlocate}&aqi=no&days=3`,
    { mode: 'cors' }
  )
  const json = await getUrl.json()
  console.log(json)
  displayForecastFunction(json)
}

getCurrentWeather()
getForecastWeather()
// change locate
InputSearch.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    Inputlocation = InputSearch.value
    InputSearch.value = ''
    getCurrentWeather()
    getForecastWeather()
  }
})
