// ==UserScript==
// @name         Catwar UwU
// @namespace    http://tampermonkey.net/
// @version      v1.5.3-03.24
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
const weatherSettings = "true";
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
const container = `
<div id="container"></div>
`;
const rain = `
  <div id="rain"></div>
`;
// ====================================================================================================================

// ====================================================================================================================
// Стили. Наверно. Не проверяйте пожалуйста, я тут потерялся.
let css = `
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

.rainCanvas {
  z-index: 1;
  position: absolute;
}

.snowCanvas {
  z-index: 2;
  position: absolute;
}
`;
GM_addStyle(css);
// ====================================================================================================================

// ====================================================================================================================
// Вставка настроек в настройки пока мы совершенно точно в настройках. Да? Да ведь?
if (window.location.href === targetSettings) {
  const settings = document.querySelector("#branch");
  const backgroundImageURL = window.getComputedStyle(
    document.body
  ).backgroundImage;

  const uwusettingsElement = document.createElement("div");
  uwusettingsElement.classList.add("rounded-image");
  uwusettingsElement.innerHTML = uwusettings;
  uwusettingsElement.style.backgroundImage = backgroundImageURL;

  settings.appendChild(uwusettingsElement);

  // Погода в настройках о господе сколько тут текста бесполезного будет
  const weatherSettingsCheckbox = document.querySelector("#weather-enabled");

  if (!localStorage.getItem("weatherSettings")) {
    localStorage.setItem("weatherSettings", weatherSettings);
    // Костыль значения checkbox
    weatherSettingsCheckbox.checked = weatherSettings === "true";
  } else {
    const weatherSettingsFromLocalStorage =
      localStorage.getItem("weatherSettings");
    weatherSettingsCheckbox.checked =
      weatherSettingsFromLocalStorage === "true";
  }
  // Вертим checkbox на хахахахаха
  weatherSettingsCheckbox.addEventListener("change", () => {
    const newWeatherSettings = weatherSettingsCheckbox.checked
      ? "true"
      : "false";
    localStorage.setItem("weatherSettings", newWeatherSettings);
    console.log(weatherSettings);
  });
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
  var weather = "clear";

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

  function generateWeather() {
    // бляяя я уже сам не знаю чё делаю но TODO объединить генерацию частиц в один canvas и удалять его когда небо чисто а то я объебался и теперь не ебу как это сделать я слишком тупой и ленивый спасите как я вообще это ещё делаю
    const weatherCanvas = document.createElement("canvas");
    weatherCanvas.classList.add("weatherCanvas");

    weatherContainer.appendChild(weatherCanvas);

    return { weatherCanvas };
  }

  // Генератор слёз и боли
  function generateRain() {
    const raindrops = [];
    const rainCanvas = document.createElement("canvas");
    rainCanvas.classList.add("rainCanvas");
    const rainParticle = rainCanvas.getContext("2d");

    setInterval(() => {
      for (let i = 0; i < 12; i++) {
        const raindrop = weather === "rain" ? generateRaindrop() : null;
        if (raindrop) {
          raindrops.push(raindrop);
        }
      }
    }, 60);

    // Генерируем каплю
    function generateRaindrop() {
      if (document.hidden) {
        return;
      }
      const x = Math.random() * rainCanvas.width;
      const y = Math.random() * -100;
      const length = Math.random() * 10 + 50;
      const width = Math.random() * 1 + 1;
      const ySpeed = length * 0.2;
      const xSpeed = Math.random() * 1;

      return { x, y, length, width, ySpeed, xSpeed };
    }

    // Анимация капель
    function animateRain() {
      if (raindrops.length > 0) {
        rainParticle.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
        for (const raindrop of raindrops) {
          raindrop.y += raindrop.ySpeed;
          raindrop.x += raindrop.xSpeed;
          drawRaindrop(raindrop);
        }
      }
      requestAnimationFrame(animateRain);
    }

    // Рисуем каплю
    function drawRaindrop(raindrop) {
      rainParticle.beginPath();
      rainParticle.ellipse(
        raindrop.x,
        raindrop.y,
        raindrop.width,
        raindrop.length,
        0,
        Math.PI,
        2 * Math.PI
      );
      rainParticle.fillStyle = "rgba(150, 150, 150, 0.4)";
      rainParticle.fill();
    }

    // Добавление canvas-элемента в контейнер. пипец
    weatherContainer.appendChild(rainCanvas);

    // Запуск анимации. блять где я
    animateRain();

    return {
      rainCanvas,
      rainParticle,
      raindrops,
    };
  }
  // ====================================================================================================================

  // ====================================================================================================================
  // Генератор котопада
  function generateSnowflakes() {
    const snowflakes = [];
    const snowCanvas = document.createElement("canvas");
    snowCanvas.classList.add("snowCanvas");
    const snowParticle = snowCanvas.getContext("2d");

    // Интервал генерации новых снежинок.
    setInterval(() => {
      for (let i = 0; i < 1; i++) {
        const snowflake = weather === "snow" ? generateSnowflake() : null;
        if (snowflake) {
          snowflakes.push(snowflake);
        }
      }
    }, 100);

    // Генерируем снежинку
    function generateSnowflake() {
      if (document.hidden) {
        return;
      }
      const y = Math.random() * -100;
      const x = Math.random() * snowCanvas.width;
      const size = Math.random() * 5 + 2;
      const ySpeed = size * 0.14;
      const xSpeed = size * (Math.random() - Math.random()) * 0.02;

      return { x, y, size, ySpeed, xSpeed };
    }

    // Анимация снежинки. Типа падают вниз.
    function animateSnow() {
      if (snowflakes.length > 0) {
        snowParticle.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
        for (const snowflake of snowflakes) {
          snowflake.y += snowflake.ySpeed;
          snowflake.x += snowflake.xSpeed;
          drawSnowflake(snowParticle, snowflake.x, snowflake.y, snowflake.size);
        }
      }
      requestAnimationFrame(animateSnow);
    }

    // Функция для рисования снежинок.
    function drawSnowflake(snowParticle, x, y, size) {
      snowParticle.beginPath();
      snowParticle.ellipse(x, y, size, size, 0, 0, 2 * Math.PI);
      const color = "white";
      snowParticle.fillStyle = color;
      snowParticle.fill();
    }

    // Добавление canvas-элемента в контейнер. пипец
    weatherContainer.appendChild(snowCanvas);

    // Запуск анимации. блять где я
    animateSnow();

    // Возвращение объекта. нахуя правда.
    return {
      snowCanvas,
      snowParticle,
      snowflakes,
    };
  }
  // ====================================================================================================================
  function resizeCanvasElement(canvas) {
    canvas.width = canvas.parentNode.offsetWidth;
    canvas.height = canvas.parentNode.offsetHeight;
  }

  const { rainCanvas, rainParticle, raindrops } = generateRain();
  resizeCanvasElement(rainCanvas);

  const { snowCanvas, snowParticle, snowflakes } = generateSnowflakes();
  resizeCanvasElement(snowCanvas);

  window.addEventListener("resize", () => {
    resizeCanvasElement(rainCanvas);
    resizeCanvasElement(snowCanvas);
  });
  // ====================================================================================================================
  function checkElements(elements, container) {
    for (let i = elements.length - 1; i >= 0; i--) {
      const element = elements[i];

      if (element && element.y >= container.offsetHeight) {
        elements.splice(i, 1);
      }
    }
    // console.log(`Количество элементов: ${elements.length}`);
  }

  setInterval(() => {
    checkElements(snowflakes, weatherContainer);
    checkElements(raindrops, weatherContainer);
  }, 100);
  // ====================================================================================================================
}
// ====================================================================================================================
