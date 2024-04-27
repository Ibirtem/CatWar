// ==UserScript==
// @name         CatWar UwU
// @namespace    http://tampermonkey.net/
// @version      v1.9.0-04.24
// @description  Визуальное обновление CatWar'а.
// @author       Ibirtem / Затменная ( https://catwar.su/cat1477928 )
// @copyright    2024, Ibirtem (https://openuserjs.org/users/Ibirtem)
// @supportURL   https://catwar.su/cat1477928
// @homepageURL  https://openuserjs.org/scripts/Ibirtem/CatWar_UwU
// @match        http*://*.catwar.su/*
// @updateURL    https://github.com/Ibirtem/CatWar/raw/main/CatWar%20UwU.js
// @downloadURL  https://github.com/Ibirtem/CatWar/raw/main/CatWar%20UwU.js
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
// div'ы Настроек milky_way
const uwusettings = `
<div id="uwusettings">
  <h1>Настройки CatWar UwU</h1>
  <hr>
  <div id="button-container">
    <button id="effects-button" class="active">
      <h2>
        Природные эффекты
        <img src="https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/partly_sunny_rain.png" alt="Иконка"
          width="24" height="24" />
      </h2>
    </button>
    <button id="theme-button">
      <h2>
        Оформление
        <img src="https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/sparkles.png" alt="Иконка" width="24"
          height="24" />
      </h2>
    </button>
  </div>
  <hr>

  <div id="effects-panel">
    <p>
      Отображение динамичной погоды в Игровой, такие как дождь или снегопад.
    </p>
    <input type="checkbox" id="weather-enabled" data-setting="weatherEnabled"/>
    <label for="weather-enabled">Показывать погоду</label>

    <p>
      Отображение кнопки Расширенных настроек погоды в Игровой. Временно
      выключает натуральную генерацию погоды.
    </p>
    <input type="checkbox" id="extended-settings" data-setting="extendedSettings"/>
    <label for="extended-settings">Расширенные настройки</label>

    <p>Может очень слабо повлиять на производительность из-за возрастания количества частиц на экране.</p>
    <input type="checkbox" id="drops" data-setting="drops"/>
    <label for="drops-enabled">Эффекты приземления частиц</label>

    <p>Замена стандартных частиц на знакомые всеми пиксельные частицы.</p>
    <input type="checkbox" id="minecraft-style" data-setting="minecraftStyle"/>
    <label for="minecraft-style-enabled">Minecraft частицы</label>

    <h3>Расположение Северного Сияния</h3>
    <div id="aurora-panel">
      <input type="range" min="1" max="2" value="1" class="slider" id="aurora-pos" list="auroraStep" data-setting="auroraPos">
      <datalist id="auroraStep">
        <option value="1">Верх</option>
        <option value="2">Низ</option>
      </datalist>
      </div>
  </div>

  <div id="theme-panel">
    <p>
      Ставит фон на страницу, повторяющий фон Игровой локации, а так же
      размывает и затемняет его.
    </p>
    <input type="checkbox" id="background-repeat" data-setting="backgroundRepeat"/>
    <label for="weather-enabled">Фон страницы</label>

    <p>
      Перезаписывает повторение фона игровой на собственное изображение.
      Размытие и затемнение всё ещё работают.
    </p>
    <input type="checkbox" id="background-user" data-setting="backgroundUser"/>
    <label for="background-user-enabled">Использовать своё изображение</label>
    <input type="text" id="SettingImageURLField" placeholder="Вставьте URL изображения" data-setting="backgroundUserImageURL"/>
    <button id="SettingSaveButton1">Сохранить</button>

    <p>
      Здесь вы можете выставить собственную тему для игровой. Принимаются "HEX"
      значения, а значит поддерживается ещё и прозрачность. Будьте аккуратны и
      не забывайте выключать другие темы в других скриптах/модах. Очистите поле
      чтобы вернуться к стандартным цветам.
    </p>
    <input type="checkbox" id="user-theme" data-setting="userTheme"/>
    <label for="user-theme-enabled">Использовать свои цвета</label>
    <div id="color-picker">
      <div style="flex: 0 0 50%">
        <input type="text" id="SettingBackgroundColorField" placeholder="Вставьте HEX код" data-setting="settingBackgroundColor"/>
        <label>Цвет фона</label>
      </div>
      <div style="flex: 0 0 50%">
        <input type="text" id="SettingBlocksColorField" placeholder="Вставьте HEX код" data-setting="settingBlocksColor"/>
        <label>Основной цвет блоков</label>
      </div>
      <div style="flex: 0 0 50%">
        <input type="text" id="SettingChatColorField" placeholder="Вставьте HEX код" data-setting="settingChatColor"/>
        <label>Основной цвет чата</label>
      </div>
      <div style="flex: 0 0 50%">
        <input type="text" id="SettingTextColorField" placeholder="Вставьте HEX код" data-setting="settingTextColor"/>
        <label>Цвет текста</label>
      </div>
      <div style="flex: 0 0 50%">
        <input type="text" id="SettingLinkColorField" placeholder="Вставьте HEX код" data-setting="settingLinkColor"/>
        <label>Цвет ссылок</label>
      </div>
      <div style="flex: 0 0 50%">
        <input type="text" id="SettingAccentColorField1" placeholder="Вставьте HEX код" data-setting="settingAccentColor1"/>
        <label title="Ваше имя в чате. Строка ввода сообщения. Кнопки. Слайдер громкости.">[?] Акценты 1</label>
      </div>
      <div style="flex: 0 0 50%">
        <input type="text" id="SettingAccentColorField2" placeholder="Вставьте HEX код" data-setting="settingAccentColor2"/>
        <label title="Линии в чате и некоторых других частях. Кружочек слайдера громкости.">[?] Акценты 2</label>
      </div>
      <div style="flex: 0 0 100%">
        <button id="SettingSaveButton2">Сохранить</button>
        <p>
          Отличный сайт для выбора цветов с поддержкой прозрачности:
          https://rgbacolorpicker.com/color-wheel-picker
        </p>
      </div>
    </div>
  </div>

  <hr>
  <div id="news-panel">
    <button id="news-button">
      v1.9.0 - Больше физики! Меньше фпс! А ещё с 2'мя тысячами строков кода меня!
    </button>
    <div id="news-list" style="display: none">
      <h3>Главное</h3>
      <p>
        — Добавлена физика приземления частиц и Светлячки! Последнее вы увидите только когда наступит Лето в Игровой... Ну или добро пожаловать в Расширенные настройки!
      </p>
      <hr>
      <h3>Внешний вид</h3>
      <p>— Возможность менять расположение Северного Сияния!</p>
      <p>— А ещё Сияние теперь плавно появляется и исчезает!</p>
      <p>— Снова чуть-чуть редизайна кнопочек в настойках.</p>
      <hr>
      <h3>Изменения кода</h3>
      <p>— Снова мнимая оптимизация, которая сто раз потерялась.</p>
      <p>— sus...?</p>
      <p>— Подписал блоки кода для приятно и удобного чтения.</p>
      <hr>
      <p>Дата выпуска: 27.04.24</p>
    </div>
  </div>
</div>
`;

// div'ы Игровой
const extendedSettingsButton = `
<div>
  <button type="button" id="extended-settings-button">
    <img src="https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/partly_sunny_rain.png" alt="Иконка"
      width="36" height="36">
  </button>

  <div id="extended-settings-container">
    <div id="extended-settings-panel">
      <p>Изменения, сделанные в этой панели, носят временный характер и не сохраняются.</p>
      <h3>Переключить погоду</h3>
      <input type="range" min="1" max="3" value="1" class="slider" id="manualWeather" list="WeatherStep">
      <datalist id="WeatherStep">
        <img src="https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/sunny.png" width="36" height="36" option
          value="1"></option>
        <img src="https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/rain_cloud.png" width="36" height="36"
          option value="2"></option>
        <img src="https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/snow_cloud.png" width="36" height="36"
          option value="3"></option>
      </datalist>
      <div id="temperature-container">
        <p id="temperature"
          title="На это умножается скорость частиц и делится их размер. В будущем будет возможность сохранять и изменять это значение под свой вкус.">
          [?] Текущий модификатор: ...уточнение...</p>
      </div>

      <h3>Северное Сияние</h3>
      <div class="button-container-1">
        <button type="button" id="manualAurora_Off">
          <img src="https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/icons8-nothern-lights-96.png"
            alt="Иконка" width="48" height="48">
        </button>
        <button type="button" id="manualAurora_B">
          <img src="https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/icons8-nothern-lights-96_blue.png"
            alt="Иконка" width="48" height="48">
        </button>
        <button type="button" id="manualAurora_G">
          <img src="https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/icons8-nothern-lights-96_green.png"
            alt="Иконка" width="48" height="48">
        </button>
      </div>

      <h3>Светлячки</h3>
      <div class="button-container-2">
        <button type="button" id="manualFirefly_On">
          <img src="https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/firefly.png"
            alt="Иконка" width="48" height="48" title="Включает/Выключает">
        </button>
      </div>
      
    </div>
    <div id="aurora-settings-panel">
      <p>Изменения, сделанные в этой панели, сохранятся!</p>
      <h5>Здесь будет возможность переместить Северное Сияние в реальном времени, исключать локации из генерации погоды, либо запрещать
        определённой погоде существовать на выбранной локации. Но это всё пока что лишь мечта...</h5>
    </div>
  </div>
</div>
`;

// ====================================================================================================================

// ====================================================================================================================
// Стили. Наверно. Не проверяйте пожалуйста, я тут потерялся.
// Glassmorphism вперёд Glassmorphism вперёд Glassmorphism вперёд Glassmorphism вперёд Glassmorphism вперёд Glassmorphism вперёд Glassmorphism вперёд Glassmorphism вперёд Glassmorphism вперёд Glassmorphism вперёд Glassmorphism вперёд
// TODO - Унифицировать шрифты, цвета текстов, прозрачность, закруглённость штучек ну кароче всё как надо чтобы не сделать в итоге лабиринт.
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
  backdrop-filter: blur(16px);
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
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
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

#uwusettings input[type="checkbox"]:checked {
  background-color: #90ff78a8;
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
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: background-color 0.2s ease-in-out, left 0.2s ease-in-out;
}

#uwusettings input[type="checkbox"]:checked:before {
  left: calc(100% - 4px);
}

#uwusettings input[type="text"] {
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 10px;
  outline: none;
  margin-right: 10px;
}

.rounded-image {
  background-repeat: repeat;
  background-attachment: fixed;
  border-radius: 20px;
}

#button-container-1 {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}

#button-container button {
  background-color: transparent;
  border: none;

  color: #ffffff57;

  padding: 10px 20px;
  cursor: pointer;
  transition: box-shadow 0.4s ease;
}

#button-container button.active {
  box-shadow: inset 0 -2px 0 0 #ffffff4d;
  transition: box-shadow 0.4s ease;
}

#button-container button.active h2 {
  color: #ffffff;
  transition: color 0.4s ease;
}

#SettingSaveButton1, #SettingSaveButton2 {
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#SettingSaveButton1:hover,
#SettingSaveButton2:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

#color-picker {
  display: flex;
  flex-wrap: wrap;
}

#aurora-panel {
  width: 100px;
}

#color-picker div {
  margin-bottom: 10px;
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
  position: fixed;
}

#extended-settings-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  backdrop-filter: blur(16px);
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
  cursor: pointer;

  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
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
  backdrop-filter: blur(16px);
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

  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);

  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
}

#color-picker {
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);

  margin-top: 10px;
  padding: 15px;
  border-radius: 10px;
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

#manualWeather, #aurora-pos {
  width: 100%;
  cursor: pointer;
  -webkit-appearance: none;
  background-color: rgba(255, 255, 255, 0.06) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
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
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transform: translateY(-35%);
}

#aurora-pos::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
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
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
}

#extended-settings-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.4);
}

#WeatherStep, #auroraStep {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

#button-container {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}

.button-container-1 {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.button-container-2 {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}

#manualAurora_Off,
#manualAurora_B,
#manualAurora_G, 
#manualFirefly_Off,
#manualFirefly_On {
  width: 60px;
  height: 60px;
  cursor: pointer;
  border-radius: 50%;

  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

#extended-settings-button:hover,
#manualAurora_Off:hover,
#manualAurora_B:hover,
#manualAurora_G:hover, 
#manualFirefly_Off:hover,
#manualFirefly_On:hover {
  background-color: rgba(255, 255, 255, 0.15);
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
  left: 0;
  width: 100%;
  height: 30%;
  filter: blur(4rem);

  animation: aurora-spin 15s linear infinite;
}

.aurora-Blue {
  background: conic-gradient(from var(--gradient-angle),
      var(--nlB-1),
      var(--nlB-2),
      var(--nlB-3),
      var(--nlB-2),
      var(--nlB-1));
}

.aurora-Green {
  background: conic-gradient(from var(--gradient-angle),
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

@keyframes auroraFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes auroraFadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

.firefly {
  position: fixed;
  background-color: rgba(255, 255, 153, 1);
  border-radius: 50%;
  filter: blur(5px);
  pointer-events: none; 

  animation: fadeIn 6s ease-in-out;
}

.firefly-glow {
  position: fixed;
  background-color: rgba(255, 255, 153, 0.2);
  border-radius: 50%;
  filter: blur(40px); 
  pointer-events: none; 

  animation: fadeIn 6s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

.firefly-disappearing {
  animation: fadeOut 6s ease-in-out forwards; /* Добавляем анимацию исчезновения */
}

`;
GM_addStyle(css);
// ====================================================================================================================
//   . . . DEFAULT НАСТРОЙКИ . . .
// ====================================================================================================================
let settings = {
  weatherEnabled: false,
  extendedSettings: false,
  minecraftStyle: false,
  backgroundRepeat: false,
  backgroundUser: false,
  userTheme: false,
  drops: false,
  auroraPos: "1",
  backgroundUserImageURL: "",
  settingBackgroundColor: "",
  settingBlocksColor: "",
  settingChatColor: "",
  settingTextColor: "",
  settingLinkColor: "",
  settingAccentColor1: "",
  settingAccentColor2: "",
};
// ====================================================================================================================
//  . . . ПАНЕЛЬ НАСТРОЕК . . .
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

if (targetSettings.test(window.location.href)) {
  createSettingsBlock("uwu-settings", uwusettings);

  function loadSettings() {
    const storedSettings = localStorage.getItem("uwu-settings");
    if (storedSettings && typeof storedSettings === "string") {
      const loadedSettings = JSON.parse(storedSettings);
      settings = { ...settings, ...loadedSettings };
    } else {
      console.log("Нет сохраненных настроек");
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem("uwu-settings", JSON.stringify(settings));
      // console.log("Настройки сохранены:", settings);
    } catch (error) {
      console.error("Не удалось сохранить настройки:", error);
    }
  }

  loadSettings();

  // Обновление элементов ввода после загрузки настроек
  document
    .querySelectorAll("#uwusettings [data-setting]")
    .forEach((element) => {
      const setting = element.dataset.setting;
      if (element.type === "checkbox") {
        element.checked = settings[setting];
      } else {
        element.value = settings[setting];
      }
    });

  document
    .querySelectorAll("#uwusettings [data-setting]")
    .forEach((element) => {
      const setting = element.dataset.setting;
      element.addEventListener("change", () => {
        if (element.type === "checkbox") {
          settings[setting] = element.checked;
        } else {
          settings[setting] = element.value;
        }
        saveSettings();
      });
    });
}

// Переключение вкладок
if (targetSettings.test(window.location.href)) {
  const effectsPanel = document.getElementById("effects-panel");
  const themePanel = document.getElementById("theme-panel");
  const effectsButton = document.getElementById("effects-button");
  const themeButton = document.getElementById("theme-button");

  effectsButton.addEventListener("click", () => {
    effectsPanel.style.display = "block";
    themePanel.style.display = "none";
    effectsButton.classList.add("active");
    themeButton.classList.remove("active");
  });

  themeButton.addEventListener("click", () => {
    effectsPanel.style.display = "none";
    themePanel.style.display = "block";
    effectsButton.classList.remove("active");
    themeButton.classList.add("active");
  });
  // Скрытие одной из панелей по умолчанию
  themePanel.style.display = "none";
}
// ====================================================================================================================
//  . . . ЗАГРУЗКА КОДА В ИГРОВОЙ . . .
// ====================================================================================================================
// Игровая ли... Я чё знаю?
if (window.location.href === targetCW3) {
  const containerElement = document.querySelector("body");
  const globalContainerElement = document.createElement("div");
  globalContainerElement.id = "global-container";
  containerElement.appendChild(globalContainerElement);

  function loadSettings() {
    const storedSettings = localStorage.getItem("uwu-settings");
    if (storedSettings) {
      const loadedSettings = JSON.parse(storedSettings);
      for (const key in loadedSettings) {
        if (loadedSettings.hasOwnProperty(key)) {
          settings[key] = loadedSettings[key];
        }
      }
    } else {
      console.log("Нет сохраненных настроек");
    }
  }
  loadSettings();

  // ====================================================================================================================
  //  . . . РАСШИРЕННЫЕ НАСТРОЙКИ . . .
  // ====================================================================================================================
  if (settings.extendedSettings) {
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

    const fireflyOnButton = document.getElementById("manualFirefly_On");

    manualAuroraOffButton.addEventListener("click", () => {
      for (const auroraElement of auroras) {
        removeAurora(auroraElement);
      }
    });

    manualAuroraBButton.addEventListener("click", () => {
      createAurora("blue");
    });

    manualAuroraGButton.addEventListener("click", () => {
      createAurora("green");
    });

    fireflyOnButton.addEventListener("click", () => {
      toggleFireflies();
    });
  }
  // ====================================================================================================================
  //   . . . ПОЛЬЗОВАТЕЛЬКИЙ ФОН . . .
  // ====================================================================================================================
  if (settings.backgroundRepeat) {
    const cagesDiv = document.querySelector("#cages_div");

    const backgroundDiv = document.createElement("div");
    backgroundDiv.style.position = "fixed";
    backgroundDiv.style.top = "-1%";
    backgroundDiv.style.left = "-1%";
    backgroundDiv.style.width = "102%";
    backgroundDiv.style.height = "102%";
    backgroundDiv.style.zIndex = "-1";
    backgroundDiv.style.filter = "blur(16px)";
    backgroundDiv.style.overflow = "hidden";
    backgroundDiv.style.backgroundBlendMode = "overlay";
    backgroundDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

    function getBackgroundImageUrl() {
      if (settings.backgroundUser) {
        return settings.backgroundUserImageURL;
      } else {
        const backgroundImageStyle =
          window.getComputedStyle(cagesDiv).backgroundImage;
        const url = backgroundImageStyle.match(/url\("?(.+?)"?\)/);
        return url ? url[1] : null;
      }
    }

    function updateBackgroundImage() {
      const backgroundImageUrl = getBackgroundImageUrl();

      if (backgroundImageUrl) {
        backgroundDiv.style.backgroundImage = `url(${backgroundImageUrl})`;
        backgroundDiv.style.backgroundSize = "cover";
        backgroundDiv.style.backgroundPosition = "center";
        backgroundDiv.style.backgroundRepeat = "no-repeat";
      } else {
        backgroundDiv.style.backgroundImage = "none";
      }
    }

    updateBackgroundImage();
    globalContainerElement.appendChild(backgroundDiv);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "style"
        ) {
          updateBackgroundImage();
        }
      });
    });

    observer.observe(cagesDiv, {
      attributes: true,
      attributeFilter: ["style"],
    });
  }
  // ====================================================================================================================
  //   . . . ПОЛЬЗОВАТЕЛЬСКИЕ ТЕМЫ / ЦВЕТА . . .
  // ====================================================================================================================
  if (settings.userTheme) {
    const newStyle = document.createElement("style");
    newStyle.innerHTML = `
      body {
        background: ${settings.settingBackgroundColor};
      }

      #tr_actions, #tr_actions > td, #tr_mouth, #tr_mouth > td, #info_main, #info_main > tbody > tr > td, #location, .small {
        background-color: ${settings.settingBlocksColor};
      }
    
      #tr_chat {
        background-color: ${settings.settingChatColor};
      }
    
      body, input, select, .ui-slider-handle {
        color: ${settings.settingTextColor};
      }
    
      input, select, .ui-slider-horizontal {
        background-color: ${settings.settingAccentColor1};
        background: ${settings.settingAccentColor1};
        border: solid 1px ${settings.settingAccentColor2};
      }

      .ui-widget-content .ui-state-default {
        background: ${settings.settingAccentColor2};
        border: solid 1px ${settings.settingAccentColor2};
      } 

      hr {
        border: solid 1px ${settings.settingAccentColor2};
      }

      .myname {
        color: ${settings.settingAccentColor1};
      }

      span.cat_tooltip {
        background: ${settings.settingChatColor} !important;
        color: ${settings.settingTextColor} !important;
        border: 2px solid ${settings.settingAccentColor2} !important;
      } 

      span.cat_tooltip>span.online {
        filter: brightness(200%) contrast(80%); 
      }
      
      .cat:hover .cat_tooltip a, .other_cats_list > a { 
        color: ${settings.settingLinkColor}; 
      }

      .move_name {
        color: ${settings.settingTextColor};
        background-color: ${settings.settingBlocksColor} !important;
      }
    
      a, a:hover {
        color: ${settings.settingLinkColor};
      }

      #fightPanel {
        color: black;
      }
    `;

    document.head.appendChild(newStyle);
  }
  // ====================================================================================================================
  //   . . . ОПРЕДЕЛЕНИЕ ПОГОДЫ В ИГРОВОЙ . . .
  // ====================================================================================================================
  var currentWeather = "null";
  var currentHour = "null";
  var currentSeason = "null";
  var currentTemperature = "null";
  var temperatureDescription = "null";
  // ахахаха глянье на этих незнающих
  var weatherModifier = 1;

  if (settings.extendedSettings) {
    const manualWeatherSlider = document.getElementById("manualWeather");

    manualWeatherSlider.addEventListener("change", () => {
      const selectedWeather = manualWeatherSlider.value;

      if (selectedWeather === "1") {
        currentWeather = "clear";
      } else if (selectedWeather === "2") {
        if (settings.minecraftStyle) {
          currentWeather = "pixelRain";
        } else {
          currentWeather = "rain";
        }
      } else if (selectedWeather === "3") {
        if (settings.minecraftStyle) {
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

    if (settings.weatherEnabled) {
      const match = skyStyle.match(/\/(\d+)\.png/);
      if (match) {
        const skyNumber = parseInt(match[1]);

        switch (skyNumber) {
          case 2:
          case 4:
            if (settings.minecraftStyle) {
              currentWeather = "pixelRain";
            } else {
              currentWeather = "rain";
            }
            break;
          case 7:
          case 8:
            if (settings.minecraftStyle) {
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
      } else {
        console.log("Потерял небо, небо найдись пж...");
        currentWeather = "unknown";
      }
    }
  }

  function getTime() {
    const timeElement = document.querySelector("#hour");
    const hourTime = timeElement.querySelector("img").getAttribute("src");

    if (settings.weatherEnabled) {
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
        { start: 200, end: 202, temperature: -3, description: "Очень холодно" },
        { start: 203, end: 206.5, temperature: -2, description: "Холодно" },
        { start: 206.6, end: 210, temperature: -1, description: "Прохладно" },
        { start: 21, end: 31, temperature: 1, description: "Тепло" },
        { start: 10, end: 18, temperature: 2, description: "Жарковато" },
        { start: 1, end: 9, temperature: 3, description: "Жарко" },
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
        currentTemperature = 1;
        temperatureDescription =
          "Неизвестная температура. Разработчик скорее всего уже в курсе и в скором времени выпустит правку.";
      }

      switch (currentTemperature) {
        case 1:
        case -1:
          weatherModifier = 2;
          break;
        case 2:
        case -2:
          weatherModifier = 1.5;
          break;
        case 3:
        case -3:
          weatherModifier = 1;
          break;
        default:
          weatherModifier = 1;
      }

      const temperatureDisplayElement = document.getElementById("temperature");
      if (temperatureDisplayElement) {
        temperatureDisplayElement.innerHTML = `[?] Текущий модификатор: ${weatherModifier} (${temperatureDescription})`;
      }
    } else {
      console.log("...я потерял бекграунд...");
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

  // ====================================================================================================================
  // TODO - Опробовать снова ивентЛисенеры.
  if (!settings.extendedSettings) {
    setInterval(() => {
      getSkyType();
      getTime();
      getSeason();
    }, 4000);
  }
  setInterval(getTemperature, 4000);
  // ====================================================================================================================
  //   . . . ПОДГОТОВКА КОНТЕЙНЕРОВ / ИЗОБРАЖЕНИЙ . . .
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
    pixelSplash: [
      {
        url: "https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/splash_0.png",
      },
      {
        url: "https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/splash_1.png",
      },
    ],
    sus: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/xwx-823ac.appspot.com/o/images%2Ftiny-red-among-us.png?alt=media&token=354b34c6-6297-4a4d-8a73-f36a903170c0",
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
  loadImages("pixelSplash");
  loadImages("sus");

  const { raindrops } = generateRain();
  const { snowflakes } = generateSnowflakes();
  const { pixelRaindrops } = generatePixelRain();
  const { pixelSnowflakes } = generatePixelSnow();
  // ====================================================================================================================
  //   . . . ДОЖДЬ . . .
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
  //   . . . СНЕГ . . .
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
      const opacity = 1;

      return { x, y, size, ySpeed, xSpeed, opacity };
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
  //   . . . ПИКСЕЛЬНЫЙ ДОЖДЬ . . .
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
  //   . . . ПИКСЕЛЬНЫЙ СНЕГ . . .
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
      const opacity = 1;

      return { x, y, size, ySpeed, xSpeed, image, opacity };
    }

    return { pixelSnowflakes };
  }

  function drawPixelSnowflake(x, y, size, image) {
    weatherCtx.drawImage(image, x - size / 2, y - size / 2, size, size);
  }
  // ====================================================================================================================
  //   . . . АНИМАЦИЯ ПОГОДЫ / ЧАСТИЦ . . .
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
  if (settings.weatherEnabled || settings.extendedSettings) {
    animateWeather();
  }
  // ====================================================================================================================
  //   . . . СЕВЕРНОЕ СИЯНИЕ . . .
  // ====================================================================================================================
  const auroras = [];
  const auroraColors = {
    green: "aurora-Green",
    blue: "aurora-Blue",
  };

  function removeAurora(auroraElement) {
    auroraElement.style.animation = "auroraFadeOut 6s ease-in-out";

    // Удаляем северное сияние после завершения анимации
    setTimeout(() => {
      weatherContainer.removeChild(auroraElement);
      const index = auroras.indexOf(auroraElement);
      if (index > -1) {
        auroras.splice(index, 1);
      }
    }, 6000);
  }

  function createAurora(color) {
    // Удаляем все предыдущие северные сияния
    for (const auroraElement of auroras) {
      removeAurora(auroraElement);
    }

    // Создаем новое северное сияние
    const newAurora = document.createElement("div");
    newAurora.classList.add(auroraColors[color]);

    // Устанавливаем позицию
    if (settings.auroraPos === "1") {
      newAurora.style.top = "-30%";
    } else if (settings.auroraPos === "2") {
      newAurora.style.bottom = "0";
    }

    // Добавляем новый элемент в DOM и массив
    weatherContainer.appendChild(newAurora);
    auroras.push(newAurora);

    newAurora.style.animation = "auroraFadeIn 6s ease-in-out";
  }

  function toggleAurora() {
    if (!settings.extendedSettings) {
      if (
        (currentWeather === "clear" &&
          currentHour === "night" &&
          (currentSeason === "autumn" || currentSeason === "winter")) ||
        currentWeather === "northernLights"
      ) {
        if (auroras.length === 0) {
          // Проверяем, нет ли уже северного сияния
          const randomNumber = Math.random();
          if (randomNumber > 0.5) {
            createAurora("green");
          } else {
            createAurora("blue");
          }
        }
      } else {
        // Удаляем все северные сияния
        for (const auroraElement of auroras) {
          removeAurora(auroraElement);
        }
      }
    }
  }

  setInterval(() => {
    toggleAurora();
    if (!settings.extendedSettings) {
      generateFirefliesNaturally();
    }
  }, 2000);
  // ====================================================================================================================
  //   . . . СВЕТЛЯЧКИ . . .
  // ====================================================================================================================
  const fireflies = [];
  const glowSizeMultiplier = 12;
  const desiredNumberOfFireflies = 10;

  function generateFirefly() {
    const x = Math.random() * weatherCanvas.width;
    const y = Math.random() * weatherCanvas.height;
    const size = Math.random() * 5 + 10;
    const xSpeed = (Math.random() - 0.5) * 0.5;
    const ySpeed = (Math.random() - 0.5) * 0.5;

    const firefly = document.createElement("div");
    firefly.className = "firefly";
    firefly.style.left = x + "px";
    firefly.style.top = y + "px";
    firefly.style.width = size + "px";
    firefly.style.height = size + "px";

    const glow = document.createElement("div");
    glow.className = "firefly-glow";
    glow.style.left = x + "px";
    glow.style.top = y + "px";
    glow.style.width = size * glowSizeMultiplier + "px";
    glow.style.height = size * glowSizeMultiplier + "px";

    return { element: firefly, glowElement: glow, x, y, size, xSpeed, ySpeed };
  }

  function createNewFirefliesIfNeeded() {
    const missingFireflies = desiredNumberOfFireflies - fireflies.length;

    for (let i = 0; i < missingFireflies; i++) {
      const newFirefly = generateFirefly();
      fireflies.push(newFirefly);
      weatherContainer.appendChild(newFirefly.element);
      weatherContainer.appendChild(newFirefly.glowElement);
    }
  }

  function removeFireflies() {
    for (const firefly of fireflies) {
      weatherContainer.removeChild(firefly.element);
      weatherContainer.removeChild(firefly.glowElement);
    }
    fireflies.length = 0;
  }

  function toggleFireflies() {
    if (settings.extendedSettings) {
      if (fireflies.length === 0) {
        for (let i = 0; i < desiredNumberOfFireflies; i++) {
          fireflies.push(generateFirefly());
          weatherContainer.appendChild(fireflies[i].element);
          weatherContainer.appendChild(fireflies[i].glowElement);
        }
      } else {
        for (const firefly of fireflies) {
          firefly.element.classList.add("firefly-disappearing");
          firefly.glowElement.classList.add("firefly-disappearing");
        }
        setTimeout(() => {
          removeFireflies();
        }, 6000);
      }
    }
  }

  function generateFirefliesNaturally() {
    if (
      currentWeather === "clear" &&
      currentHour === "night" &&
      currentSeason === "summer"
    ) {
      if (fireflies.length === 0) {
        for (let i = 0; i < desiredNumberOfFireflies; i++) {
          fireflies.push(generateFirefly());
          weatherContainer.appendChild(fireflies[i].element);
          weatherContainer.appendChild(fireflies[i].glowElement);
        }
      }
    } else {
      for (const firefly of fireflies) {
        firefly.element.classList.add("firefly-disappearing");
        firefly.glowElement.classList.add("firefly-disappearing");
      }
      setTimeout(() => {
        removeFireflies();
      }, 6000);
    }
  }

  function animateFireflies() {
    for (let i = fireflies.length - 1; i >= 0; i--) {
      const firefly = fireflies[i];
      firefly.x += firefly.xSpeed;
      firefly.y += firefly.ySpeed;

      // Проверяем столкновение с краями экрана
      if (firefly.x < 0 || firefly.x + firefly.size > weatherCanvas.width) {
        firefly.xSpeed *= -1;
      }
      if (firefly.y < 0 || firefly.y + firefly.size > weatherCanvas.height) {
        firefly.ySpeed *= -1;
      }

      firefly.element.style.left = firefly.x + "px";
      firefly.element.style.top = firefly.y + "px";

      firefly.glowElement.style.left =
        firefly.x - (firefly.size * glowSizeMultiplier) / 2 + "px";
      firefly.glowElement.style.top =
        firefly.y - (firefly.size * glowSizeMultiplier) / 2 + "px";

      createNewFirefliesIfNeeded();
    }

    requestAnimationFrame(animateFireflies);
  }

  if (settings.weatherEnabled || settings.extendedSettings) {
    animateFireflies();
  }
  // ====================================================================================================================
  //   . . . ПРИЗЕМЛЕНИЕ ЧАСТИЦ . . .
  // ====================================================================================================================
  const landedSnowflakes = [];
  const landedPixelSnowflakes = [];
  const splashes = [];
  const pixelSplashes = [];

  switch (true) {
    case settings.extendedSettings && !settings.drops:
    case settings.weatherEnabled && !settings.drops:
      setInterval(() => {
        checkElements(raindrops, weatherContainer);
        checkElements(snowflakes, weatherContainer);
        checkElements(pixelSnowflakes, weatherContainer);
        checkElements(pixelRaindrops, weatherContainer);
      }, 120);
      break;

    case settings.extendedSettings && settings.drops:
    case settings.weatherEnabled && settings.drops:
      animateLanding();
      break;

    default:
      break;
  }

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

  function animateLanding() {
    // Приземление снега
    for (let i = snowflakes.length - 1; i >= 0; i--) {
      const snowflake = snowflakes[i];
      if (snowflake.y >= weatherCanvas.height - snowflake.size) {
        snowflakes.splice(i, 1);
        landedSnowflakes.push(snowflake);
      }
    }
    for (let i = pixelSnowflakes.length - 1; i >= 0; i--) {
      const pixelSnowflake = pixelSnowflakes[i];
      if (pixelSnowflake.y >= weatherCanvas.height - pixelSnowflake.size) {
        pixelSnowflakes.splice(i, 1);
        landedPixelSnowflakes.push(pixelSnowflake);
      }
    }
    // Анимация угасания снега
    for (let i = landedSnowflakes.length - 1; i >= 0; i--) {
      const snowflake = landedSnowflakes[i];
      snowflake.opacity -= 0.001;
      if (snowflake.opacity <= 0) {
        landedSnowflakes.splice(i, 1);
      }
    }
    for (const snowflake of landedSnowflakes) {
      weatherCtx.globalAlpha = snowflake.opacity;
      drawSnowflake(snowflake.x, snowflake.y, snowflake.size);
    }

    for (let i = landedPixelSnowflakes.length - 1; i >= 0; i--) {
      const pixelSnowflake = landedPixelSnowflakes[i];
      pixelSnowflake.opacity -= 0.001;

      if (pixelSnowflake.opacity <= 0) {
        landedPixelSnowflakes.splice(i, 1);
      }
    }
    for (const pixelSnowflake of landedPixelSnowflakes) {
      weatherCtx.globalAlpha = pixelSnowflake.opacity;
      drawPixelSnowflake(
        pixelSnowflake.x,
        pixelSnowflake.y,
        pixelSnowflake.size,
        pixelSnowflake.image
      );
    }

    // Приземление капель
    for (let i = raindrops.length - 1; i >= 0; i--) {
      const raindrop = raindrops[i];
      if (raindrop.y >= weatherCanvas.height - raindrop.length) {
        raindrops.splice(i, 1);
        splashes.push(generateSplash(raindrop.x, weatherCanvas.height));
      }
    }

    for (let i = pixelRaindrops.length - 1; i >= 0; i--) {
      const pixelRaindrop = pixelRaindrops[i];
      if (pixelRaindrop.y >= weatherCanvas.height - pixelRaindrop.size) {
        pixelRaindrops.splice(i, 1);
        pixelSplashes.push(
          generateSplash(pixelRaindrop.x, weatherCanvas.height - 24)
        );
      }
    }

    // Анимация обычных брызг
    for (const splash of splashes) {
      splash.x += splash.xSpeed;
      splash.y += splash.ySpeed;
      splash.ySpeed += 0.1;

      weatherCtx.beginPath();
      weatherCtx.arc(splash.x, splash.y, splash.size / 2, 0, Math.PI * 2);
      weatherCtx.fillStyle = "rgba(150, 150, 150, 0.4)";
      weatherCtx.fill();
    }

    // Анимация пиксельных брызг
    for (const pixelSplash of pixelSplashes) {
      pixelSplash.x += pixelSplash.xSpeed;
      pixelSplash.y += pixelSplash.ySpeed;
      pixelSplash.ySpeed += 0.1;
      weatherCtx.drawImage(
        pixelSplash.image,
        pixelSplash.x,
        pixelSplash.y,
        pixelSplash.size * weatherModifier * 3,
        pixelSplash.size * weatherModifier * 3
      );
    }

    checkSplashes();
    checkPixelSplashes();
    weatherCtx.globalAlpha = 1;
    requestAnimationFrame(animateLanding);
    // console.log(`Количество сплешев: ${pixelSplashes.length}`)
  }

  function generateSplash(x, y) {
    const size = Math.random() * 5 + 2;
    const xSpeed = (Math.random() - 0.5) * 2;
    const ySpeed = -Math.random() * 2 - 1;
    const imageData =
      images.pixelSplash[Math.floor(Math.random() * images.pixelSplash.length)];
    const image = imageData.image;

    return { x, y, size, xSpeed, ySpeed, image };
  }

  function checkSplashes() {
    for (let i = splashes.length - 1; i >= 0; i--) {
      const splash = splashes[i];
      if (
        splash.y >= weatherCanvas.height ||
        splash.x >= weatherCanvas.width ||
        splash.x <= 0
      ) {
        splashes.splice(i, 1);
      }
    }
  }
  function checkPixelSplashes() {
    for (let i = pixelSplashes.length - 1; i >= 0; i--) {
      const pixelSplash = pixelSplashes[i];
      if (
        pixelSplash.y >= weatherCanvas.height ||
        pixelSplash.x >= weatherCanvas.width ||
        pixelSplash.x <= 0
      ) {
        pixelSplashes.splice(i, 1);
      }
    }
  }
  // ====================================================================================================================
}
// ====================================================================================================================

// console.log('⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣤⣤⣤⣤⣤⣤⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀ ')
// console.log('⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⡿⠛⠉⠙⠛⠛⠛⠛⠻⢿⣿⣷⣤⡀⠀⠀⠀⠀⠀ ')
// console.log('⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⠋⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⠀⠈⢻⣿⣿⡄⠀⠀⠀⠀ ')
// console.log('⠀⠀⠀⠀⠀⠀⠀⣸⣿⡏⠀⠀⠀⣠⣶⣾⣿⣿⣿⠿⠿⠿⢿⣿⣿⣿⣄⠀⠀⠀ ')
// console.log('⠀⠀⠀⠀⠀⠀⠀⣿⣿⠁⠀⠀⢰⣿⣿⣯⠁⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⢿⣷⡄⠀ ')
// console.log('⠀⠀⣀⣤⣴⣶⣶⣿⡟⠀⠀⢸⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣷⠀ ')
// console.log('⠀⢰⣿⡟⠋⠉⣹⣿⡇⠀⠀⠘⣿⣿⣿⣿⣷⣦⣤⣤⣤⣶⣶⣶⣶⣿⣿⣿⠀ ')
// console.log('⠀⢸⣿⡇⠀⠀⣿⣿⡇⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠀ ')
// console.log('⠀⣸⣿⡇⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠉⠻⠿⣿⣿⣿⣿⡿⠿⠿⠛⢻⣿⡇⠀⠀ ')
// console.log('⠀⣿⣿⠁⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣧⠀⠀ ')
// console.log('⠀⣿⣿⠀⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⠀⠀ ')
// console.log('⠀⣿⣿⠀⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⠀⠀ ')
// console.log('⠀⢿⣿⡆⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⡇⠀⠀ ')
// console.log('⠀⠸⣿⣧⡀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠃⠀⠀ ')
// console.log('⠀⠀⠛⢿⣿⣿⣿⣿⣇⠀⠀⠀⠀⣰⣿⣿⣷⣶⣶⣶⣶⠶⠀⠀⢠⣿⣿⠀⠀⠀ ')
// console.log('⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⣿⣿⡇⠀⣽⣿⡏⠁⠀⠀⠀⢸⣿⡇⠀⠀⠀ ')
// console.log('⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⣿⣿⡇⠀⢹⣿⡆⠀⠀⠀⠀⣸⣿⠇⠀⠀⠀ ')
// console.log('⠀⠀⠀⠀⠀⠀⠀⢿⣿⣦⣄⣀⣠⣴⣿⣿⠁⠀⠈⠻⣿⣿⣿⣿⡿⠏⠀⠀⠀⠀ ')
// console.log('⠀⠀⠀⠀⠀⠀⠀⠈⠛⠻⠿⠿⠿⠿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀')
