// ==UserScript==
// @name         Catwar UwU
// @namespace    http://tampermonkey.net/
// @version      v1.5.2-02.24
// @description  Визуальное обновление CatWar'а.
// @author       Ibirtem / Тенёчек ( https://catwar.su/cat1477928 )
// @match        http*://*.catwar.su/*
// @updateURL    https://openuserjs.org/meta/Ibirtem/Catwar_UwU.meta.js
// @downloadURL  https://openuserjs.org/install/Ibirtem/Catwar_UwU.user.js
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
  <h2>Настройки CatWar UwU</h2>
  <hr>
    <div class="weather-toggle">
    <p>Включает/Выключает динамичную погоду в игровой. В будущем может быть будет настройка интенсивности эффектов.</p>
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
  font-size: 22px;
  margin: 0 auto;
  backdrop-filter: blur(8px) brightness(70%);
  border: 3px solid white;
  border-radius: 20px;
  padding: 15px;
}

#uwusettings h2 {
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
      }
    } else {
      weather = "clear";
    }

    console.log(weather);
  }
  setInterval(getSkyType, 2000);
  // ====================================================================================================================

  // ====================================================================================================================
  const rainContainer = document.getElementById("global-container");
  // Генератор слёз и боли
  function generateRain() {
    const raindrops = [];
    const rainCanvas = document.createElement("canvas");
    rainCanvas.classList.add("rainCanvas");
    const rainCtx = rainCanvas.getContext("2d");

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
      const speed = length * 0.2;

      return { x, y, length, width, speed };
    }

    // Анимация капель
    function animate() {
      rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);

      for (const raindrop of raindrops) {
        raindrop.y += raindrop.speed;
        drawRaindrop(raindrop);
      }

      requestAnimationFrame(animate);
    }

    // Рисуем каплю
    function drawRaindrop(raindrop) {
      rainCtx.beginPath();
      rainCtx.ellipse(
        raindrop.x,
        raindrop.y,
        raindrop.width,
        raindrop.length,
        0,
        Math.PI,
        2 * Math.PI
      );
      rainCtx.fillStyle = "rgba(150, 150, 150, 0.4)";
      rainCtx.fill();
    }

    // Добавление canvas-элемента в контейнер. пипец
    rainContainer.appendChild(rainCanvas);

    // Запуск анимации. блять где я
    animate();

    return {
      rainCanvas,
      rainCtx,
      raindrops,
    };
  }
  // ====================================================================================================================

  // ====================================================================================================================
  const snowContainer = document.getElementById("global-container");
  // Генератор котопада
  function generateSnowflakes() {
    const snowflakes = [];
    const snowCanvas = document.createElement("canvas");
    snowCanvas.classList.add("snowCanvas");
    const ctx = snowCanvas.getContext("2d");

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
      const x = Math.random() * snowCanvas.width;
      const y = Math.random() * -100;
      const size = Math.random() * 5 + 2;
      const speed = size * 0.14;

      return { x, y, size, speed };
    }

    // Анимация снежинки. Типа падают вниз.
    function animate() {
      ctx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);

      for (const snowflake of snowflakes) {
        snowflake.y += snowflake.speed;
        drawSnowflake(ctx, snowflake.x, snowflake.y, snowflake.size);
      }
      requestAnimationFrame(animate);
    }

    // Функция для рисования снежинок.
    function drawSnowflake(ctx, x, y, size) {
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      const color = "white";
      ctx.fillStyle = color;
      ctx.fill();
    }

    // Добавление canvas-элемента в контейнер. пипец
    snowContainer.appendChild(snowCanvas);

    // Запуск анимации. блять где я
    animate();

    // Возвращение объекта. нахуя правда.
    return {
      snowCanvas,
      ctx,
      snowflakes,
    };
  }
  // ====================================================================================================================
  function resizeCanvasElement(canvas) {
    canvas.width = canvas.parentNode.offsetWidth;
    canvas.height = canvas.parentNode.offsetHeight;
  }

  const { rainCanvas, rainCtx, raindrops } = generateRain();
  resizeCanvasElement(rainCanvas);

  const { snowCanvas, ctx, snowflakes } = generateSnowflakes();
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
    checkElements(snowflakes, snowContainer);
    checkElements(raindrops, rainContainer);
  }, 100);
  // ====================================================================================================================
}
// ====================================================================================================================
