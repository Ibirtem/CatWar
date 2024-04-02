// ==UserScript==
// @name         Catwar UwU
// @namespace    http://tampermonkey.net/
// @version      v1.7.1-04.24
// @description  Визуальное обновление CatWar'а.
// @author       Ibirtem / Затменная ( https://catwar.su/cat1477928 )
// @copyright    2024, Ibirtem (https://openuserjs.org/users/Ibirtem)
// @supportURL   https://catwar.su/cat1477928
// @homepageURL  https://openuserjs.org/scripts/Ibirtem/Catwar_UwU
// @match        http*://*.catwar.su/*
// @updateURL    https://github.com/Ibirtem/CatWar/raw/main/Catwar%20UwU.js
// @downloadURL  https://github.com/Ibirtem/CatWar/raw/main/Catwar%20UwU.js
// @grant        GM_addStyle
// @license      MIT
// @iconURL      https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/partly_sunny_rain.png
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

      <p>Замена стандартных частиц на знакомые всеми пиксельные частицы.</p>
      <input type="checkbox" id="minecraft-style">
      <label for="weather-enabled">Minecraft частицы</label>
    </div>
    <hr>
  <div id="news">

    <button id="news-button">v1.7.1 - Время бесполезных фиксов, правок, редизайнов и новых переписей кода.</button>
    <div id="news-list" style="display: none;">
      <h3>Главное</h3>
      <p>— Ну и что это такое...? Отвратительно прелестно, прелестно отвратительно, не так ли?</p>
      <hr>
      <h3>Внешний вид</h3>
      <p>— Дофиксил иконку скрипта/мода в UserScript.</p>
      <p>— Теперь Северное Сияние включается ещё и в Самую-Яркую-Ночь в Северном Клане.</p>
      <p>— Решил убрать затемнение настроек, чтобы привести к более единой "стеклянной" теме моего скрипта/мода.</p>
      <p>— Отдал определение цвета текста настроек CatWar'у и его дизайнам.</p>
      <p>— Аж поменял иконочку Расширенных настроек. Зачем не знаю. Выглядит классней. Подстать иконке скрипта.</p>
      <p>— УЛЬТРА МЕГА РЕДИЗАЙН НОВОСТЕЙ (Того, что вы читаете). Вряд ли все дизайнерские измнения приживутся надолго, так как скорее всего блог новостей и настроек в целом я попробую переделать в будущем. Да, очередной редизайн!</p>
      <hr>
      <h3>Изменения кода</h3>
      <p>— Я забыл добавить критично важную подчистку пиксельных капель, но вы скорее всего этого и не заметили, так как выпустил вручную Хотфикс в версию 1.7.0.</p>
      <p>— Все изображения теперь берутся с GitHub'а. Так они с меньшим шансом в будущем потеряются или сломаются, а так же легче ищутся и понимаются в самом коде.</p>
      <p>— Почистил и упростил логику создания Северного Сияния.</p>
      <p>— Чуть-чу-чуть почистил физику частиц от лишних вычислений и изменил их логику для более интересного внешнего вида.</p>
      <p>— Больше строчек кода выключается при выключенной настройки генерации погоды, а значит и меньше влияния на игровую. Оптимизация!</p>
      <hr>
      <p>Дата выпуска: 03.04.24</p>
    </div>

  </div>
</div>
`;

// div'ы Игровой
const extendedSettingsButton = `
<div>
  <button type="button" id="extended-settings-button">
    <img src="https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/partly_sunny_rain.png" alt="Иконка" width="36" height="36">
  </button>

  <div id="extended-settings-container">
    <div id="extended-settings-panel">
      <p>Изменения, сделанные в этой панели, носят временный характер и не сохраняются.</p>
      <h3>Переключить погоду</h3>
      <input type="range" min="1" max="3" value="1" class="slider" id="manualWeather" list="WeatherStep">
        <datalist id="WeatherStep">
          <img src="https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/sunny.png" width="36" height="36" option value="1"></option>
          <img src="https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/rain_cloud.png" width="36" height="36" option value="2"></option>
          <img src="https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/snow_cloud.png" width="36" height="36" option value="3"></option>
        </datalist>
        <div id="temperature-container">
          <p id="temperature" title="На это умножается скорость частиц и делится их размер. В будущем будет возможность сохранять и изменять это значение под свой вкус.">[?] Текущий модификатор: ...уточнение...</p>
        </div>

        <h3>Выбрать Северное Сияние</h3>
      <div class="button-container">
        <button type="button" id="manualAurora_Off">
          <img src="https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/icons8-nothern-lights-96.png" alt="Иконка" width="48" height="48">
        </button>
        <button type="button" id="manualAurora_B">
          <img src="https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/icons8-nothern-lights-96_blue.png" alt="Иконка" width="48" height="48">
        </button>
        <button type="button" id="manualAurora_G">
          <img src="https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/icons8-nothern-lights-96_green.png" alt="Иконка" width="48" height="48">
        </button>
      </div>
    </div>
    <div id="aurora-settings-panel">
      <p>Изменения, сделанные в этой панели, сохранятся!</p>
      <h5>Здесь будет возможность переместить Северное Сияние, исключать локации из генерации погоды, либо запрещать определённой погоде существовать на выбранной локации. Но это всё пока что лишь мечта...</h5>
      <h5>А ещё держите маленький факт: Северные Сияния будет видно только ясной ночью, и только осенью и зимой. (А ещё, может быть, если я очень зажмочусь, то только в Северном Клане и Горах)</h5>
    </div>
  </div>
</div>
`;

// ====================================================================================================================

// ====================================================================================================================
// Стили. Наверно. Не проверяйте пожалуйста, я тут потерялся. 
// Glassmorphism вперёд Glassmorphism вперёд Glassmorphism вперёд Glassmorphism вперёд Glassmorphism вперёд Glassmorphism вперёд Glassmorphism вперёд Glassmorphism вперёд Glassmorphism вперёд Glassmorphism вперёд Glassmorphism вперёд
// TODO - Унифицировать шрифты, цвета текстов, прозрачность, закруглённость штучек ну кароче всё надо.
// TODO - Северное Сияние доработать, чтобы лепить снизу сверху или в середине.
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
  font-family: "Montserrat", sans-serif;
  margin: 0 auto;
  backdrop-filter: blur(12px);
  background-color: rgba(255,255,255,0.03);
  border-radius: 20px;
  padding: 15px;
  border: 1px solid rgba(255,255,255,0.1);
}

#uwusettings h1,
#uwusettings h2 {
  font-family: "Montserrat", sans-serif;
  margin-top: 15px;
  margin-bottom: 15px;
  text-align: center;
}

#uwusettings h4 {
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 15px;
}

#uwusettings p {
  margin-bottom: 5px;
  font-size: 15px;
}

#uwusettings label {
  font-size: 16px;
}

#uwusettings ul {
  font-family: "Montserrat", sans-serif;
  list-style-type: "+ ";
}

#uwusettings hr {
  border: rgba(255, 255, 255, 0.1) solid;
  border-radius: 15px;
}

#uwusettings input[type="checkbox"] {
  margin-right: 8px;
  appearance: none;
  transform: translate(-10%, 30%);
  width: 35px;
  height: 18px;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

#uwusettings input[type="checkbox"]:checked {
  background-color: rgba(154, 255, 132, 0.5);
}

#uwusettings input[type="checkbox"]:not(:checked) {
  background-color: rgba(255, 255, 255, 0.1);
}

#uwusettings input[type="checkbox"]:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 4px;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255,255,255,0.1);
  transition: background-color 0.2s ease-in-out, left 0.2s ease-in-out;
}

#uwusettings input[type="checkbox"]:checked:before {
  left: calc(100% - 4px);
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
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
  cursor: pointer;

  background-color: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.1);
}


#extended-settings-container {
  font-family: "Montserrat", sans-serif;
  color: white;
  font-size: 15px;
  text-align: center;
  
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 400px;
  height: 400px;
  backdrop-filter: blur(12px);
  border-radius: 10px;
  display: none;
  pointer-events: auto;

  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  display: grid;
  place-items: center;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
}

#news {
  margin-top: 20px;
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

#news-button,
#news-list {
  font-family: "Montserrat", sans-serif;
  font-size: 15px;
  cursor: pointer;
}

#news-list h3 {
  margin-left: 40px;
}

#news-list p {
  margin-top: 3px;
  margin-bottom: 3px;
  margin-left: 20px;
}

#aurora-settings-panel {
  width: 100%;
  border-radius: 10px;
  
  background-color: rgba(255, 255, 255, 0.03);
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
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
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
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
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

// Кнопка Новостей
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

// Стандарт значения настроек и их вставка
if (targetSettings.test(window.location.href)) {
  createSettingsBlock("uwu-settings", uwusettings);
  handleSettingsState("weather-enabled", "weatherSettings", "true");
  handleSettingsState("extended-settings", "extendedSettings", "false");
  handleSettingsState("minecraft-style", "minecraftStyle", "false");
}
// ====================================================================================================================

// ====================================================================================================================
// Игровая ли... Я чё знаю?
if (window.location.href === targetCW3) {
  const containerElement = document.querySelector("body");
  const globalContainerElement = document.createElement("div");
  globalContainerElement.id = "global-container";
  containerElement.appendChild(globalContainerElement);

  const weatherSettings = localStorage.getItem("weatherSettings");
  const extendedSettings = localStorage.getItem("extendedSettings");
  const minecraftStyle = localStorage.getItem("minecraftStyle");
  // ====================================================================================================================
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

    const manualAuroraOffButton = document.getElementById("manualAurora_Off");
    const manualAuroraBButton = document.getElementById("manualAurora_B");
    const manualAuroraGButton = document.getElementById("manualAurora_G");

    manualAuroraOffButton.addEventListener("click", () => {
      removeAurora();
    });

    manualAuroraBButton.addEventListener("click", () => {
      createAurora("blue");
    });

    manualAuroraGButton.addEventListener("click", () => {
      createAurora("green");
    });
  }
  // ====================================================================================================================
  var currentWeather = "null";
  var currentHour = "null";
  var currentSeason = "null";
  var currentTemperature = "null";
  var temperatureDescription = "null";
  // ахахаха глянье на этих незнающих
  var weatherModifier = 1;

  if (extendedSettings === "true") {
    const manualWeatherSlider = document.getElementById("manualWeather");

    manualWeatherSlider.addEventListener("change", () => {
      const selectedWeather = manualWeatherSlider.value;

      if (selectedWeather === "1") {
        currentWeather = "clear";
      } else if (selectedWeather === "2") {
        if (minecraftStyle === "true") {
          currentWeather = "pixelRain";
        } else {
          currentWeather = "rain";
        }
      } else if (selectedWeather === "3") {
        if (minecraftStyle === "true") {
          currentWeather = "pixelSnow";
        } else {
          currentWeather = "snow";
        }
      }
    });
  }

  function getSkyType() {
    const skyElement = document.querySelector("#sky");
    const skyStyle = skyElement.getAttribute("style");

    if (weatherSettings === "true") {
      const match = skyStyle.match(/\/(\d+)\.png/);
      if (match) {
        const skyNumber = parseInt(match[1]);

        switch (skyNumber) {
          case 2:
          case 4:
            if (minecraftStyle === "true") {
              currentWeather = "pixelRain";
            } else {
              currentWeather = "rain";
            }
            break;
          case 7:
          case 8:
            if (minecraftStyle === "true") {
              currentWeather = "pixelSnow";
            } else {
              currentWeather = "snow";
            }
            break;
          case 22:
            currentWeather = "northernLights";
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

  function getTemperature() {
    const temperatureElement = document.querySelector("#tos");
    const temperatureElementHTML = temperatureElement.outerHTML;
    const backgroundValue = /background:\s*([a-zA-Z0-9#()]+);/.exec(
      temperatureElementHTML
    );

    if (backgroundValue && backgroundValue.length > 1) {
      const foundBackground = backgroundValue[1];

      const temperatureRanges = [
        { start: 203, end: 206, temperature: -1, description: "Холодно" },
        { start: 206, end: 210, temperature: 0, description: "Прохладно" },
        { start: 23, end: 31, temperature: 1, description: "Тепло" },
      ];

      const backgroundColor = hexToHSL(foundBackground);
      let foundTemperature = null;

      for (const range of temperatureRanges) {
        if (isHueInRange(backgroundColor.h, range.start, range.end)) {
          foundTemperature = range;
          break;
        }
      }

      if (foundTemperature) {
        currentTemperature = foundTemperature.temperature;
        temperatureDescription = foundTemperature.description;
      } else {
        currentTemperature = 0;
        temperatureDescription =
          "Неизвестная температура. Разработчик скорее всего уже в курсе и в скором времени выпустит правку.";
      }

      if (currentTemperature <= -3 || currentTemperature >= 3) {
        weatherModifier = 1;
      } else {
        weatherModifier = 2;
      }

      const temperatureDisplayElement = document.getElementById("temperature");
      if (temperatureDisplayElement) {
        temperatureDisplayElement.innerHTML =
          "[?] Текущий модификатор: " +
          weatherModifier +
          " (" +
          temperatureDescription +
          ")";
      }
    } else {
      console.log("...я снова потерялся...");
    }
  }

  // Чуть ли не маленькая личная библиотека по цветоконвертации, представляете?
  function hexToHSL(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // Ахроматический цвет
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  function isHueInRange(hue, start, end) {
    if (start > end) {
      return hue >= start || hue < end;
    } else {
      return hue >= start && hue < end;
    }
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

  const images = {
    pixelSnow: [
      {
        url: "https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/snowflake1.png",
      },
      {
        url: "https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/snowflake2.png",
      },
    ],
    pixelRain: [
      {
        url: "https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/rain1.png",
      },
      {
        url: "https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/rain2.png",
      },
    ],
  };

  async function loadImages(type) {
    const imagesForType = images[type];
    if (!imagesForType) {
      console.error(`Чё ета...?: ${type}`);
      return;
    }

    const promises = [];

    for (const image of imagesForType) {
      promises.push(
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = image.url;
          img.onload = function () {
            image.image = this;
            resolve();
          };
          img.onerror = function () {
            console.error(`Чёта не скачалось: ${image.url}`);
            reject();
          };
        })
      );
    }

    await Promise.all(promises);
  }
  loadImages("pixelSnow");
  loadImages("pixelRain");

  const { raindrops } = generateRain();
  const { snowflakes } = generateSnowflakes();
  const { pixelRaindrops } = generatePixelRain();
  const { pixelSnowflakes } = generatePixelSnow();
  // ====================================================================================================================
  function generateRain() {
    const raindrops = [];

    setInterval(() => {
      if (currentWeather === "rain") {
        for (let i = 0; i < 10; i++) {
          const raindrop = generateRaindrop();
          if (raindrop) {
            raindrops.push(raindrop);
          }
        }
      }
    }, 80);

    function generateRaindrop() {
      if (document.hidden) {
        return;
      }
      const x = Math.random() * weatherCanvas.width;
      const y = Math.random() * -100;
      const length = (Math.random() * 20 + 40) / weatherModifier;
      const width = (Math.random() * 1 + 1) / weatherModifier;
      const ySpeed = length * 0.2 * weatherModifier;
      const xSpeed = Math.random() * 1;

      return { x, y, length, width, ySpeed, xSpeed };
    }

    return { raindrops };
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
  // ====================================================================================================================
  function generateSnowflakes() {
    const snowflakes = [];

    setInterval(() => {
      if (currentWeather === "snow") {
        for (let i = 0; i < 1; i++) {
          const snowflake = generateSnowflake();
          if (snowflake) {
            snowflakes.push(snowflake);
          }
        }
      }
    }, 120);

    function generateSnowflake() {
      if (document.hidden) {
        return;
      }
      const y = Math.random() * -100;
      const x = Math.random() * weatherCanvas.width;
      const size = (Math.random() * 5 + 2) / weatherModifier;
      const ySpeed = size * 0.1 * weatherModifier;
      const xSpeed = (Math.random() - Math.random()) * 0.2;

      return { x, y, size, ySpeed, xSpeed };
    }

    return { snowflakes };
  }

  function drawSnowflake(x, y, size) {
    weatherCtx.beginPath();
    weatherCtx.ellipse(x, y, size, size, 0, 0, 2 * Math.PI);
    weatherCtx.fillStyle = "white";
    weatherCtx.fill();
  }
  // ====================================================================================================================
  function generatePixelRain() {
    const pixelRaindrops = [];

    setInterval(() => {
      if (currentWeather === "pixelRain") {
        for (let i = 0; i < 8; i++) {
          const pixelRaindrop = generatePixelRaindrop();
          if (pixelRaindrop) {
            pixelRaindrops.push(pixelRaindrop);
          }
        }
      }
    }, 80);

    function generatePixelRaindrop() {
      if (document.hidden) {
        return;
      }
      const x = Math.random() * weatherCanvas.width;
      const y = Math.random() * -100;
      const size = (Math.random() * 26 + 26) / Math.pow(weatherModifier, 0.5);
      const ySpeed = size * 0.2 * Math.pow(weatherModifier, 0.5);
      const xSpeed = Math.random() * 0.2 - 0.1;
      const imageData =
        images.pixelRain[Math.floor(Math.random() * images.pixelRain.length)];
      const image = imageData.image;

      return { x, y, size, ySpeed, xSpeed, image };
    }

    return { pixelRaindrops };
  }

  function drawPixelRaindrop(pixelRaindrop) {
    const imageWidth = pixelRaindrop.image.width;
    const imageHeight = pixelRaindrop.image.height;
    const scaleFactor = pixelRaindrop.size / Math.max(imageWidth, imageHeight);

    weatherCtx.drawImage(
      pixelRaindrop.image,
      pixelRaindrop.x,
      pixelRaindrop.y,
      imageWidth * scaleFactor,
      imageHeight * scaleFactor
    );
  }
  // ====================================================================================================================
  function generatePixelSnow() {
    const pixelSnowflakes = [];

    setInterval(() => {
      if (currentWeather === "pixelSnow") {
        for (let i = 0; i < 1; i++) {
          const pixelSnowflake = generatePixelSnowflake();
          if (pixelSnowflake) {
            pixelSnowflakes.push(pixelSnowflake);
          }
        }
      }
    }, 120);

    function generatePixelSnowflake() {
      if (document.hidden) {
        return;
      }
      const y = Math.random() * -100;
      const x = Math.random() * weatherCanvas.width;
      const size = (Math.random() * 8 + 8) / Math.pow(weatherModifier, 0.8); // TODO - Протестить, сильно ли влияет Math.pow на производительность или нет
      const ySpeed = size * 0.1 * Math.pow(weatherModifier, 0.8) - 0.6;
      const xSpeed = (Math.random() - Math.random()) * 0.2;
      const imageData =
        images.pixelSnow[Math.floor(Math.random() * images.pixelSnow.length)];
      const image = imageData.image;

      return { x, y, size, ySpeed, xSpeed, image };
    }

    return { pixelSnowflakes };
  }

  function drawPixelSnowflake(x, y, size, image) {
    weatherCtx.drawImage(image, x - size / 2, y - size / 2, size, size);
  }
  // ====================================================================================================================
  function animateWeather() {
    weatherCtx.clearRect(0, 0, weatherCanvas.width, weatherCanvas.height);

    if (raindrops.length > 0) {
      for (const raindrop of raindrops) {
        raindrop.y += raindrop.ySpeed;
        raindrop.x += raindrop.xSpeed;
        drawRaindrop(raindrop);
      }
    }

    if (snowflakes.length > 0) {
      for (const snowflake of snowflakes) {
        snowflake.y += snowflake.ySpeed;
        snowflake.x += snowflake.xSpeed;
        drawSnowflake(snowflake.x, snowflake.y, snowflake.size);
      }
    }

    if (pixelSnowflakes.length > 0) {
      for (const pixelSnowflake of pixelSnowflakes) {
        pixelSnowflake.y += pixelSnowflake.ySpeed;
        pixelSnowflake.x += pixelSnowflake.xSpeed;
        drawPixelSnowflake(
          pixelSnowflake.x,
          pixelSnowflake.y,
          pixelSnowflake.size,
          pixelSnowflake.image
        );
      }
    }

    if (pixelRaindrops.length > 0) {
      for (const pixelRaindrop of pixelRaindrops) {
        pixelRaindrop.y += pixelRaindrop.ySpeed;
        pixelRaindrop.x += pixelRaindrop.xSpeed;
        drawPixelRaindrop(pixelRaindrop);
      }
    }

    requestAnimationFrame(animateWeather);
  }

  if (weatherSettings === "true" || extendedSettings === "true") {
    animateWeather();
  }

  // ====================================================================================================================
  let aurora;
  const auroraColors = {
    green: "aurora-Green",
    blue: "aurora-Blue",
  };

  function removeAurora() {
    if (aurora) {
      weatherContainer.removeChild(aurora);
      aurora = null;
    }
  }

  function createAurora(color) {
    if (!aurora || !aurora.classList.contains(auroraColors[color])) {
      removeAurora();
      aurora = document.createElement("div");
      aurora.classList.add(auroraColors[color]);
      weatherContainer.appendChild(aurora);
    }
  }

  function toggleAurora() {
    if (extendedSettings !== "true") {
      if (
        (currentWeather === "clear" &&
          currentHour === "night" &&
          (currentSeason === "autumn" || currentSeason === "winter")) ||
        currentWeather === "northernLights"
      ) {
        if (!aurora) {
          const randomNumber = Math.random();
          if (randomNumber > 0.5) {
            createAurora("green");
          } else {
            createAurora("blue");
          }
        }
      } else {
        removeAurora();
      }
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

  if (extendedSettings === "true" || weatherSettings === "true") {
    setInterval(() => {
      checkElements(raindrops, weatherContainer);
      checkElements(snowflakes, weatherContainer);
      checkElements(pixelSnowflakes, weatherContainer);
      checkElements(pixelRaindrops, weatherContainer);
    }, 120);
  }
  // ====================================================================================================================
}
// ====================================================================================================================
