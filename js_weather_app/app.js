window.addEventListener('load', () => {
    let long
    let lat
    const temperatureDescription = document.querySelector('.temperature-description')
    const temperatureDegree = document.querySelector('.temperature-degree')
    const degreeSection = document.querySelector('.degree-section')
    const degreeSpan = document.querySelector('.degree-section span')
    const locationCity = document.querySelector('.location-city')
    const iconImg = document.getElementById('icon')

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude
            keyAPI = 'your openweathermap api key goes here'

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${keyAPI}`

            fetch(api)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                const cityName = data.name + ', ' + data.sys.country;
                const iconID = data.weather[0].id
                const temperature = Math.floor(data.main.temp)
                //formula to C
                let tempC = (temperature - 32) * (5 / 9)
                                
                //set DOM element from api
                temperatureDegree.textContent = temperature
                temperatureDescription.textContent = data.weather[0].description
                locationCity.textContent = cityName 
                

                const att = document.createAttribute('class')
                att.value = `wi wi-owm-${iconID}`
                iconImg.setAttributeNode(att)

                //change temp to C or F
                degreeSection.addEventListener('click', () =>{
                    if (degreeSpan.textContent === '°F') {
                        degreeSpan.textContent = '°C'
                        temperatureDegree.textContent = Math.floor(tempC)
                    } else {
                        degreeSpan.textContent = '°F'
                        temperatureDegree.textContent = temperature
                    }
                })
            })
        })
      
    } 
    
    
});



