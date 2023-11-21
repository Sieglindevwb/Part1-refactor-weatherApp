// import data from different files
import API from "./config.js";

// Getting my button element
const button = document.querySelector('#submit-search');
// Getting my input field element
const inputField = document.querySelector('#cityName');
//getting my container element
const cityNameContainer = document.querySelector('.city-info')
// Weekdays listed in the order used by the Date object in javascript
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// check if API is correctly imported
console.log(API);

const displayWeatherData = (data) => {
    // check if the data is not giving back an error
    if(data.error) {
        // stop the event from continuing the code if there is an error
        return alert("Hey are you sure you are not holding up your map upside down?");
    }

        cityNameContainer.textContent = data.location.name + ", " + data.location.country;

        for(const i= 0; i < 5; i++) {

            // get the container again for add the cards
            const div = document.querySelector('.container');

            // d = date
            const d = new Date();
            // console.log(weekdays[(d.getDay() + i) % 7])
            // dow = dateOfWeek
            const dow = weekdays[(d.getDay() + i) % 7];
        
            // Create the elements with Data
            const card = document.createElement('div');
            card.classList.add("card");
            
            // if it's the first element (index === 0), add a second class: "main-card" for unique styling
            if (i === 0) card.classList.add("main-card");
        
            div.appendChild(card);
        
            const initialContentBeforeSlideAnimation = document.createElement('div');
            initialContentBeforeSlideAnimation.classList.add("imgBx");
            card.appendChild(initialContentBeforeSlideAnimation);

            const cardImg = document.createElement('img');
            cardImg.src = data.forecast.forecastday[i].day.condition.icon;
            cardImg.alt = "Icon describing the following weather: " + data.forecast.forecastday[i].day.condition.text;
            initialContentBeforeSlideAnimation.appendChild(cardImg);
            
            const contentBox = document.createElement("div");
            contentBox.classList.add("contentBx");
            card.appendChild(contentBox);
        
            const dowContentBeforeSliderAnimation = document.createElement("h2");
            dowContentBeforeSliderAnimation.innerHTML = dow;
            contentBox.appendChild(dowContentBeforeSliderAnimation);
        
            console.log(data.forecast.forecastday[i].day.condition.text);
            const tempDescription = document.createElement("h4");
            tempDescription.innerHTML = data.forecast.forecastday[i].day.condition.text;
            contentBox.appendChild(tempDescription);
        
            const currentTempBox = document.createElement("div");
            currentTempBox.classList.add("color");
            contentBox.appendChild(currentTempBox)
        
            const currentTempHeader = document.createElement("h3");
            currentTempHeader.innerHTML = "Temp:"
            currentTempBox.appendChild(currentTempHeader);
        
            const currentT = document.createElement("span");
            currentT.classList.add("current-temp");

            currentT.innerHTML = data.forecast.forecastday[i].day.avgtemp_c + "°C";
            currentTempBox.appendChild(currentT);
        
            const minMax = document.createElement("div");
            minMax.classList.add("details");
            contentBox.appendChild(minMax);
        
            const minMaxTempHeader = document.createElement("h3");
            minMaxTempHeader.innerHTML = "More:"
            minMax.appendChild(minMaxTempHeader);
        
            const minT = document.createElement("span");
            minT.classList.add("min-temp")
            minT.innerHTML = data.forecast.forecastday[i].day.mintemp_c  + "°C";
            minMax.appendChild(minT);
        
            const maxT = document.createElement("span");
            maxT.classList.add("max-temp")
            maxT.innerHTML = data.forecast.forecastday[i].day.maxtemp_c + "°C";
            minMax.appendChild(maxT);
        }
}

const startWeatherApp = async() => {
    console.log('startWeatherApp');
    const theNameOfTheCity = document.querySelector("#cityName").value;

    try {
        const response = await fetch("http://api.weatherapi.com/v1/forecast.json?key=" + API.key + "&q=" + theNameOfTheCity + "&days=7&aqi=no&alerts=no");
        const data = await response.json();

        // Call the function to display weather data
        displayWeatherData(data);

        return data;
    } catch(err) {
        console.error(err);
        throw err;
    }
} 

// add eventlistener to input field
inputField.addEventListener('keyup', async function(event) {

    // see if event listener is triggered
    console.log("Enter submission");

    if (event.code === "Enter") {
        if (cityName) {
            try {
                const data = await startWeatherApp();
                console.log(data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
                alert("Error fetching weather data. Please try again.");
            }
        }
    } 
});

button.addEventListener('click', async function() {
    try {
        const data = await startWeatherApp();
        console.log(data);
    } catch (error) {
        // Handle errors here
        console.error("Error fetching weather data:", error);
        alert("Error fetching weather data. Please try again.");
    }
    fetch("http://api.weatherapi.com/v1/forecast.json?key=" + API.key + "&q=" + theNameOfTheCity + "&days=7&aqi=no&alerts=no")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.error) {
            return alert("Hey are you sure you are not holding up your map upside down?")
            console.log("check if code stops")
        } else {
            const container = document.querySelector(".container");
            while (container.lastChild) {
                container.removeChild(container.lastChild);
            };

            container.innerHTML = ""
            
            cityNameContainer.textContent = data.location.name + ", " + data.location.country;

            for(let i= 0; i < 5; i++) {
                const container = document.querySelector('.container');

                const date = new Date()
                // console.log(weekdays[(date.getDay() + i) % 7])
                const dayOfTheWeek = weekdays[(date.getDay() + i) % 7]
            
                // Create the elements with Data
                const card = document.createElement('div');
                card.classList.add("card");
            
                if (i === 0) card.classList.add("main-card");
            
                container.appendChild(card);
            
                const imageBox = document.createElement('div');
                imageBox.classList.add("imgBx");
                card.appendChild(imageBox);
            
                const cardImg = document.createElement('img');
                cardImg.src = data.forecast.forecastday[i].day.condition.icon;
                imageBox.appendChild(cardImg);
                
                const contentBox = document.createElement("div");
                contentBox.classList.add("contentBx");
                card.appendChild(contentBox);
            
                const cardHeader = document.createElement("h2");
                cardHeader.innerHTML = dayOfTheWeek;
                contentBox.appendChild(cardHeader);
            
                console.log(data.forecast.forecastday[i].day.condition.text);
                const tempDescription = document.createElement("h4");
                tempDescription.innerHTML = data.forecast.forecastday[i].day.condition.text;
                contentBox.appendChild(tempDescription);
            
                const currentTempBox = document.createElement("div");
                currentTempBox.classList.add("color");
                contentBox.appendChild(currentTempBox)
            
                const currentTempHeader = document.createElement("h3");
                currentTempHeader.innerHTML = "Temp:"
                currentTempBox.appendChild(currentTempHeader);
            
                const currentTemp = document.createElement("span");
                currentTemp.classList.add("current-temp");

                currentTemp.innerHTML = data.forecast.forecastday[i].day.avgtemp_c + "°C";
                currentTempBox.appendChild(currentTemp);
            
                const minMaxTemperatures = document.createElement("div");
                minMaxTemperatures.classList.add("details");
                contentBox.appendChild(minMaxTemperatures);
            
                const minMaxTempHeader = document.createElement("h3");
                minMaxTempHeader.innerHTML = "More:"
                minMaxTemperatures.appendChild(minMaxTempHeader);
            
                const minTemp = document.createElement("span");
                minTemp.classList.add("min-temp")
                minTemp.innerHTML = data.forecast.forecastday[i].day.mintemp_c  + "°C";
                minMaxTemperatures.appendChild(minTemp);
            
                const maxTemp = document.createElement("span");
                maxTemp.classList.add("max-temp")
                maxTemp.innerHTML = data.forecast.forecastday[i].day.maxtemp_c + "°C";
                minMaxTemperatures.appendChild(maxTemp);
            }
        }
    })
    .catch(err => {
        //not working
        // alert("Hey are you sure you are not holding up your map upside down?")
    })
})