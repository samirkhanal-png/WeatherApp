const weatherform=document.querySelector(".weatherForm");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apiKey="8c55357785ef72060c16ed362cb3287f";

weatherform.addEventListener("submit",async event=>{
  event.preventDefault();
  const city=cityInput.value;
  if(city){
    try{
      const weatherData=await getWeatherData(city);
      displayWeatherInfo(weatherData);
    }catch(error){
      displayError(error);
    }
  }else{
    displayError("Please enter a city");
  }
}
)

  async function getWeatherData(city){
    const apiURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response=await fetch(apiURL);
    if(!response.ok){
      throw new Error("Could not fetch weather data");
    }
    const data=await response.json();
    console.log(data);
    return data;
  }

  function displayWeatherInfo(data){
    const {name:city,
           main:{temp,humidity},
           weather:[{description,id}]}=data;  //Object Destruturing

           console.log(city,temp,humidity,description,id);

           card.textContent="";
           card.style.display="flex";
           card.style.flexDirection="column";
           card.style.alignItems="center";
           card.style.justifyContent="center";

           const cityDisplay=document.createElement("h1");
           const tempDisplay=document.createElement("p"); 
           const humidityDisplay=document.createElement("p");
           const descDisplay=document.createElement("p");
           const weatherEmoji=document.createElement("p");

           cityDisplay.textContent=city;
           cityDisplay.classList.add("cityDisplay");
           

           tempDisplay.textContent=`Temperature: ${(temp-273.15).toFixed(2)}°C`;
           tempDisplay.classList.add("tempDisplay");

           humidityDisplay.textContent=`Humidity: ${humidity}%`;
           humidityDisplay.classList.add("humidityDisplay");


           descDisplay.textContent=`Conditions: ${description}`;
           descDisplay.classList.add("descDisplay");

           weatherEmoji.textContent=getWeatherEmoji(id);
           weatherEmoji.classList.add("weatherEmoji");

           card.append(cityDisplay,tempDisplay,humidityDisplay,descDisplay,weatherEmoji);

  }

  function getWeatherEmoji(weatherId){
     switch(true){
      case (weatherId>=200 && weatherId<=300):
        return "⛈️";

      case(weatherId>=300 && weatherId<=400):
      return "🌧️";

      case(weatherId>=500 && weatherId<=600):
      return "🌧️";

      case(weatherId>=600 && weatherId<=700):
      return "❄️";

      case(weatherId>=700 && weatherId<=800):
      return "☀️";

      case(weatherId>=800):
      return "🌇";

       dafault:
       return "❓";
     }
  }

  function displayError(message){
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent="";
    card.style.display="flex";
    card.append(errorDisplay);

  }