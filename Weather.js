// Elements of html
const searchEl = document.getElementById('search')
const searchIconEl = document.getElementById('search-icon')
const locationEl = document.querySelector('.location')
const mainDegEl = document.querySelector('.main-deg')
const aboutEl = document.querySelector('.about')
const dateEl = document.querySelector('.date')
const averageEl = document.querySelector('.average')
const weatherEl = document.querySelector('#weather')
const body = document.querySelector('body')

// API
const api = {
  key: 'ecefbb61d41c476e9425b82d1080d4a5',
  base: 'https://api.openweathermap.org/data/2.5/',
}

searchEl.addEventListener('keypress', setQuery)
searchIconEl.addEventListener('click', () => {
  getResult(searchEl.value)
})

function setQuery(e) {
  if (e.keyCode == 13) {
    getResult(searchEl.value)
  }
}

function getResult(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then((weather) => {
      return weather.json()
    })
    .then(displayResult)
}

function displayResult(weather) {
  let now = new Date()
  locationEl.innerText = `${weather.name}, ${weather.sys.country}`
  dateEl.innerText = dateBuilder(now)
  mainDegEl.innerHTML = `${Math.round(weather.main.temp)}<span>˚C</span>`
  aboutEl.innerText = weather.weather[0].main
  weatherEl.src = `${weather.weather[0].main}.png`
  body.style.background = `linear-gradient(rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0.5) 100%),
  url('https://source.unsplash.com/1920x1280/?${weather.weather[0].main}')`
  averageEl.innerText = `${Math.round(weather.main.temp_min)}˚C / ${Math.round(
    weather.main.temp_max,
  )} ˚C`
  body.style.backgroundRepeat = 'no-repeat'
  body.style.backgroundSize = 'cover'
  body.style.backgroundPosition = 'center'
}

function dateBuilder(d) {
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'Oktoberr',
    'November',
    'December',
  ]
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  let day = days[d.getDay()]
  let date = d.getDate()
  let month = months[d.getMonth()]
  let year = d.getFullYear()

  return `${day} ${date} ${month} ${year}`
}
