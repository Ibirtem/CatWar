// ==UserScript==
// @name         Catwar UwU
// @namespace    http://tampermonkey.net/
// @version      v1.6.0-03.24
// @description  Визуальное обновление CatWar'а.
// @author       2024 Ibirtem / Затменная ( https://catwar.su/cat1477928 )
// @match        http*://*.catwar.su/*
// @updateURL    https://github.com/Ibirtem/CatWar/raw/main/Catwar%20UwU.js
// @downloadURL  https://github.com/Ibirtem/CatWar/raw/main/Catwar%20UwU.js
// @grant        GM_addStyle
// @license      MIT
// @icon         https://i.imgur.com/mIxnjHa.png
// ==/UserScript==

"use strict"; // Делаю вид что крутой.

// ====================================================================================================================
// Типо начальные параметры.
const targetSettings = /^https:\/\/catwar\.su\/settings/;
const targetCW3 = "https://catwar.su/cw3/";

// А представьте главам и шишкам дать возможность регулировать погоду у всех остальных для проведения всяких интерактивных ивентов...
// ====================================================================================================================

// ====================================================================================================================
// div'ы Настроек
const uwusettings = `
<div id="uwusettings">
  <h1>Настройки CatWar UwU</h1>
  <hr>
    <h2>Природные явления</h2>
    <div class="weather-toggle">
      <p>Отображение динамичной погоды в Игровой, такие как дождь или снегопад.</p>
      <input type="checkbox" id="weather-enabled">
      <label for="weather-enabled">Показывать погоду</label>

      <p>Отображение кнопки Расширенных настроек погоды в Игровой. Временно выключает натуральную генерацию погоды.</p>
      <input type="checkbox" id="extended-settings">
      <label for="extended-settings">Расширенные настройки</label>
    </div>
  <hr>
  <div id="news">
  <button id="news-button">Добро пожаловать в крупную, и одновременно бесполезную обнову до v1.6.0!</button>
  <ul id="news-list" style="display: none;">
    <p>Дата выпуска: 25.03.24</p>
    <li>Панель ручного управления погоды.</li>
    <li>Модификаторы и вычисления температуры, сезона и время Игровой. Например, они уже влияют на размер частиц, и позволят в будущем добавлять больше вариаций эффектов.</li>
    <li>Красивый, но неинтересный блок новостей обновы. Да, вы его читаете.</li>
    <li>Правка расположения Северного сияния. Теперь крепится к краю экрана, а не к краю страницы.</li>
    <li>Больше бесполезных стилей на будущее. По большей части стиль "Стеклянности". Расширенные настройки полностью на этом стиле.</li>
    <li>Настойки более "мягко" и "точно" определяют, появляться или нет.</li>
    <li>Зачем вы это ещё читаете...</li>
  </ul>
</div>
  </div>
`;

// div'ы Игровой
const extendedSettingsButton = `
<div>
  <button type="button" id="extended-settings-button">
    <img src="https://i.imgur.com/082BGVV.png" alt="Иконка" width="36" height="36">
  </button>

  <div id="extended-settings-container">
    <div id="extended-settings-panel">
      <p>Изменения, сделанные в этой панели, носят временный характер и не сохраняются.</p>
      <h3>Переключить погоду</h3>
      <input type="range" min="1" max="3" value="1" class="slider" id="manualWeather" list="WeatherStep">
        <datalist id="WeatherStep">
          <img src="https://i.imgur.com/0UnI7ib.png" width="36" height="36" option value="1"></option>
          <img src="https://i.imgur.com/AyN7mzf.png" width="36" height="36" option value="2"></option>
          <img src="https://i.imgur.com/vN0cXAr.png" width="36" height="36" option value="3"></option>
        </datalist>
        <div id="temperature-container">
          <p id="temperature" title="На это умножается скорость частиц и делится их размер. Да, пока присутствует лишь значения 1 или 2. В будущем будет возможность сохранять и изменять это значение под свой вкус">[?] Текущий модификатор: ...уточнение...</p>
        </div>
        <h5>После снега погода не меняется сразу. Дождитесь, когда снежинки полностью упадут/обновите страницу. Разрабу лень чинить.</h5>

        <h3>Выбрать Северное Сияние</h3>
      <div class="button-container">
        <button type="button" id="manualAurora_Off">
          <img src="https://i.imgur.com/1eaHZjE.png" alt="Иконка" width="48" height="48">
        </button>
        <button type="button" id="manualAurora_B">
          <img src="https://i.imgur.com/5a6SH2i.png" alt="Иконка" width="48" height="48">
        </button>
        <button type="button" id="manualAurora_G">
          <img src="https://i.imgur.com/hx0d8mP.png" alt="Иконка" width="48" height="48">
        </button>
      </div>
    </div>
    <div id="aurora-settings-panel">
      <p>Изменения, сделанные в этой панели, сохранятся!</p>
      <h5>Здесь будет возможность переместить Северное Сияние, исключать локации из генерации погоды, либо запрещать определённой погоде существовать на выбранной локации. Но это всё пока что лишь мечта...</h5>
      <h5>А ещё держите маленький факт: Северные сияния будет видно только ясной ночью, и только осенью и зимой.</h5>
    </div>
  </div>
</div>
`;

// ====================================================================================================================

// ====================================================================================================================
// Стили. Наверно. Не проверяйте пожалуйста, я тут потерялся.
// TODO - Унифицировать шрифты, цвета текстов, прозрачность, закруглённость штучек ну кароче всё надо.
// TODO - Северное сияние доработать, чтобы лепить снизу сверху или в середине.
let css = `
:root {
  --nlB-1: #9DF5ED;
  --nlB-2: #82BBF5;
  --nlB-3: #725DFA;

  --nlG-1: #aaff9d;
  --nlG-2: #00faa0;
  --nlG-3: #00ff62;
}

#uwusettings {
  font-family: Century Gothic;
  margin: 0 auto;
  backdrop-filter: blur(8px) brightness(70%);
  border-radius: 20px;
  padding: 15px;
  border: 1px solid rgba(255,255,255,0.1);
}

#uwusettings h1,
#uwusettings h2 {
  font-family: Century Gothic;
  margin-top: 15px;
  margin-bottom: 15px;
  text-align: center;
  color: white;
}

#uwusettings p {
  margin-bottom: 5px;
  color: white;
  font-size: 15px;
}

#uwusettings label {
  color: white;
  font-size: 16px;
}

#uwusettings ul {
  font-family: Century Gothic;
  color: white;
  list-style-type: "+ ";
}

li::marker {
  color: green;
}

.rounded-image {
  background-repeat: repeat;
  background-attachment: fixed;
  border-radius: 20px;
}

#global-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  pointer-events: none;
}

.weatherCanvas {
  pointer-events: none;
}

#extended-settings-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
  cursor: pointer;

  background-color: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.1);
}


#extended-settings-container {
  font-family: Century Gothic;
  color: white;
  font-size: 15px;
  text-align: center;
  
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 400px;
  height: 400px;
  backdrop-filter: blur(8px);
  border-radius: 10px;
  display: none;
  pointer-events: auto;

  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  display: grid;
  place-items: center;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
}

#extended-settings-panel,
#news,
#news-button {
  width: 100%;
  border-radius: 10px;
  
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
}

#news-button {
  cursor: pointer;
}

#aurora-settings-panel {
  width: 100%;
  border-radius: 10px;
  
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  padding: 15px;
  margin-top: 20px;
  box-sizing: border-box;
}

#manualWeather {
  width: 100%;
  cursor: pointer;
  -webkit-appearance: none;
  background-color: rgba(255,255,255,0.06) !important;
  border: 1px solid rgba(255,255,255,0.1) !important;
  border-radius: 10px;
  height: 10px;
  outline: none;
}

#manualWeather::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255,255,255,0.1);
  cursor: pointer;
  transform: translateY(-35%);
}

#extended-settings-container::-webkit-scrollbar {
  width: 10px;
}

#extended-settings-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

#extended-settings-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
}

#extended-settings-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.4);
}

#WeatherStep {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.button-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

#manualAurora_Off,
#manualAurora_B,
#manualAurora_G {
  width: 60px;
  height: 60px;
  cursor: pointer;
  border-radius: 50%;
  
  background-color: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.1);
}

#extended-settings-button:hover,
#manualAurora_Off:hover,
#manualAurora_B:hover,
#manualAurora_G:hover {
  background-color: rgba(255,255,255,0.15);
}

@property --gradient-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

.aurora-Blue,
.aurora-Green {
  transform: translate(0, 60%);
  display: none;
  z-index: -1;

  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  filter: blur(4rem);

  animation: aurora-spin 15s linear infinite;
}

.aurora-Blue {
  background: conic-gradient(
    from var(--gradient-angle),
    var(--nlB-1),
    var(--nlB-2),
    var(--nlB-3),
    var(--nlB-2),
    var(--nlB-1));
}

.aurora-Green {
  background: conic-gradient(
    from var(--gradient-angle),
    var(--nlG-1),
    var(--nlG-2),
    var(--nlG-3),
    var(--nlG-2),
    var(--nlG-1));
}

@keyframes aurora-spin {
  0% {
    --gradient-angle: 0deg;
  }
  100% {
    --gradient-angle: 360deg;
  }
}
`;
GM_addStyle(css);
// ====================================================================================================================

// ====================================================================================================================
function createSettingsBlock(blockId, settings) {
  const settingsContainer = document.querySelector("#branch");
  const backgroundImageURL = window.getComputedStyle(
    document.body
  ).backgroundImage;

  const settingsElement = document.createElement("div");
  settingsElement.classList.add("rounded-image");
  settingsElement.id = blockId;
  settingsElement.innerHTML = settings;
  settingsElement.style.backgroundImage = backgroundImageURL;

  settingsContainer.appendChild(settingsElement);
}

function handleSettingsState(settingsId, localStorageKey, defaultValue) {
  const settingsElement = document.querySelector(`#${settingsId}`);

  // Получаем значение из localStorage или используем defaultValue
  let storedValue = localStorage.getItem(localStorageKey);
  if (storedValue === null) {
    storedValue = defaultValue;
    localStorage.setItem(localStorageKey, defaultValue);
  }

  if (settingsElement.type === "checkbox") {
    settingsElement.checked = storedValue === "true";
  } else {
    settingsElement.value = storedValue;
  }

  // Обработчик изменения значения настройки
  settingsElement.addEventListener("change", () => {
    const newValue =
      settingsElement.type === "checkbox"
        ? settingsElement.checked.toString()
        : settingsElement.value;
    localStorage.setItem(localStorageKey, newValue);
  });
}

window.addEventListener("load", () => {
  const newsButton = document.getElementById("news-button");
  const newsList = document.getElementById("news-list");

  if (newsButton && newsList) {
    newsButton.addEventListener("click", () => {
      if (newsList.style.display === "none") {
        newsList.style.display = "block";
      } else {
        newsList.style.display = "none";
      }
    });
  }
});

// Новые настройки и вставка настроек
if (targetSettings.test(window.location.href)) {
  createSettingsBlock("uwu-settings", uwusettings);
  handleSettingsState("weather-enabled", "weatherSettings", "true");
  handleSettingsState("extended-settings", "extendedSettings", "false");
}
// ====================================================================================================================

// ====================================================================================================================
// Игровая ли... Я чё знаю?
if (window.location.href === targetCW3) {
  const containerElement = document.querySelector("body");
  const globalContainerElement = document.createElement("div");
  globalContainerElement.id = "global-container";
  containerElement.appendChild(globalContainerElement);

  const extendedSettings = localStorage.getItem("extendedSettings");

  if (extendedSettings === "true") {
    const extendedSettingsButtonElement = document.createElement("div");
    extendedSettingsButtonElement.innerHTML = extendedSettingsButton;
    globalContainerElement.appendChild(extendedSettingsButtonElement);

    const panel = extendedSettingsButtonElement.querySelector(
      "#extended-settings-container"
    );
    panel.style.display = "none";

    extendedSettingsButtonElement
      .querySelector("button")
      .addEventListener("click", () => {
        panel.style.display =
          panel.style.display === "block" ? "none" : "block";
      });

    var manualAurora = false;

    const manualAuroraOffButton = document.getElementById("manualAurora_Off");
    const manualAuroraBButton = document.getElementById("manualAurora_B");
    const manualAuroraGButton = document.getElementById("manualAurora_G");

    manualAuroraOffButton.addEventListener("click", () => {
      manualAurora = false;
      removeAurora();
      toggleAurora();
    });

    manualAuroraBButton.addEventListener("click", () => {
      manualAurora = true;
      randomNumber = 0.6;
      removeAurora();
      toggleAurora();
    });

    manualAuroraGButton.addEventListener("click", () => {
      manualAurora = true;
      randomNumber = 0.1;
      removeAurora();
      toggleAurora();
    });
  }
  // ====================================================================================================================
  var currentWeather = "null";
  var currentHour = "null";
  var currentSeason = "null";
  var currentTemperature = "null";
  // ахахаха глянье на этих незнающих

  if (extendedSettings === "true") {
    const manualWeatherSlider = document.getElementById("manualWeather");

    manualWeatherSlider.addEventListener("change", () => {
      const selectedWeather = manualWeatherSlider.value;

      if (selectedWeather === "1") {
        currentWeather = "clear";
      } else if (selectedWeather === "2") {
        currentWeather = "rain";
      } else if (selectedWeather === "3") {
        currentWeather = "snow";
      }
    });
  }

  function getSkyType() {
    const skyElement = document.querySelector("#sky");
    const skyStyle = skyElement.getAttribute("style");
    const weatherSettings = localStorage.getItem("weatherSettings");

    if (weatherSettings === "true") {
      const match = skyStyle.match(/\/(\d+)\.png/);
      if (match) {
        const skyNumber = parseInt(match[1]);

        switch (skyNumber) {
          case 2:
          case 4:
            currentWeather = "rain";
            break;
          case 7:
          case 8:
            currentWeather = "snow";
            break;
          default:
            currentWeather = "clear";
        }
      }
    }
  }

  function getTime() {
    const timeElement = document.querySelector("#hour");
    const hourTime = timeElement.querySelector("img").getAttribute("src");
    const weatherSettings = localStorage.getItem("weatherSettings");

    if (weatherSettings === "true") {
      const hourNumber = parseInt(hourTime.match(/(\d+)\.png$/)[1]);

      if (hourNumber >= 6 && hourNumber <= 12) {
        currentHour = "morning";
      } else if (hourNumber >= 13 && hourNumber <= 18) {
        currentHour = "day";
      } else if (hourNumber >= 19 && hourNumber <= 21) {
        currentHour = "evening";
      } else {
        currentHour = "night";
      }
    }
  }

  function getSeason() {
    const seasonElement = document.querySelector("img[src*='symbole/season']");
    const seasonSrc = seasonElement.getAttribute("src");
    const match = seasonSrc.match(/season(\d+)\.png/);

    if (match) {
      const seasonNumber = parseInt(match[1]);
      switch (seasonNumber) {
        case 1:
          currentSeason = "spring";
          break;
        case 2:
          currentSeason = "summer";
          break;
        case 3:
          currentSeason = "autumn";
          break;
        case 4:
          currentSeason = "winter";
          break;
      }
    }
  }

  var weatherModifier = 1;
  var temperatureDescription = "null";
  function getTemperature() {
    const temperatureElement = document.querySelector("#tos");
    const temperature = temperatureElement.style.background;

    switch (temperature) {
      case "linear-gradient(90deg, rgb(165, 205, 221), rgb(80, 127, 168))":
        currentTemperature = -1;
        temperatureDescription = "Холодно";
        break;
      default:
        currentTemperature = 0;
        temperatureDescription =
          "(Неизвестная температура. Разработчик скорее всего уже в курсе и в скором времени выпустит правку.)";
    }

    // Выставляем по температуре модификатор размера и скорости частиц.
    if (currentTemperature <= -3 || currentTemperature >= 3) {
      weatherModifier = 1;
    } else if (
      currentTemperature === -2 ||
      currentTemperature === -1 ||
      currentTemperature === 0 ||
      currentTemperature === 1 ||
      currentTemperature === 2
    ) {
      weatherModifier = 2;
    }

    // Проверяем существование элемента "temperature" перед обновлением его внутреннего HTML-контента
    const temperatureDisplayElement = document.getElementById("temperature");
    if (temperatureDisplayElement) {
      temperatureDisplayElement.innerHTML =
        "[?] Текущий модификатор: " +
        weatherModifier +
        " (" +
        temperatureDescription +
        ")";
    }

    // console.log("Temperature:", temperature);
    // console.log("Weather Modifier:", weatherModifier);
  }

  if (extendedSettings === "false") {
    setInterval(() => {
      getSkyType();
      getTime();
      getSeason();
    }, 4000);
  }
  setInterval(getTemperature, 4000);
  // ====================================================================================================================

  // ====================================================================================================================
  const weatherContainer = document.getElementById("global-container");
  const weatherCanvas = document.createElement("canvas");
  weatherCanvas.classList.add("weatherCanvas");
  weatherContainer.appendChild(weatherCanvas);
  const weatherCtx = weatherCanvas.getContext("2d");

  function resizeCanvasElement() {
    weatherCanvas.width = weatherCanvas.parentNode.offsetWidth;
    weatherCanvas.height = weatherCanvas.parentNode.offsetHeight;
  }

  window.addEventListener("resize", resizeCanvasElement);
  resizeCanvasElement();
  // ====================================================================================================================
  function generateRain() {
    const raindrops = [];

    setInterval(() => {
      for (let i = 0; i < 12; i++) {
        const raindrop = currentWeather === "rain" ? generateRaindrop() : null;
        if (raindrop) {
          raindrops.push(raindrop);
        }
      }
    }, 60);

    function generateRaindrop() {
      if (document.hidden) {
        return;
      }
      const x = Math.random() * weatherCanvas.width;
      const y = Math.random() * -100;
      const length = (Math.random() * 10 + 50) / weatherModifier;
      const width = Math.random() * 1 + 1;
      const ySpeed = length * 0.2 * weatherModifier;
      const xSpeed = Math.random() * 1;

      return { x, y, length, width, ySpeed, xSpeed };
    }

    function animateRain() {
      if (raindrops.length > 0) {
        weatherCtx.clearRect(0, 0, weatherCanvas.width, weatherCanvas.height);
        for (const raindrop of raindrops) {
          raindrop.y += raindrop.ySpeed;
          raindrop.x += raindrop.xSpeed;
          drawRaindrop(raindrop);
        }
      }
      requestAnimationFrame(animateRain);
    }

    function drawRaindrop(raindrop) {
      weatherCtx.beginPath();
      weatherCtx.ellipse(
        raindrop.x,
        raindrop.y,
        raindrop.width,
        raindrop.length,
        0,
        Math.PI,
        2 * Math.PI
      );
      weatherCtx.fillStyle = "rgba(150, 150, 150, 0.4)";
      weatherCtx.fill();
    }

    animateRain();

    return { raindrops };
  }
  // ====================================================================================================================
  function generateSnowflakes() {
    const snowflakes = [];

    setInterval(() => {
      for (let i = 0; i < 1; i++) {
        const snowflake =
          currentWeather === "snow" ? generateSnowflake() : null;
        if (snowflake) {
          snowflakes.push(snowflake);
        }
      }
    }, 100);

    function generateSnowflake() {
      if (document.hidden) {
        return;
      }
      const y = Math.random() * -100;
      const x = Math.random() * weatherCanvas.width;
      const size = (Math.random() * 5 + 2) / weatherModifier;
      const ySpeed = size * 0.14 * weatherModifier;
      const xSpeed = size * (Math.random() - Math.random()) * 0.02;

      return { x, y, size, ySpeed, xSpeed };
    }

    function animateSnow() {
      if (snowflakes.length > 0) {
        weatherCtx.clearRect(0, 0, weatherCanvas.width, weatherCanvas.height);
        for (const snowflake of snowflakes) {
          snowflake.y += snowflake.ySpeed;
          snowflake.x += snowflake.xSpeed;
          drawSnowflake(snowflake.x, snowflake.y, snowflake.size);
        }
      }
      requestAnimationFrame(animateSnow);
    }

    function drawSnowflake(x, y, size) {
      weatherCtx.beginPath();
      weatherCtx.ellipse(x, y, size, size, 0, 0, 2 * Math.PI);
      weatherCtx.fillStyle = "white";
      weatherCtx.fill();
    }

    animateSnow();

    return { snowflakes };
  }
  // ====================================================================================================================
  let aurora;

  var randomNumber = Math.random();

  function createAurora(color) {
    if (
      !aurora ||
      aurora.classList.contains(
        color === "green" ? "aurora-Blue" : "aurora-Green"
      )
    ) {
      aurora = document.createElement("div");
      aurora.classList.add(color === "green" ? "aurora-Green" : "aurora-Blue");
      weatherContainer.appendChild(aurora);
    }
  }

  function removeAurora() {
    if (aurora) {
      aurora.style.display = "none";
    }
  }

  function toggleAurora() {
    if (extendedSettings === "true" && !manualAurora) {
      removeAurora();
    } else if (extendedSettings === "false" && !manualAurora) {
      if (
        currentWeather === "clear" &&
        currentHour === "night" &&
        (currentSeason === "autumn" || currentSeason === "winter")
      ) {
        if (randomNumber > 0.5) {
          createAurora("green");
        } else {
          createAurora("blue");
        }
        aurora.style.display = "block";
      } else {
        removeAurora();
      }
    } else {
      if (randomNumber > 0.5) {
        createAurora("blue");
      } else {
        createAurora("green");
      }
      aurora.style.display = "block";
    }
  }

  setInterval(toggleAurora, 2000);
  // ====================================================================================================================
  function checkElements(elements, container) {
    for (let i = elements.length - 1; i >= 0; i--) {
      const element = elements[i];

      if (
        element &&
        (element.y >= container.offsetHeight ||
          element.x >= container.offsetWidth ||
          element.x <= 0)
      ) {
        elements.splice(i, 1);
      }
    }
    // console.log(`Количество элементов: ${elements.length}`)
  }

  setInterval(() => {
    checkElements(raindrops, weatherContainer);
    checkElements(snowflakes, weatherContainer);
  }, 100);

  const { raindrops } = generateRain();
  const { snowflakes } = generateSnowflakes();
  // ====================================================================================================================
}
// ====================================================================================================================
