const form = document.forms[0];
const ApiKey = "c97321f9a97cbabb63f3d781005a6599";
const weatherApp = document.getElementById("weatherApp");
const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "c76e1ba44bmsh27c38f7cabc2e90p15045djsnc1d14d54dbeb",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
};
async function getData(URL, options) {
    return await fetch(URL, options).then((res) => res.json());
}
function drowInfo(obj) {
    const allInfo = document.createElement("div");
    const image = document.createElement("img");
    const weather = document.createElement("h1");
    const currentCity = document.createElement("h3");
    const lowerInfo = document.createElement("div");
    const lowerLeftSide = document.createElement("div");
    const lowerRightSide = document.createElement("div");
    const wet = document.createElement("h1");
    const humidity = document.createElement("p");
    const humidityInfo = document.createElement("p");
    const wind = document.createElement("h1");
    const windInfo = document.createElement("p");
    const windSpeed = document.createElement("p");
    const info = document.createElement("h2");
    info.textContent = obj.current.condition.text;
    wind.className = "fa-solid fa-wind";
    wet.className = "fa-solid fa-droplet";
    humidity.textContent = "Humidity";
    humidityInfo.textContent = obj.current.humidity + " %";
    windInfo.textContent = "Wind Speed";
    windSpeed.textContent = obj.current.wind_kph + " km/h";
    lowerLeftSide.classList.add("lowerLeftSide");
    lowerRightSide.classList.add("lowerRightSide");
    lowerLeftSide.append(wet, humidity, humidityInfo);
    lowerRightSide.append(wind, windInfo, windSpeed);
    lowerInfo.append(lowerLeftSide, lowerRightSide);
    image.src = obj.current.condition.icon;
    currentCity.textContent = obj.location.name + " / " + obj.location.country;
    weather.textContent = obj.current.temp_c + " ᵒC";
    allInfo.classList.add("allInfo");
    lowerInfo.classList.add("lowerInfo");
    allInfo.append(image, info, weather, currentCity, lowerInfo);
    weatherApp.append(allInfo);
    weatherApp.childNodes.forEach((e) => {
        if (e.localName === "div") {
            e.remove();
        }
    });
    weatherApp.append(allInfo);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    getData(
        `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${form[0].value}&lang=en`,
        options
    ).then((res) => drowInfo(res));
    form.reset();
});

