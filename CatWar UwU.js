// ==UserScript==
// @name         CatWar UwU
// @namespace    http://tampermonkey.net/
// @version      v1.11.0-05.24
// @description  Визуальное обновление CatWar'а, и не только...
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
    <button id="modules-button">
      <h2>
        Моды/Скрипты
        <img src="https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/construction.png" alt="Иконка" width="24"
          height="24" />
      </h2>
    </button>
  </div>
  <hr>

  <div id="effects-panel">
    <div>
      <p>
        Отображение динамичной погоды в Игровой, такие как дождь или снегопад.
      </p>
      <input type="checkbox" id="weather-enabled" data-setting="weatherEnabled" />
      <label for="weather-enabled">Показывать погоду</label>
    </div>

    <div>
      <p>
        Отображение кнопки Расширенных настроек погоды в Игровой. Временно
        выключает натуральную генерацию погоды.
      </p>
      <input type="checkbox" id="extended-settings" data-setting="extendedSettings" />
      <label for="extended-settings">Расширенные настройки</label>
    </div>

    <div>
      <p>Может очень слабо повлиять на производительность из-за возрастания количества частиц на экране.</p>
      <input type="checkbox" id="weather-drops" data-setting="weatherDrops" />
      <label for="weather-drops">Эффекты приземления частиц</label>
    </div>

    <div>
      <p>Замена стандартных частиц на знакомые всеми пиксельные частицы.</p>
      <input type="checkbox" id="minecraft-style" data-setting="minecraftStyle" />
      <label for="minecraft-style-enabled">Minecraft частицы</label>
    </div>

    <hr>
    <h3>Расположение Северного Сияния</h3>
    <div id="aurora-panel">
      <input type="range" min="1" max="2" value="1" class="slider" id="aurora-pos" list="auroraStep"
        data-setting="auroraPos">
      <datalist id="auroraStep">
        <option value="1">Верх</option>
        <option value="2">Низ</option>
      </datalist>
    </div>
  </div>

  <div id="theme-panel">
    <div>
      <p>
        Ставит на страницу фон, повторяющий фон Игровой локации, а так же
        размывает и затемняет его.
      </p>
      <input type="checkbox" id="background-repeat" data-setting="backgroundRepeat" />
      <label for="weather-enabled">Фон страницы из локации</label>
    </div>

    <div>
      <p>Ставит на страницу фон по ссылке.</p>
      <input type="checkbox" id="background-user" data-setting="backgroundUser" />
      <label for="background-user-enabled">Свой фон страницы.</label>
      <input type="text" id="SettingImageURLField" placeholder="Вставьте URL" data-setting="backgroundUserImageURL" />
      <button id="SettingSaveButton1">Сохранить</button>
    </div>

    <hr>
    <p>
      Здесь вы можете выставить собственную тему для игровой. Принимаются "HEX"
      значения, а значит поддерживается ещё и прозрачность. Будьте аккуратны и
      не забывайте выключать другие темы в других скриптах/модах. Очистите поле
      чтобы вернуться к стандартным цветам.
    </p>
    <input type="checkbox" id="user-theme" data-setting="userTheme" />
    <label for="user-theme-enabled">Использовать свои цвета</label>
    <div id="color-picker">
      <div id="color-picker-input">
        <input type="text" id="SettingBackgroundColorField" placeholder="Вставьте HEX код"
          data-setting="settingBackgroundColor" />
        <label>Цвет фона</label>
      </div>
      <div id="color-picker-input">
        <input type="text" id="SettingBlocksColorField" placeholder="Вставьте HEX код"
          data-setting="settingBlocksColor" />
        <label>Основной цвет блоков</label>
      </div>
      <div id="color-picker-input">
        <input type="text" id="SettingChatColorField" placeholder="Вставьте HEX код" data-setting="settingChatColor" />
        <label>Основной цвет чата</label>
      </div>
      <div id="color-picker-input">
        <input type="text" id="SettingTextColorField" placeholder="Вставьте HEX код" data-setting="settingTextColor" />
        <label>Цвет текста</label>
      </div>
      <div id="color-picker-input">
        <input type="text" id="SettingLinkColorField" placeholder="Вставьте HEX код" data-setting="settingLinkColor" />
        <label>Цвет ссылок</label>
      </div>
      <div id="color-picker-input">
        <input type="text" id="SettingСatTooltipBackgroundField" placeholder="Вставьте HEX код"
          data-setting="settingСatTooltipBackground" />
        <label>Цвет фона подсказки "О Коте"</label>
      </div>
      <div id="color-picker-input">
        <input type="text" id="settingFightPanelBackgroundField" placeholder="Вставьте HEX код"
          data-setting="settingFightPanelBackground" />
        <label>Цвет панели Боевого режима</label>
      </div>
      <div id="color-picker-input">
        <input type="text" id="SettingAccentColorField1" placeholder="Вставьте HEX код"
          data-setting="settingAccentColor1" />
        <label title="Ваше имя в чате. Строка ввода сообщения. Кнопки. Слайдер громкости.">[?] Акценты 1</label>
      </div>
      <div id="color-picker-input">
        <input type="text" id="SettingAccentColorField2" placeholder="Вставьте HEX код"
          data-setting="settingAccentColor2" />
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

    <hr>
    <p>Та самая знаменитая Компактная Игровая, но с более расширенной кастомизацией.</p>
    <input type="checkbox" id="custom-layout" data-setting="customLayout" />
    <label for="custom-layout">Редизайн Игровой</label>

    <div id="layout-customizer">
      <h2>Настройка расположения основных блоков в Игровой</h2>
      <div id="layout-preview">
        <div class="column left">
          <!-- Левая колонка -->
        </div>
        <div class="column center">
          <!-- Центральная колонка -->
          <div class="block center-block">Поле Игровой</div>
        </div>
        <div class="column right">
          <!-- Правая колонка -->
        </div>
        <ul id="block-list">
          <!-- Элементы списка блоков -->
        </ul>
      </div>

      <p>!!! Не добавляйте что-то в колонку вместе с блоком "Информация". Из-за особенности реализации, пока что сложно
        автоматизировать распределение блоков адекватно.
        А так же не забудьте распределить все блоки по желанным местам, иначе в Игровой не распределённые блоки будут
        летать !!!</p>
      <button id="SettingSaveButton4">Сохранить</button>

      <div>
        <input type="text" id="chat-height" placeholder="Вставьте значение" data-setting="chatHeight" />
        <label for="chat-height">px; Высота Чата</label>
      </div>

      <div>
        <input type="text" id="history-height" placeholder="Вставьте значение" data-setting="historyHeight" />
        <label for="history-height">px; Высота Истории</label>
      </div>

      <div>
        <p>Визуальное разделение блока "Информация" на меньшие блоки "Параметров, Истории и Родственные связи".</p>
        <input type="checkbox" id="slice-info-block" data-setting="sliceInfoBlock" />
        <label for="slice-info-block">Разделить блок Информации</label>
      </div>

      <div>
        <p>Скругляет края блоков в Игровой. Имеет временные чоколадки с нераздельным блоком "Информация".</p>
        <input type="checkbox" id="edge-trim-blocks" data-setting="edgeTrimBlocks" />
        <label for="edge-trim-blocks">Скругление блоков</label>
      </div>

      <hr>
      <div>
        <p>Добавляет аватар с профиля отправителя на его комментарий.</p>
        <input type="checkbox" id="comments-avatars" data-setting="commentsAvatars" />
        <label for="comments-avatars">Аватарки в комментариях</label>
      </div>

      <div>
        <p>ID отправителя рядом с его именем, а так же... Пока что всё.</p>
        <input type="checkbox" id="new-chat" data-setting="newChat" />
        <label for="new-chat">Редизайн чата</label>
      </div>

      <div>
        <p>Более современный аналог строки ввода в Игровой. Насильно берёт цвета с "Использовать свои цвета".</p>
        <input type="checkbox" id="new-chat-input" data-setting="newChatInput" />
        <label for="new-chat-input">Редизайн строки отправки сообщений</label>
      </div>

    </div>

  </div>

  <div id="modules-panel">
    <div id="module-info">

    </div>

    <input type="text" id="private-module-input" placeholder=" . . . " />
    <button id="SettingSaveButton3">Сохранить</button>

  </div>

  <hr>
  <div id="news-panel">
    <button id="news-button">
      v1.11.0 - ID Котов в чате! А ещё больше фиксов, и чуть ещё больше кастомайза игровой!
    </button>
    <div id="news-list" style="display: none">
      <h3>Главное</h3>
      <p>
        — Фиксы, фиксы, фиксы... Возможность настройки цвета всплывашке "О коте" и панели БР!
      </p>
      <hr>
      <h3>Внешний вид</h3>
      <p>— Буковки названия локации теперь побольше.</p>
      <p>— Возможность блюра элементов при помощи новых модулей в "Моды/Скрипты"</p>
      <hr>
      <h3>Изменения кода</h3>
      <p>— Починина возможность общаться с ботами при "Редизайне строки отправки сообщений" + Строчка ввода скрывается
        при общении с ботом.</p>
      <p>— Своя функция писания ID сообщениям. А ещё я вам этим снова сломал сохру. ПроститеИзвините.</p>
      <p>— Отправка сообщения больше не вставляет потом красную строку. Только Shift-Enter!</p>
      <p>— Исправлено, что чат всё равно ломался от разных размеров громкости в сообщениях.</p>
      <p>— Исправлена работоспособность модулей на других страницах.</p>
      <p>— Обернул многие элементы настроек в div. Буду думать как интересно спрятать расширенное описание переключалок.</p>
      <p>— Блюр и затемнение больше не применяется к "Своему изображению".</p>
      <p>— А ещё крутое расширение функций настроек для прописи взаимоисключающих галочек. Как раз для чекбоксов Фона.</p>
      <p>— Чучучуть больше комментариев кода.</p>
        <hr>
        <p>Дата выпуска: 13.05.24</p>
      </div>
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
          <img src="https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/firefly.png" alt="Иконка" width="48"
            height="48" title="Включает/Выключает">
        </button>
      </div>

    </div>
    <div id="aurora-settings-panel">
      <p>Изменения, сделанные в этой панели, сохранятся!</p>
      <h5>Здесь будет возможность переместить Северное Сияние в реальном времени, исключать локации из генерации погоды,
        либо запрещать
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
  margin-bottom: 0px;
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
  width: 150px;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px;
  border-radius: 10px;
  outline: none;
  margin: 5px;
  margin-left: 0px;
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

#SettingSaveButton1,
#SettingSaveButton2,
#SettingSaveButton3,
#SettingSaveButton4 {
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 5px;
  margin-left: 0px;
}

#SettingSaveButton1:hover,
#SettingSaveButton2:hover,
#SettingSaveButton3:hover,
#SettingSaveButton4:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

#modules-panel {
  display: none;
}

.module-container {
  width: 300px;
  min-height: 150px;
  position: relative;

  box-sizing: border-box;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: stretch; /* Изменено */
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.03);
}

.module-info {
  flex-grow: 1;
  margin-bottom: 10px;
}

.module-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

#module-info {
  flex-grow: 1;
  margin-bottom: 10px;

  display: flex;
  flex-wrap: wrap;
  flex-basis: 100%;
}

.module-container label {
  margin-top: 10px;
}

#private-module-input {
  margin: 10px;
}

.module-container button {
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 5px 10px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 5px;
}

.install-button {
  background-color: #78c8ff87;
}

.remove-button {
  background-color: #ff787887;
}

#module-info input[type="checkbox"] {
  margin: 10px;
}

#color-picker {
  display: flex;
  flex-wrap: wrap;
}

#color-picker-input {
  flex: 30%;
}

#aurora-panel {
  width: 100px;
}

#layout-preview button {
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 5px 10px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 5px;
}

#layout-customizer #layout-preview {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

#layout-customizer .column {
  width: 200px;
  border: 1px solid #ffffff1a;
  border-radius: 10px;
  padding: 5px;
  margin: 0 5px;
}

#layout-customizer .block {
  border-radius: 10px;
  background-color: #ffffff08;
  padding: 5px;
  margin-bottom: 5px;
}

#layout-customizer .center-block {
  height: 100%;
  box-sizing: border-box;

  border-radius: 10px;
  background-color: #ffffff08;
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

#manualWeather,
#aurora-pos {
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

#WeatherStep,
#auroraStep {
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

@keyframes aurora-spin {
  0% {
    --gradient-angle: 0deg;
  }

  100% {
    --gradient-angle: 360deg;
  }
}

@keyframes auroraFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes auroraFadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
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
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.firefly-disappearing {
  animation: fadeOut 6s ease-in-out forwards;
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
  weatherDrops: false,
  commentsAvatars: false,
  newChat: false,
  newChatInput: false,
  auroraPos: "1",
  chatHeight: "275",
  historyHeight: "215",
  backgroundUserImageURL: "",
  settingBackgroundColor: "",
  settingBlocksColor: "",
  settingChatColor: "",
  settingTextColor: "",
  settingСatTooltipBackground: "",
  settingFightPanelBackground: "",
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

if (targetSettings.test(window.location.href)) {
  createSettingsBlock("uwu-settings", uwusettings);

  // Загрузка настроек из сохранений
  function loadSettings() {
    const storedSettings = localStorage.getItem("uwu-settings");
    if (storedSettings && typeof storedSettings === "string") {
      const loadedSettings = JSON.parse(storedSettings);
      settings = { ...settings, ...loadedSettings };
    } else {
      console.log("Нет сохраненных настроек");
    }
  }

  // Сохраняем настройки в сохранения
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

    // Взаимоисключащиеся чекбоксы
    const exclusiveCheckboxGroups = [
      ['backgroundRepeat', 'backgroundUser']
    ];

    // Вызов сохранения настроек при изменениях чекбоксов
    document
    .querySelectorAll("#uwusettings [data-setting]")
    .forEach((element) => {
      const setting = element.dataset.setting;
      element.addEventListener("change", () => {
        if (element.type === "checkbox") {
          const group = exclusiveCheckboxGroups.find(g => g.includes(setting));
          if (group) {
            group.forEach(s => {
              if (s !== setting) {
                settings[s] = false;
                document.querySelector(`#uwusettings [data-setting="${s}"]`).checked = false;
              }
            });
          }
          settings[setting] = element.checked;
        } else {
          settings[setting] = element.value;
        }
        saveSettings();
      });
    });

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
  // ====================================================================================================================
  //  . . . МАКЕТ КАСТОМИЗАЦИИ ИГРОВОЙ . . .
  // ====================================================================================================================
  const blockNames = {
    tr_chat: "Чат",
    tr_actions: "Действия",
    tr_tos: "Погода",
    tr_mouth: "Во рту",
    // 'tr_sky': 'Небо',
    tr_info: "Информация",
  };
  const blockList = document.getElementById("block-list");
  const listItems = [];
  const leftColumn = document.querySelector("#layout-customizer .column.left");
  const rightColumn = document.querySelector(
    "#layout-customizer .column.right"
  );

  // Функция для создания элемента блока
  function createBlockElement(blockId) {
    const blockElement = document.createElement("div");
    blockElement.classList.add("block", blockId);

    const blockName = document.createElement("span");
    blockName.textContent = blockNames[blockId];
    blockElement.appendChild(blockName);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Удалить";
    removeButton.classList.add("remove-button");
    removeButton.addEventListener("click", () => {
      blockElement.remove();
      const listItem = listItems.find(
        (item) => item.dataset.blockId === blockId
      );
      if (listItem) {
        blockList.appendChild(listItem);
      }
    });

    blockElement.appendChild(removeButton);
    return blockElement;
  }

  // Функция для создания кнопок "Слева" и "Справа"
  function createMoveButtons(listItem, blockId) {
    const moveLeftButton = document.createElement("button");
    moveLeftButton.textContent = "Слева";
    moveLeftButton.classList.add("move-left", "install-button");
    moveLeftButton.addEventListener("click", () => {
      const blockElement = createBlockElement(blockId);
      leftColumn.appendChild(blockElement);
      listItem.remove();
    });
    listItem.appendChild(moveLeftButton);

    const moveRightButton = document.createElement("button");
    moveRightButton.textContent = "Справа";
    moveRightButton.classList.add("move-right", "install-button");
    moveRightButton.addEventListener("click", () => {
      const blockElement = createBlockElement(blockId);
      rightColumn.appendChild(blockElement);
      listItem.remove();
    });
    listItem.appendChild(moveRightButton);
  }

  // Создание списка блоков
  for (const blockId in blockNames) {
    const listItem = document.createElement("li");
    const blockName = document.createElement("span");
    blockName.textContent = blockNames[blockId];
    listItem.appendChild(blockName);
    listItem.dataset.blockId = blockId;

    createMoveButtons(listItem, blockId);

    blockList.appendChild(listItem);
    listItems.push(listItem);
  }

  // Сохранение и загрузка настроек
  const saveButton = document.getElementById("SettingSaveButton4");

  saveButton.addEventListener("click", () => {
    const leftBlocks = Array.from(leftColumn.querySelectorAll(".block")).map(
      (block) => block.classList[1]
    );
    const rightBlocks = Array.from(rightColumn.querySelectorAll(".block")).map(
      (block) => block.classList[1]
    );

    const layoutSettings = {
      leftBlocks,
      rightBlocks,
    };

    localStorage.setItem("layoutSettings", JSON.stringify(layoutSettings));
  });

  function loadLayoutSettings() {
    const savedSettings = localStorage.getItem("layoutSettings");
    if (savedSettings) {
      const { leftBlocks, rightBlocks } = JSON.parse(savedSettings);

      leftColumn.innerHTML = "";
      rightColumn.innerHTML = "";

      leftBlocks.forEach((blockId) => {
        const blockElement = createBlockElement(blockId);
        leftColumn.appendChild(blockElement);
      });

      rightBlocks.forEach((blockId) => {
        const blockElement = createBlockElement(blockId);
        rightColumn.appendChild(blockElement);
      });
    }
  }

  window.addEventListener("load", loadLayoutSettings);
}

// ====================================================================================================================
//  . . . ВКЛАДКИ ГЛАВНЫХ НАСТРОЕК . . .
// ====================================================================================================================
if (targetSettings.test(window.location.href)) {
  const effectsPanel = document.getElementById("effects-panel");
  const themePanel = document.getElementById("theme-panel");
  const effectsButton = document.getElementById("effects-button");
  const themeButton = document.getElementById("theme-button");
  const modulesButton = document.getElementById("modules-button");
  const modulesPanel = document.getElementById("modules-panel");

  effectsButton.addEventListener("click", () => {
    effectsPanel.style.display = "block";
    themePanel.style.display = "none";
    modulesPanel.style.display = "none";
    effectsButton.classList.add("active");
    themeButton.classList.remove("active");
    modulesButton.classList.remove("active");
  });

  themeButton.addEventListener("click", () => {
    effectsPanel.style.display = "none";
    themePanel.style.display = "block";
    modulesPanel.style.display = "none";
    effectsButton.classList.remove("active");
    themeButton.classList.add("active");
    modulesButton.classList.remove("active");
  });

  modulesButton.addEventListener("click", () => {
    effectsPanel.style.display = "none";
    themePanel.style.display = "none";
    modulesPanel.style.display = "block";
    effectsButton.classList.remove("active");
    themeButton.classList.remove("active");
    modulesButton.classList.add("active");
  });
  themePanel.style.display = "none";
}
// ====================================================================================================================
//  . . . МОДУЛЬНОСТЬ СКРИПТА . . .
// ====================================================================================================================
const moduleStates = {};
const defaultModules = [
  // "style.css",
  // ...
];
const privateModules = {};

function loadModuleStates() {
  const storedModuleStates = localStorage.getItem("moduleStates");
  if (storedModuleStates) {
    const loadedModuleStates = JSON.parse(storedModuleStates);
    Object.assign(moduleStates, loadedModuleStates);
  } else {
    for (const moduleName of defaultModules) {
      moduleStates[moduleName] = true;
    }
  }

  const storedPrivateModules = localStorage.getItem("privateModules");
  if (storedPrivateModules) {
    Object.assign(privateModules, JSON.parse(storedPrivateModules));
  }
}

async function loadModuleListOnSettings() {
  const url = "https://raw.githubusercontent.com/Ibirtem/CatWar/main/modules/modules.txt";

  // Проверка URL
  const targetSettings = /^https:\/\/catwar\.su\/settings/;
  if (!targetSettings.test(window.location.href)) {
    return; // Выход, если URL не соответствует
  }

  try {
    const response = await fetch(url);
    const moduleList = await response.text();
    const modules = moduleList.split("\n").filter((line) => line.trim() !== "");

    const moduleInfoContainer = document.getElementById("module-info");
    const privateModuleInput = document.getElementById("private-module-input");
    const saveButton = document.getElementById("SettingSaveButton3");

    // Проверка наличия контейнера модулей
    if (!moduleInfoContainer) {
      console.error("Контейнер модулей не найден!");
      return;
    }

    for (const moduleInfo of modules) {
      const [moduleName, description, version] = moduleInfo.split("|");
      const isOnlineModule = !localStorage.getItem(moduleName);
      const moduleContainer = createModuleContainer(
        moduleName,
        description,
        version,
        isOnlineModule
      );
      moduleInfoContainer.appendChild(moduleContainer);

      if (moduleStates[moduleName]) {
        loadModule(moduleName, description, version);
      }
    }

    for (const [moduleName, moduleInfo] of Object.entries(privateModules)) {
      const { description, version } = moduleInfo;
      const isPrivateModule = true;
      const moduleContainer = createModuleContainer(
        moduleName,
        description,
        version,
        false,
        isPrivateModule
      );
      moduleInfoContainer.appendChild(moduleContainer);

      if (moduleStates[moduleName]) {
        loadModule(moduleName, description, version);
      }
    }

    saveButton.addEventListener("click", () => {
      const privateModuleUrl = privateModuleInput.value.trim();
      if (privateModuleUrl) {
        loadPrivateModule(privateModuleUrl);
        privateModuleInput.value = "";
      }
    });
  } catch (error) {
    console.error("Ошибка при загрузке списка модулей:", error);
  }
}

async function activateModules() {
  const url = "https://raw.githubusercontent.com/Ibirtem/CatWar/main/modules/modules.txt";

  try {
    const response = await fetch(url);
    const moduleList = await response.text();
    const modules = moduleList.split("\n").filter((line) => line.trim() !== "");

    for (const moduleInfo of modules) {
      const [moduleName, description, version] = moduleInfo.split("|");
      const isOnlineModule = !localStorage.getItem(moduleName);

      if (moduleStates[moduleName]) {
        loadModule(moduleName, description, version);
      }
    }

    for (const [moduleName, moduleInfo] of Object.entries(privateModules)) {
      const { description, version } = moduleInfo;

      if (moduleStates[moduleName]) {
        loadModule(moduleName, description, version);
      }
    }
  } catch (error) {
    console.error("Ошибка при активации модулей:", error);
  }
}

function createModuleContainer(
  moduleName,
  description,
  version,
  isOnlineModule = false,
  isPrivateModule = false
) {
  const moduleContainer = document.createElement("div");
  moduleContainer.classList.add("module-container");

  const moduleInfo = document.createElement("div");
  moduleInfo.classList.add("module-info");
  moduleInfo.textContent = `${description}`;

  const modulePanel = document.createElement("div");
  modulePanel.classList.add("module-panel");

  const versionInfo = document.createElement("span");
  versionInfo.textContent = `Версия: ${version}`;
  modulePanel.appendChild(versionInfo);

  if (isOnlineModule) {
    const installButton = document.createElement("button");
    installButton.textContent = "Установить";
    installButton.classList.add("install-button");
    installButton.addEventListener("click", () => {
      loadModule(moduleName, description, version);
      moduleContainer.remove();
      createModuleContainer(
        moduleName,
        description,
        version,
        false,
        isPrivateModule
      );
    });
    modulePanel.appendChild(installButton);
  } else {
    const checkboxContainer = document.createElement("div");
    checkboxContainer.classList.add("checkbox-container");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = moduleName;
    checkbox.checked = moduleStates[moduleName] || false;
    checkboxContainer.appendChild(checkbox);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Удалить";
    removeButton.classList.add("remove-button");
    removeButton.addEventListener("click", () => {
      unloadModule(moduleName);
      moduleContainer.remove();
    });
    modulePanel.appendChild(removeButton);

    checkbox.addEventListener("change", () => {
      moduleStates[moduleName] = checkbox.checked;
      localStorage.setItem("moduleStates", JSON.stringify(moduleStates));

      if (checkbox.checked) {
        loadModule(moduleName, description, version);
      } else {
        deactivateModule(moduleName);
      }
    });

    moduleInfo.appendChild(checkboxContainer);
  }

  moduleContainer.appendChild(moduleInfo);
  moduleContainer.appendChild(modulePanel);

  return moduleContainer;
}

async function loadModule(moduleName, description, version) {
  const cachedModule = localStorage.getItem(moduleName);

  if (cachedModule) {
    // Модуль есть в кеше, используем его
    activateModule(cachedModule, moduleName, description, version);
  } else {
    // Модуля нет в кеше, загружаем его
    const url = `https://raw.githubusercontent.com/Ibirtem/CatWar/main/modules/${moduleName}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.text();
        localStorage.setItem(moduleName, data);
        activateModule(data, moduleName, description, version);

        // Обновляем состояние moduleStates для загруженного модуля
        moduleStates[moduleName] = true;
        localStorage.setItem("moduleStates", JSON.stringify(moduleStates));

        // Создаем контейнер для загруженного модуля
        createModuleContainer(moduleName, description, version, false);

        loadModuleStates();
        clearModuleInfoContainer();
        loadModuleListOnSettings();
      } else {
        console.error(
          `Ошибка при загрузке модуля "${moduleName}": ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Ошибка при загрузке модуля:", error);
    }
  }
}

async function loadPrivateModule(privateModuleUrl) {
  try {
    const isValidUrl = privateModuleUrl.startsWith(
      "https://raw.githubusercontent.com/"
    );
    if (isValidUrl) {
      const response = await fetch(privateModuleUrl);
      if (response.ok) {
        const data = await response.text();
        const moduleName = getModuleNameFromUrl(privateModuleUrl);
        const moduleInfo = { description: "Приватный модуль", version: "Н/Д" };
        privateModules[moduleName] = moduleInfo;
        localStorage.setItem("privateModules", JSON.stringify(privateModules));
        const moduleContainer = createModuleContainer(
          moduleName,
          moduleInfo.description,
          moduleInfo.version
        );
        const moduleInfoContainer = document.getElementById("module-info");
        moduleInfoContainer.appendChild(moduleContainer);
        activateModule(
          data,
          moduleName,
          moduleInfo.description,
          moduleInfo.version
        );
      } else {
        console.error(
          `Ошибка при загрузке приватного модуля: ${response.status} ${response.statusText}`
        );
      }
    } else {
      console.error(
        'Неверный формат ссылки. Ссылка должна начинаться с "https://raw.githubusercontent.com/"'
      );
    }
  } catch (error) {
    console.error("Ошибка при загрузке приватного модуля:", error);
  }
}

function getModuleNameFromUrl(url) {
  const lastSlash = url.lastIndexOf("/");
  const fileName = url.substring(lastSlash + 1);
  return fileName;
}

function activateModule(data, moduleName, description, version) {
  if (moduleName.endsWith(".css")) {
    GM_addStyle(data);
  } else if (moduleName.endsWith(".js")) {
    try {
      new Function(data);
      eval(data);
    } catch (error) {
      console.error(`Ошибка при активации модуля "${moduleName}":`, error);
    }
  }
}

function unloadModule(moduleName) {
  localStorage.removeItem(moduleName);
  delete moduleStates[moduleName];
  localStorage.setItem("moduleStates", JSON.stringify(moduleStates));

  if (privateModules[moduleName]) {
    delete privateModules[moduleName];
    localStorage.setItem("privateModules", JSON.stringify(privateModules));
  }

  loadModuleStates();
  clearModuleInfoContainer();
  loadModuleListOnSettings();
}

function clearModuleInfoContainer() {
  const moduleInfoContainer = document.getElementById("module-info");
  while (moduleInfoContainer.firstChild) {
    moduleInfoContainer.removeChild(moduleInfoContainer.firstChild);
  }
}

loadModuleStates();
loadModuleListOnSettings();
window.addEventListener('load', activateModules);
// ====================================================================================================================
//   . . . ЗАГРУЗКА НАСТРОЕК . . .
// ====================================================================================================================
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
//   . . . АВАТАРЫ В КОММЕНТАРИЯХ . . .
// ====================================================================================================================
if (window.location.href !== targetCW3) {
  if (settings.commentsAvatars) {
    const checkForComments = setInterval(() => {
      const comments = document.querySelectorAll(".view-comment.has-buttons");
      if (comments.length > 0) {
        clearInterval(checkForComments);

        comments.forEach((comment) => {
          const authorLink = comment.querySelector(".author");
          if (authorLink) {
            const catId = authorLink
              .getAttribute("href")
              .match(/\/cat(\d+)/)?.[1];
            if (catId) {
              const avatarImg = document.createElement("img");

              avatarImg.alt = "Аватар пользователя";
              avatarImg.style.width = "100px";
              avatarImg.style.height = "100px";
              avatarImg.style.objectFit = "cover";
              avatarImg.style.float = "left";
              avatarImg.style.margin = "5px";
              avatarImg.style.border = "black solid 1px";

              loadAvatar(catId, (avatarUrl) => {
                if (avatarUrl) {
                  avatarImg.src = avatarUrl;
                  comment.insertBefore(avatarImg, comment.firstChild);
                }
              });
            }
          }
        });
      }
    }, 200);
  }

  function loadAvatar(catId, callback) {
    const formats = ["png", "jpg", "gif"];
    let currentFormat = 0;

    function tryNextFormat() {
      const url = `https://e.catwar.su/avatar/${catId}.${formats[currentFormat]}`;
      const img = new Image();

      img.onload = function () {
        callback(url);
      };

      img.onerror = function () {
        currentFormat++;
        if (currentFormat < formats.length) {
          tryNextFormat();
        } else {
          callback(null);
        }
      };

      img.src = url;
    }

    tryNextFormat();
  }
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
  const cagesDiv = document.querySelector("#cages_div");

  // Функция для создания фонового div
  function createBackgroundDiv() {
    const backgroundDiv = document.createElement("div");
    backgroundDiv.style.position = "fixed";
    backgroundDiv.style.top = "-1%";
    backgroundDiv.style.left = "-1%";
    backgroundDiv.style.width = "102%";
    backgroundDiv.style.height = "102%";
    backgroundDiv.style.zIndex = "-1";
    backgroundDiv.style.overflow = "hidden";
    return backgroundDiv;
  }
  
  // Функция для обновления фонового изображения
  function updateBackgroundImage(backgroundDiv, imageUrl) {
    if (imageUrl) {
      backgroundDiv.style.backgroundImage = `url(${imageUrl})`;
      backgroundDiv.style.backgroundSize = "cover";
      backgroundDiv.style.backgroundPosition = "center";
      backgroundDiv.style.backgroundRepeat = "no-repeat";
    } else {
      backgroundDiv.style.backgroundImage = "none";
    }
  }
  
  // backgroundRepeat
  if (settings.backgroundRepeat) {
    const backgroundDiv = createBackgroundDiv();
  
    backgroundDiv.style.filter = "blur(16px)";
    backgroundDiv.style.backgroundBlendMode = "overlay";
    backgroundDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  
    const backgroundImageStyle = window.getComputedStyle(cagesDiv).backgroundImage;
    const url = backgroundImageStyle.match(/url\("?(.+?)"?\)/);
    const backgroundImageUrl = url ? url[1] : null;
  
    updateBackgroundImage(backgroundDiv, backgroundImageUrl);
    globalContainerElement.appendChild(backgroundDiv);
  
    // Наблюдатель за изменениями стиля cagesDiv
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "style") {
          const backgroundImageStyle = window.getComputedStyle(cagesDiv).backgroundImage;
          const url = backgroundImageStyle.match(/url\("?(.+?)"?\)/);
          const backgroundImageUrl = url ? url[1] : null;
          updateBackgroundImage(backgroundDiv, backgroundImageUrl);
        }
      });
    });
  
    observer.observe(cagesDiv, { attributes: true, attributeFilter: ["style"] });
  }
  
  // backgroundUser
  if (settings.backgroundUser) {
    const backgroundDiv = createBackgroundDiv();
  
    // backgroundDiv.style.filter = "blur(16px)"; 
    // backgroundDiv.style.backgroundBlendMode = "overlay";
    // backgroundDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  
    updateBackgroundImage(backgroundDiv, settings.backgroundUserImageURL);
    globalContainerElement.appendChild(backgroundDiv);
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

      #cages_overflow {
        background: black;
      } 

      #tr_actions > td, #tr_mouth > td, #location, .small {
        background-color: ${settings.settingBlocksColor};
      }

      #main_table, #tr_mouth, #tr_actions, #info_main {
        background-color: unset;
        background: none;
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
        background: ${settings.settingСatTooltipBackground} !important;
        color: ${settings.settingTextColor} !important;
        border: 2px solid ${settings.settingAccentColor2} !important;
      } 

      span.cat_tooltip > span.online {
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
        background-color: ${settings.settingFightPanelBackground};
      }
    `;
    document.head.appendChild(newStyle);
  }
  // ====================================================================================================================
  //   . . . РЕДИЗАЙН ИГРОВОЙ . . .
  // ====================================================================================================================
  if (settings.customLayout) {
    function applyLayoutSettings() {
      const savedSettings = localStorage.getItem("layoutSettings");
      if (savedSettings) {
        const { leftBlocks, rightBlocks } = JSON.parse(savedSettings);

        const mainTable = document.getElementById("main_table");
        const tbody = mainTable.getElementsByTagName("tbody")[0];
        const blocks = Array.from(tbody.children);

        resetBlockStyles(tbody);

        const gridAreaTemplate = generateGridTemplate(leftBlocks, rightBlocks);

        // console.log(gridAreaTemplate);

        tbody.style.display = "grid";
        tbody.style.gridTemplateAreas = gridAreaTemplate;
        tbody.style.gridTemplateColumns = "1fr auto 1fr";
        tbody.style.gridTemplateRows = generateGridRowStyles(
          leftBlocks,
          rightBlocks,
          predefinedHeights
        );

        // Устанавливаем grid-area для каждого блока
        blocks.forEach((block) => {
          if (block.id) {
            block.style.gridArea = block.id;
          }
        });
      }
    }

    function generateGridRowStyles(leftBlocks, rightBlocks, predefinedHeights) {
      const numRows = Math.max(leftBlocks.length, rightBlocks.length);
      let rowStyles = [];

      for (let i = 0; i < numRows; i++) {
        const leftBlockId = leftBlocks[i];
        const rightBlockId = rightBlocks[i];

        let rowHeight = "auto";

        if (leftBlockId && predefinedHeights[leftBlockId]) {
          rowHeight = predefinedHeights[leftBlockId];
        }
        if (rightBlockId && predefinedHeights[rightBlockId]) {
          const rightHeight = predefinedHeights[rightBlockId];
          // Если обе стороны имеют предопределенные высоты, выбираем минимальную
          if (rowHeight !== "auto") {
            rowHeight =
              Math.min(parseInt(rowHeight), parseInt(rightHeight)) + "px";
          } else {
            rowHeight = rightHeight;
          }
        }

        rowStyles.push(rowHeight);
      }

      const rowStylesString = rowStyles.join(" ");
      // console.log(rowStylesString);
      return rowStylesString;
    }

    // Предопределенные высоты для блоков
    const predefinedHeights = {
      tr_tos: "30px",
      // Больше блоков сюда
    };

    function generateGridTemplate(leftBlocks, rightBlocks) {
      const numRows = Math.max(leftBlocks.length, rightBlocks.length);
      let template = "";
      let lastLeftBlockId = "";
      let lastRightBlockId = "";
      let isFirstRow = true;

      for (let i = 0; i < numRows; i++) {
        const leftBlockId = leftBlocks[i] || lastLeftBlockId;
        const rightBlockId = rightBlocks[i] || lastRightBlockId;

        if (isFirstRow) {
          template += `"${leftBlockId} tr_field ${rightBlockId}" `;
          isFirstRow = false;
        } else {
          template += `"${
            leftBlockId === lastLeftBlockId ? "." : leftBlockId
          } . ${rightBlockId === lastRightBlockId ? "." : rightBlockId}" `;
        }

        if (leftBlockId) {
          lastLeftBlockId = leftBlockId;
        }
        if (rightBlockId) {
          lastRightBlockId = rightBlockId;
        }
      }

      return template;
    }

    function resetBlockStyles(parent) {
      const blocks = parent.querySelectorAll("tr > *");
      blocks.forEach((block) => {
        block.style.gridArea = "";
      });
    }

    // Больше фикс стилей.
    const fixStyle = document.createElement("style");
    fixStyle.innerHTML = `
  #main_table {
    width: 100%;
    max-width: unset;
    height: 100%;

    background: none;
  }

  #app {
    width: 100%;
    height: 100%;
  }
  
  #chat_msg, #cws_chat_msg {
    width: auto;
  }

  #history_block > div { 
    visibility: hidden; 
  }

  #history_block {
    display: block;
    height: ${settings.historyHeight}px; 
    overflow-y: auto;
    resize: vertical;
  }

  #family_block, #cws_quick_settings_block { 
    display: block;
    max-height: 150px; 
    overflow-y: auto;
  }

  .infos {
    width: auto;
  }

  #cages_overflow {
    background: black;
  }

  .chat_text {
    width: auto !important;
    overflow-wrap: anywhere;
  }

  #chat_form {
    margin: unset;
    margin: 5px;
  }

  #volume {
    margin: 5px;
  }

  #app > p:last-of-type {
    position: absolute;
    bottom: 0px;
  }

  h2 {
    margin-top: 5px;
    margin-bottom: 10px;
  }

  #itemList {
    overflow-y: auto;
    max-height: 180px;
    display: flex;
    flex-wrap: wrap;
  }

  #location {
    visibility: visible;
    position: fixed;
    right: 0px;
    top: 0px;
    font-size: 1.5rem;
    background-color: ${settings.settingBlocksColor};
    z-index: 1;
  }

  .small {
    position: fixed;
    left: 0px;
    top: 0px;
    font-size: 16px;
    z-index: 1;
  }

  body {
    overflow-y: scroll;
  }

  #tr_chat, #tr_actions > td, #tr_mouth > td, #location, .small, #info_main > tbody > tr > td {
    padding: 5px !important;
  }

  #chat_msg, #cws_chat_msg {
    height: ${settings.chatHeight}px;
    resize: vertical;
  }

  #tr_field, #tr_info {
    height: 10px;
  }
  `;
    document.head.appendChild(fixStyle);
    applyLayoutSettings();

    function applyLayoutSettingsForInfoMain() {
      const infoMainTable = document.getElementById("info_main");
      const tableRow = infoMainTable.querySelector("tr");
      const tds = tableRow.getElementsByTagName("td");

      for (const td of tds) {
        td.style.gridArea = "";
      }

      tableRow.style.display = "grid";
      // хахахах поглядите на смешного строчного
      tableRow.style.gridTemplateAreas = `"parameter"
                                        "history"
                                        "family"`;

      tds[0].style.gridArea = "family";
      tds[1].style.gridArea = "history";
      tds[2].style.gridArea = "parameter";
    }
    applyLayoutSettingsForInfoMain();
  }
  // ====================================================================================================================
  //   . . . НОВЫЙ ЧАТ . . .
  // ====================================================================================================================
  if (settings.newChat) {
    function addProfileIdToChatMessage(chatMessage) {
      // Удаляем старый ID, если он есть
      const existingIdSpan = chatMessage.querySelector(".nick + span");
      if (existingIdSpan && existingIdSpan.textContent.trim().startsWith("[")) {
        existingIdSpan.remove();
      }
    
      const profileLink = chatMessage.querySelector('a[href^="/cat"], a[href^="/"]');
      if (profileLink) {
        const profileIdMatch = profileLink.getAttribute("href").match(/\/cat(\d+)|^\/(\d+)$/);
        if (profileIdMatch) {
          const profileId = profileIdMatch[1] || profileIdMatch[2];
          const nickElement = chatMessage.querySelector(".nick");
          const profileIdElement = document.createElement("span");
          profileIdElement.textContent = ` [${profileId}]`;
          nickElement.parentNode.insertBefore(profileIdElement, nickElement.nextSibling);
        }
      }
    }
    
    function updateAllChatMessages() {
      const chatElement = document.getElementById('chat_msg');
      if (chatElement) {
        const allMessages = Array.from(chatElement.querySelectorAll('span > hr + table'));
        allMessages.forEach(message => {
          addProfileIdToChatMessage(message);
        });
      }
    }
    
    function setupChatObserver() {
      const chatElement = document.getElementById('chat_msg');
    
      if (chatElement) {
        updateAllChatMessages(); // Обновляем ID при запуске
    
        // Настраиваем MutationObserver
        const observer = new MutationObserver(mutations => {
          updateAllChatMessages(); // Обновляем ID при каждом изменении
        });
    
        observer.observe(chatElement, { childList: true });
      } else {
        setTimeout(setupChatObserver, 500);
      }
    }
    
    setupChatObserver();
  }
  // ====================================================================================================================
  //   . . . НОВЫЙ ВВОД ЧАТА . . .
  // ====================================================================================================================
  if (settings.newChatInput) {
    const txtSpan = document.getElementById("txt");
    const selectField = txtSpan.querySelector("select#text");

    let textarea;

    function initTextarea(id, value) {
      const textarea = document.createElement("textarea");
      textarea.id = id;
      textarea.maxLength = 255;
      textarea.style.height = "auto";
      textarea.style.width = "100%";
      textarea.style.resize = "vertical";
      textarea.value = value || "";
      return textarea;
    }

    if (selectField) {
      textarea =
        document.getElementById("text-hide") || initTextarea("text-hide");
      textarea.style.display = "none";
    } else {
      const inputField = txtSpan.querySelector("input#text");

      textarea = initTextarea("text", inputField ? inputField.value : "");
      txtSpan.insertBefore(textarea, inputField);
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          const selectField = txtSpan.querySelector("select#text");
          if (selectField) {
            textarea.style.display = "none";
            textarea.id = "text-hide";
          } else {
            textarea.style.display = "";
            textarea.id = "text";
          }
        }
      });
    });

    observer.observe(txtSpan, { childList: true });

    textarea.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        if (event.shiftKey) {
          event.preventDefault();
          textarea.value += "\n";
        } else {
          event.preventDefault();
          const sendButton = document.getElementById("msg_send");
          sendButton.click();
        }
      }
    });

    const NewChatDesign = document.createElement("style");
    NewChatDesign.innerHTML = `
  input#text {
    display: none;
  }

  #text, #text-hide {
    color: ${settings.settingTextColor};
    background: ${settings.settingAccentColor1};
    border: solid 1px ${settings.settingAccentColor2};
    font-family: Verdana;
  }
`;
    document.head.appendChild(NewChatDesign);
  }
  // ====================================================================================================================
  //   . . . РЕДИЗАЙНЫ ++ ЗАКРУГЛЕНИЕ БЛОКОВ . . .
  // ====================================================================================================================
  const sliceInfoStyle = document.createElement("style");
  if (settings.sliceInfoBlock) {
    sliceInfoStyle.innerHTML = `
      #info_main > tbody > tr > td {
        background-color: ${settings.settingBlocksColor};
        margin-bottom: 5px;
      }
    `;
  } else {
    sliceInfoStyle.innerHTML = `
      #info_main > tbody {
        background-color: ${settings.settingBlocksColor};
      }
    `;
  }
  document.head.appendChild(sliceInfoStyle);

  const edgeTrimBlocksStyle = document.createElement("style");
  if (settings.edgeTrimBlocks) {
    edgeTrimBlocksStyle.innerHTML = `
    #info_main > tbody > tr > td {
      width: fit-content;
      border-radius: 10px;
      margin: 5px;
    }
    
    #info_main,
    #tos,
    #cages_overflow,
    #cages_div {
      border-radius: 10px;
    }
    
    #main_table > tbody > #tr_actions,
    #main_table > tbody > #tr_mouth,
    #main_table > tbody > #tr_chat {
      margin: 5px;
    }
    
    #tr_chat,
    #tr_actions > td,
    #tr_mouth > td,
    #location,
    .small {
      border-radius: 10px;
    }    
    `;
  }
  document.head.appendChild(edgeTrimBlocksStyle);
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
        case 0:
          currentSeason = "winter";
          break;
        case 1:
          currentSeason = "spring";
          break;
        case 2:
          currentSeason = "summer";
          break;
        case 3:
          currentSeason = "autumn";
          break;
      }
    }
    // console.log(currentSeason);
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
  const auroraColors = {
    green: {
      1: "#aaff9d",
      2: "#00faa0",
      3: "#00ff62",
    },
    blue: {
      1: "#9DF5ED",
      2: "#82BBF5",
      3: "#725DFA",
    },
  };
  const auroras = [];

  function removeAurora(auroraElement) {
    auroraElement.style.animation = "auroraFadeOut 6s ease-in-out";

    setTimeout(() => {
      weatherContainer.removeChild(auroraElement);
      const index = auroras.indexOf(auroraElement);
      if (index > -1) {
        auroras.splice(index, 1);
      }
    }, 6000);
  }

  function createAurora(color) {
    for (const auroraElement of auroras) {
      removeAurora(auroraElement);
    }

    const newAurora = document.createElement("div");

    newAurora.style.cssText = `
    transform: translate(0, 60%);
    z-index: -1;
    position: fixed;
    left: 0;
    width: 100%;
    height: 30%;
    filter: blur(4rem);
    animation: aurora-spin 15s linear infinite, auroraFadeIn 6s ease-in-out;
    background: conic-gradient(from var(--gradient-angle),
    ${auroraColors[color][1]},
    ${auroraColors[color][2]},
    ${auroraColors[color][3]},
    ${auroraColors[color][2]},
    ${auroraColors[color][1]});
`;

    if (settings.auroraPos === "1") {
      newAurora.style.top = "-30%";
    } else if (settings.auroraPos === "2") {
      newAurora.style.bottom = "0";
    }

    weatherContainer.appendChild(newAurora);
    auroras.push(newAurora);
  }

  function toggleAurora() {
    if (!settings.extendedSettings) {
      if (
        currentWeather === "northernLights" ||
        (currentWeather === "clear" &&
          currentHour === "night" &&
          (currentSeason === "autumn" || currentSeason === "winter"))
      ) {
        if (auroras.length === 0) {
          const randomNumber = Math.random();
          if (randomNumber > 0.5) {
            createAurora("green");
          } else {
            createAurora("blue");
          }
        }
      } else {
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
    case settings.extendedSettings && !settings.weatherDrops:
    case settings.weatherEnabled && !settings.weatherDrops:
      setInterval(() => {
        checkElements(raindrops, weatherContainer);
        checkElements(snowflakes, weatherContainer);
        checkElements(pixelSnowflakes, weatherContainer);
        checkElements(pixelRaindrops, weatherContainer);
      }, 120);
      break;

    case settings.extendedSettings && settings.weatherDrops:
    case settings.weatherEnabled && settings.weatherDrops:
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
