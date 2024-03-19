// ==UserScript==
// @name         Catwar UwU
// @namespace    http://tampermonkey.net/
// @version      v1.5.4-03.24
// @description  Визуальное обновление CatWar'а.
// @author       Ibirtem / Тенёчек ( https://catwar.su/cat1477928 )
// @match        http*://*.catwar.su/*
// @updateURL    https://github.com/Ibirtem/CatWar/raw/main/Catwar%20UwU.js
// @downloadURL  https://github.com/Ibirtem/CatWar/raw/main/Catwar%20UwU.js
// @grant        GM_addStyle
// @license      MIT
// ==/UserScript==

// ====================================================================================================================
// Вроде как начальные настройки.
const targetSettings = "https://catwar.su/settings";
const targetCW3 = "https://catwar.su/cw3/";
// ====================================================================================================================

// ====================================================================================================================
// div'ы Настроек
const uwusettings = `
<div id="uwusettings">
  <h1>Настройки CatWar UwU</h1>
  <hr>
    <h2>Природные явления</h2>
    <div class="weather-toggle">
      <p>Включает/Выключает динамичную погоду в игровой, такие как дождь или снегопад. В будущем может быть будет настройка интенсивности эффектов.</p>
      <input type="checkbox" id="weather-enabled">
      <label for="weather-enabled">Показывать погоду</label>
    </div>
  <hr>
  </div>
`;

// div'ы Игровой
// стоп а где
// ====================================================================================================================

// ====================================================================================================================
// Стили. Наверно. Не проверяйте пожалуйста, я тут потерялся.
let css = `
:root {
  --nlB-1: #9DF5ED;
  --nlB-2: #82BBF5;
  --nlB-3: #725DFA;
}

#uwusettings {
  font-family: Century Gothic;
  margin: 0 auto;
  backdrop-filter: blur(8px) brightness(70%);
  border-radius: 20px;
  padding: 15px;
}

#uwusettings h1 {
  margin-top: 15px;
  margin-bottom: 15px;
  text-align: center;
  color: white;
}

#uwusettings h2 {
  margin-top: 15px;
  margin-bottom: 15px;
  text-align: center;
  color: white;
}

#uwusettings p {
  color: white;
  font-size: 15px;
}

#uwusettings label {
  color: white;
  font-size: 16px;
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

@property --gradient-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

.aurora {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  filter: blur(4rem);
  background: conic-gradient(
    from var(--gradient-angle),
    var(--nlB-1),
    var(--nlB-2),
    var(--nlB-3),
    var(--nlB-2),
    var(--nlB-1));
  animation: aurora-spin 15s linear infinite;

  transform: translate(0, 60%);
  display: none;
  z-index: -1;
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
  const backgroundImageURL = window.getComputedStyle(document.body).backgroundImage;

  const settingsElement = document.createElement("div");
  settingsElement.classList.add("rounded-image");
  settingsElement.id = blockId;
  settingsElement.innerHTML = settings;
  settingsElement.style.backgroundImage = backgroundImageURL;

  settingsContainer.appendChild(settingsElement);
}

function handleCheckboxState(checkboxId, localStorageKey, defaultValue) {
  const checkbox = document.querySelector(`#${checkboxId}`);

  // Получаем значение из localStorage или используем defaultValue
  const storedValue = localStorage.getItem(localStorageKey) || defaultValue;
  checkbox.checked = storedValue === "true";

  // Обработчик изменения состояния чекбокса
  checkbox.addEventListener("change", () => {
    const newValue = checkbox.checked ? "true" : "false";
    localStorage.setItem(localStorageKey, newValue);
  });
}

// Новые чекбоксы и вставка настроек
if (window.location.href === targetSettings) {
  createSettingsBlock("uwu-settings", uwusettings);
  handleCheckboxState("weather-enabled", "weatherSettings", "true");
}
// ====================================================================================================================

// ====================================================================================================================
// Игровая ли. Я чё знаю?
if (window.location.href === targetCW3) {
  const containerElement = document.querySelector("body");
  const globalContainerElement = document.createElement("div");
  globalContainerElement.id = "global-container";
  containerElement.appendChild(globalContainerElement);
  // ====================================================================================================================
  var weather = "null";

  function getSkyType() {
    const skyElement = document.querySelector("#sky");
    const skyStyle = skyElement.getAttribute("style");
    const weatherSettings = localStorage.getItem("weatherSettings");

    if (weatherSettings === "true") {
      if (
        skyStyle.includes("//e.catwar.su/cw3/sky/2.png") ||
        skyStyle.includes("//e.catwar.su/cw3/sky/4.png")
      ) {
        weather = "rain";
      } else if (
        skyStyle.includes("//e.catwar.su/cw3/sky/7.png") ||
        skyStyle.includes("//e.catwar.su/cw3/sky/8.png")
      ) {
        weather = "snow";
      } else {
        weather = "clear";
      }
    }
    console.log(weather);
  }
  setInterval(getSkyType, 2000);
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
        const raindrop = weather === "rain" ? generateRaindrop() : null;
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
      const length = Math.random() * 10 + 50;
      const width = Math.random() * 1 + 1;
      const ySpeed = length * 0.2;
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
        const snowflake = weather === "snow" ? generateSnowflake() : null;
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
      const size = Math.random() * 5 + 2;
      const ySpeed = size * 0.14;
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
// Создаем элемент северного сияния
const aurora = document.createElement("div");
aurora.classList.add("aurora");

// Добавляем элемент в контейнер погоды
weatherContainer.appendChild(aurora);

// Функция для отображения или скрытия элемента северного сияния
function toggleAurora() {
  if (weather === "snow") {
    aurora.style.display = "block";
  } else {
    aurora.style.display = "none";
  }
}

// Проверяем переменную weather через определенный промежуток времени
setInterval(() => {
  toggleAurora();
}, 1000); // Проверяем каждые 1000 миллисекунд (1 секунда)
  // ====================================================================================================================
  function checkElements(elements, container) {
    for (let i = elements.length - 1; i >= 0; i--) {
      const element = elements[i];
  
      if (element && (element.y >= container.offsetHeight || element.x >= container.offsetWidth || element.x <= 0)) {
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
