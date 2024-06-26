// ==UserScript==
// @name         CatWar UwU
// @namespace    http://tampermonkey.net/
// @version      v1.20.0-07.24
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
//   . . . DEFAULT НАСТРОЙКИ . . .
// ====================================================================================================================
const current_uwu_version = "1.20.0";
// ✨🦐✨🦐✨
let settings = {

  weatherEnabled: false,
  weatherDrops: false,
  lowPerformanceMode: false,
  minecraftStyle: false,
  alwaysDay: false,
  manualWeatherPanel: false,
  skyInHeader: false,
  auroraPos: "1",

  backgroundRepeat: false,
  backgroundUser: false,
  backgroundUserImageURL: "",
  gameFieldBackgroundUser: false,
  gameFieldBackgroundUserImageURL: "",
  userTheme: false,
  commentsAvatars: false,
  
  chatHeight: "275",
  newChat: false,
  newChatInput: false,
  namesForNotification: "",

  notificationPM: false,
  notificationActionEnd: false,
  notificationInMouth: false,
  notificationInFightMode: false,

  cellsBorders: false,
  cellsBordersThickness: "1",
  cellsNumbers: false,
  displayParametersPercentages: false,
  compactMouth: false,
  showMoreCatInfo: false,

  draggingFightPanel: false,
  FightPanelAdjustableHeight: false,
  FightPanelHeight: "70",
  FightTeams: false,
  FightTeamsColors: {
    team1: ["#41cd70", "#cd4141"],
    team2: ["#c968ff", "#cd4141"],
    team3: ["#44bcff", "#cd4141"],
    team4: ["#FFFF00", "#cd4141"]
  },
  FightTeamsPanelHight: "100",

  describeHuntingSmell: false,
  huntingVirtualJoystick: false,
  sizeHuntingVirtualJoystick: "150",

  climbingPanel: false,
  climbingNotificationsNumbers: false,
  climbingRefreshNotification: false,
  climbingRefreshNotificationSound: "notificationSound1",
  climbingRefreshNotificationVolume: "5",

  myNameNotificationSound: "notificationSound2",
  notificationMyNameVolume: "5",

  userQuickLinks: "",
  historyHeight: "215",

  // Цвета игровой
  settingBackgroundColor: "",
  settingBlocksColor: "",
  settingChatColor: "",
  settingTextColor: "",
  settingСatTooltipBackground: "",
  settingFightPanelBackground: "",
  settingLinkColor: "",
  settingAccentColor1: "",
  settingAccentColor2: "",
  settingAccentColor3: "",

  parametersColors: {
    dream: ["#008000", "#008000", "#ff0000", "#ff0000"],
    hunger: ["#008000", "#008000", "#ff0000", "#ff0000"],
    thirst: ["#008000", "#008000", "#ff0000", "#ff0000"],
    need: ["#008000", "#008000", "#ff0000", "#ff0000"],
    health: ["#008000", "#008000", "#ff0000", "#ff0000"],
    clean: ["#008000", "#008000", "#ff0000", "#ff0000"],

    smell: ["#008000", "#008000", "#cccccc", "#cccccc"],
    dig: ["#008000", "#008000", "#cccccc", "#cccccc"],
    swim: ["#008000", "#008000", "#cccccc", "#cccccc"],
    might: ["#008000", "#008000", "#cccccc", "#cccccc"],
    tree: ["#008000", "#008000", "#cccccc", "#cccccc"],
    observ: ["#008000", "#008000", "#cccccc", "#cccccc"],

    other: ["#008000", "#008000", "#cccccc", "#cccccc"],
  },
  parametersBackgroundImage: false,
  parametersUserBackgroundImage: false,
  parametersUserBackgroundImageURL: "",

  extendedSettingsPanel: false,
  showUpdateNotification: false,
  showSplashScreens: false,
  extendedHints: true,
  GMbetaTest: false,
};

// Типо начальные таргетные ссылки.
const targetSettings = /^https:\/\/catwar\.su\/settings/;
const targetCW3 = "https://catwar.su/cw3/";
const targetCW3Hunt = "https://catwar.su/cw3/jagd";
// ====================================================================================================================
//   . . . HTML ПАНЕЛЬ НАСТРОЕК . . .
// ====================================================================================================================
const uwusettings = `
<div id="uwusettings">
  <h1>Настройки CatWar UwU</h1>

  <div id="ref-vk" title="ВК Группа по Скрипту/Моду.">
    <a href="https://vk.com/catwar_uwu" target="_blank" rel="noopener noreferrer">
      <img src="https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/VK_logo.png" alt="Иконка" width="36"
        height="36">
    </a>
  </div>

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
    <button id="utility-button">
      <h2>
        Инструментарий
        <img src="https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/flashlight.png" alt="Иконка" width="24"
          height="24" />
      </h2>
    </button>
    <button id="modules-button">
      <h2>
        Надстройки
        <img src="https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/construction.png" alt="Иконка" width="24"
          height="24" />
      </h2>
    </button>
  </div>
  <hr>

  <div id="effects-panel">

  <h2>Природа и окружение</h2>

    <div>
      <p>
        Включает генерацию Динамичной погоды в Игровой, такие как дождь, снегопады или Северные Сияния.
      </p>
      <input type="checkbox" id="weather-enabled" data-setting="weatherEnabled" />
      <label for="weather-enabled">Показывать природные эффекты</label>
    </div>

    <div>
      <p>
      Сокращает количество частиц динамичной погоды, увеличивая тем самым производительность на слабых устройствах.
      </p>
    <input type="checkbox" id="low-Performance-Mode" data-setting="lowPerformanceMode" />
    <label for="low-Performance-Mode">Режим низкой производительности</label>
    </div>

    <div>
      <p>Может немного повлиять на производительность из-за возрастания количества частиц на экране.</p>
      <input type="checkbox" id="weather-drops" data-setting="weatherDrops" />
      <label for="weather-drops">Эффекты приземления частиц</label>
    </div>

    <div>
      <p>Замена стандартных частиц на знакомые всеми пиксельные частицы.</p>
      <input type="checkbox" id="minecraft-style" data-setting="minecraftStyle" />
      <label for="minecraft-style-enabled">Minecraft частицы</label>
    </div>

    <div>
      <p>Поле Игровой всегда яркое.</p>
      <input type="checkbox" id="always-day" data-setting="alwaysDay" />
      <label for="always-day">Всегда день</label>
    </div>

    <div>
      <p>Отображает панель Ручного управления погодой в ⚙️Панели Расширенных Настройках Игровой. Выключает натуральную генерацию погоды.</p>
      <input type="checkbox" id="manual-Weather-Panel" data-setting="manualWeatherPanel" />
      <label for="manual-Weather-Panel">Ручное управление погоды</label>
    </div>

    <hr>
    <p>Расположение Северного Сияния</p>
    <div id="auroraPanel">
      <input type="range" min="1" max="2" value="1" class="slider" id="aurora-pos" list="auroraStep"
        data-setting="auroraPos">
      <datalist id="auroraStep">
        <option value="1">Верх</option>
        <option value="2">Низ</option>
      </datalist>
    </div>

    <div>
      <p>Делает небо шапкой страницы, пряча под игровую, а так же по факту чинит его потерю при Редизайне игровой. Будет
        выглядеть не очень на широкоформатных мониторах из-за растягивания изображения.</p>
      <input type="checkbox" id="sky-in-the-sky" data-setting="skyInHeader" />
      <label for="sky-in-the-sky">Небо в небе.</label>
    </div>

  </div>

  <div id="theme-panel">

  <h2>Поле Игровой</h2>

  <div>
    <p> Заменяет все фоны игровых локаций на выбранный вами фон. Помните, что для правильного отображения нужно изображение 1000х1000 px.</p>
    <input type="checkbox" id="game-Field-background-User" data-setting="gameFieldBackgroundUser" />
    <label for="game-Field-background-User-enabled">Статичный фон локации:</label>
    <input type="text" id="gameFieldSettingImageURLField" placeholder="Вставьте URL" data-setting="gameFieldBackgroundUserImageURL" />
    <button id="SettingSaveButton1">Сохранить</button>
  </div>

  <div>
    <p>Отрисовывает границы клеток Игрового поля.</p>
    <input type="checkbox" id="cells-Borders" data-setting="cellsBorders" />
    <label for="cells-Borders">Границы клеток</label>
  </div>
  <p>Толщина/Яркость границ</p>
  <div id="step-slider">
    <input type="range" min="1" max="9" value="1" class="slider" id="cells-Borders-Thickness" list="ThicknessStep"
     data-setting="cellsBordersThickness">
    <datalist id="ThicknessStep">
     <option value="1">0.1</option>
     <option value="5">0.5</option>
     <option value="9">0.9</option>
    </datalist>
  </div>
  
  <div>
  <p>Обозначает клетки Игрового поля числами.</p>
    <input type="checkbox" id="cells-Numbers" data-setting="cellsNumbers" />
    <label for="cells-Numbers">Нумерация клеток</label>
  </div>

    <div>
      <p>
        Ставит на страницу фон, повторяющий фон Игровой локации, а так же
        размывает и затемняет его.
      </p>
      <input type="checkbox" id="background-repeat" data-setting="backgroundRepeat" />
      <label for="weather-enabled">Фон страницы из локации</label>
    </div>

    <div>
      <p>Ставит на страницу фон из предоставленной ссылки.</p>
      <input type="checkbox" id="background-user" data-setting="backgroundUser" />
      <label for="background-user-enabled">Свой фон страницы:</label>
      <input type="text" id="SettingImageURLField" placeholder="Вставьте URL" data-setting="backgroundUserImageURL" />
      <button id="SettingSaveButton1">Сохранить</button>
    </div>

    <hr>
    <h2>Темы и цвета Игровой</h2>

    <p>
      Здесь вы можете выставить собственные цвета для игровой. Принимаются "HEX"
      значения (Пример: #000) с поддержкой прозрачности. Будьте аккуратны и
      не забывайте выключать другие цвета/темы в других скриптах/модах. Очистите поле
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
        <label
          title="В основном всякие кнопки, слайдеры и строки ввода + цвет букв упоминания вас в Чате. Старайтесь пока делать просто оттенки чёрного цвета.">[?]
          Акценты 1</label>
      </div>
      <div id="color-picker-input">
        <input type="text" id="SettingAccentColorField2" placeholder="Вставьте HEX код"
          data-setting="settingAccentColor2" />
        <label title="Линии в чате и некоторых других частях, кружочек слайдера громкости.">[?] Акценты 2</label>
      </div>
      <div id="color-picker-input">
        <input type="text" id="SettingAccentColorField3" placeholder="Вставьте HEX код"
          data-setting="settingAccentColor3" />
        <label title="Цвет уведомлений. Например ЛС и вашего имени в Чате">[?] Акценты 3</label>
      </div>

      <div style="flex: 0 0 100%">
        <button id="SettingSaveButton2">Сохранить</button>
        <p>
          Отличный сайт для выбора цветов с поддержкой прозрачности:
          <a href="https://get-color.ru/transparent/" target="_blank">https://get-color.ru/transparent/</a>
        </p>
      </div>
    </div>

    <hr>
    <h2>Редизайны Игровой</h2>

    <p>Тот самый знаменитный редизайн, но с почти более расширенной кастомизацией.</p>
    <input type="checkbox" id="custom-layout" data-setting="customLayout" />
    <label for="custom-layout">Компактный редизайн</label>

    <div id="layout-customizer">
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
    </div>
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
      <p>Скругляет края блоков в Игровой.</p>
      <input type="checkbox" id="edge-trim-blocks" data-setting="edgeTrimBlocks" />
      <label for="edge-trim-blocks">Скругление блоков</label>
    </div>

    <hr>
    <h2>Общение</h2>

    <div>
      <p>Добавляет аватар с профиля отправителя на его комментарий в лентах и блогах.</p>
      <input type="checkbox" id="comments-avatars" data-setting="commentsAvatars" />
      <label for="comments-avatars">Аватарки в комментариях</label>
    </div>

    <div>
      <p>Более функциональный Чат: допись ID отправителя и звуковое уведомление при вашем упоминании.
      </p>
      <input type="checkbox" id="new-chat" data-setting="newChat" />
      <label for="new-chat">Современный Чат</label>
    </div>

    <div id="myNameNotificationSoundContainer">
      <div class="custom-select" id="myNameNotificationSound">
        <div class="select-selected">Выберите звук</div>
        <div class="select-items">
          <!-- Опции будут добавлены сюда -->
      </div>
    </div>
  
    <div id="notification-volume">
    <p>Громкость</p>
      <input type="range" min="1" max="10" value="5" class="slider" id="notification-MyName-Volume" list="volumeStep"
        data-setting="notificationMyNameVolume">
      <datalist id="volumeStep">
        <option value="1">10%</option>
        <option value="5">50%</option>
        <option value="10">100%</option>
      </datalist>
    </div>
  </div>

  <div>
    <p>Ваши собственные имена и клички на упоминания в чате. Просто пропишите их через запятую. Пример: Мяу, Мяуич, МяуВкин</p>
    <input type="text" id="names-For-Notification" placeholder=". . ." data-setting="namesForNotification" />
  </div>

    <div>
      <p>Более удобная строка ввода сообщений над чатом с возможностью растягивания. Пока что насильно берёт цвета с "Использовать свои цвета".</p>
      <input type="checkbox" id="new-chat-input" data-setting="newChatInput" />
      <label for="new-chat-input">Альтернативная строка ввода сообщений</label>
    </div>

    <hr>
    <h2>Параметры и навыки</h2>
    
    <div>
      <p>Показывает процент Параметра рядом с собой.</p>
      <input type="checkbox" id="display-Parameters-Percentages" data-setting="displayParametersPercentages" />
      <label for="display-Parameters-Percentages">Отображать проценты Параметров</label>
    </div>

    <div>
      <p>Заменяет стандатные цвета на выбранные ваши, с поддержкой градиента.</p>
      <input type="checkbox" id="user-Parameters-Theme" data-setting="userParametersTheme" />
      <label for="user-Parameters-Theme">Использовать свои цвета</label>
    </div>

<div id="parameters-color-settings" class="parameters-color-settings">
  <table class="parameters-color-table">
    <thead>
      <tr>
        <th class="parameters-color-table__header">Градиент</th>
        <th class="parameters-color-table__header">От</th>
        <th class="parameters-color-table__header">До</th>
        <th class="parameters-color-table__header">От</th>
        <th class="parameters-color-table__header">До</th>
      </tr>
    </thead>
    <tbody id="color-settings-body" class="parameters-color-table__body">
      <tr>
        <th class="parameters-color-table__cell" colspan="5">Параметры</th>
      </tr>
      <tr>
        <td class="parameters-color-table__cell">Сон</td>
        <td class="parameters-color-table__cell"><input type="color" data-param="dream" data-color-type="bar-from"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="dream" data-color-type="bar-to"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="dream" data-color-type="bg-from"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="dream" data-color-type="bg-to"></td>
      </tr>
      <tr>
        <td class="parameters-color-table__cell">Голод</td>
        <td class="parameters-color-table__cell"><input type="color" data-param="hunger" data-color-type="bar-from"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="hunger" data-color-type="bar-to"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="hunger" data-color-type="bg-from"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="hunger" data-color-type="bg-to"></td>
      </tr>
      <tr>
        <td class="parameters-color-table__cell">Жажда</td>
        <td class="parameters-color-table__cell"><input type="color" data-param="thirst" data-color-type="bar-from"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="thirst" data-color-type="bar-to"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="thirst" data-color-type="bg-from"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="thirst" data-color-type="bg-to"></td>
      </tr>
      <tr>
        <td class="parameters-color-table__cell">Нужда</td>
        <td class="parameters-color-table__cell"><input type="color" data-param="need" data-color-type="bar-from"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="need" data-color-type="bar-to"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="need" data-color-type="bg-from"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="need" data-color-type="bg-to"></td>
      </tr>
      <tr>
        <td class="parameters-color-table__cell">Здоровье</td>
        <td class="parameters-color-table__cell"><input type="color" data-param="health" data-color-type="bar-from"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="health" data-color-type="bar-to"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="health" data-color-type="bg-from"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="health" data-color-type="bg-to"></td>
      </tr>
      <tr>
        <td class="parameters-color-table__cell">Чистота</td>
        <td class="parameters-color-table__cell"><input type="color" data-param="clean" data-color-type="bar-from"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="clean" data-color-type="bar-to"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="clean" data-color-type="bg-from"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="clean" data-color-type="bg-to"></td>
      </tr>
      <tr>
        <th class="parameters-color-table__cell" colspan="5">Навыки</th>
      </tr>
      <tr>
        <td class="parameters-color-table__cell">Запах</td>
        <td class="parameters-color-table__cell"><input type="color" data-param="smell" data-color-type="bar-from"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="smell" data-color-type="bar-to"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="smell" data-color-type="bg-from"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="smell" data-color-type="bg-to"></td>
      </tr>
      <tr>
        <td class="parameters-color-table__cell">Копание</td>
        <td class="parameters-color-table__cell"><input type="color" data-param="dig" data-color-type="bar-from"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="dig" data-color-type="bar-to"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="dig" data-color-type="bg-from"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="dig" data-color-type="bg-to"></td>
      </tr>
      <tr>
        <td class="parameters-color-table__cell">Плавание</td>
        <td class="parameters-color-table__cell"><input type="color" data-param="swim" data-color-type="bar-from"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="swim" data-color-type="bar-to"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="swim" data-color-type="bg-from"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="swim" data-color-type="bg-to"></td>
      </tr>
      <tr>
        <td class="parameters-color-table__cell">БУ</td>
        <td class="parameters-color-table__cell"><input type="color" data-param="might" data-color-type="bar-from"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="might" data-color-type="bar-to"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="might" data-color-type="bg-from"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="might" data-color-type="bg-to"></td>
      </tr>
      <tr>
        <td class="parameters-color-table__cell">Лазание</td>
        <td class="parameters-color-table__cell"><input type="color" data-param="tree" data-color-type="bar-from"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="tree" data-color-type="bar-to"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="tree" data-color-type="bg-from"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="tree" data-color-type="bg-to"></td>
      </tr>
      <tr>
        <td class="parameters-color-table__cell">Зоркость</td>
        <td class="parameters-color-table__cell"><input type="color" data-param="observ" data-color-type="bar-from"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="observ" data-color-type="bar-to"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="observ" data-color-type="bg-from"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="observ" data-color-type="bg-to"></td>
      </tr>
      <tr>
        <th class="parameters-color-table__cell" colspan="5">Уникальные навыки</th>
      </tr>
      <tr>
        <td class="parameters-color-table__cell"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="other" data-color-type="bar-from"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="other" data-color-type="bar-to"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="other" data-color-type="bg-from"></td>
        <td class="parameters-color-table__cell"><input type="color" data-param="other" data-color-type="bg-to"></td>
      </tr>
    </tbody>
  </table>
</div>

    <div>
      <p>Накладывает сверху изображение с узорами.</p>
      <input type="checkbox" id="parameters-Background-Image" data-setting="parametersBackgroundImage" />
      <label for="parameters-Background-Image">Узоры</label>
    </div>

    <div>
      <p>Накладывает сверху уже ваше изображение.</p>
      <input type="checkbox" id="parameters-User-Background-Image" data-setting="parametersUserBackgroundImage" />
      <label for="parameters-User-Background-Image">Свои узоры:</label>
      <input type="text" id="parametersUserBackgroundImageField" placeholder="Вставьте URL" data-setting="parametersUserBackgroundImageURL" />
      <button id="SettingSaveButton1">Сохранить</button>
    </div>

  </div>

  <div id="utility-panel">

    <h2>Боевой режим</h2>

    <div>
      <p>Позволяет перетаскивать панель Боевого режима за штучку.</p>
      <input type="checkbox" id="dragging-Fight-Panel" data-setting="draggingFightPanel" />
      <label for="dragging-Fight-Panel">Перетаскивание панели Боевого режима</label>
    </div>

    <div>
      <p>Возможность растягивать высоту панели и её начальная высота.</p>
      <input type="checkbox" id="Fight-Panel-Adjustable-Height" data-setting="FightPanelAdjustableHeight" />
      <label for="Fight-Panel-Adjustable-Height">Настраиваемая высота панели</label>
      <input type="text" id="FightPanelHeightField" placeholder=". . ." data-setting="FightPanelHeight" />
      <label>px; - Начальная высота панели</label>
    </div>

    <div>
      <p>Возможность перекрашивать и создавать команды в Панели Боевого Режима.</p>
      <input type="checkbox" id="Fight-Teams" data-setting="FightTeams" />
      <label for="Fight-Teams">Команды в Боевом Режиме</label>
      <input type="text" id="FightTeamsPanelHightField" placeholder=". . ." data-setting="FightTeamsPanelHight" />
      <label>px; - Начальная высота панели Командного Боя</label>
    </div>

<table id="colorSettingsTable">
  <thead>
    <tr>
      <th></th>
      <th>Энергия</th>
      <th>Снесено</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Команда 1</td>
      <td><input type="color" data-team="1" data-part="green" value="#41cd70"></td>
      <td><input type="color" data-team="1" data-part="red" value="#cd4141"></td>
    </tr>
    <tr>
      <td>Команда 2</td>
      <td><input type="color" data-team="2" data-part="green" value="#c968ff"></td>
      <td><input type="color" data-team="2" data-part="red" value="#cd4141"></td>
    </tr>
    <tr>
      <td>Команда 3</td>
      <td><input type="color" data-team="3" data-part="green" value="#44bcff"></td>
      <td><input type="color" data-team="3" data-part="red" value="#cd4141"></td>
    </tr>
    <tr>
      <td>Команда 4</td>
      <td><input type="color" data-team="4" data-part="green" value="#FFFF00"></td>
      <td><input type="color" data-team="4" data-part="red" value="#cd4141"></td>
    </tr>
  </tbody>
</table>
  
  <hr>
  <h2>Охота</h2>

    <div>
      <p>Дописывает на запахе, во время охоты, приближаетесь вы или отдаляетесь от цели, а так же включает таймер.</p>
      <input type="checkbox" id="describe-Hunting-Smell" data-setting="describeHuntingSmell" />
      <label for="describe-Hunting-Smell">Подсказки на запахе</label>
    </div>

  <hr>
  <h2>Джойстики</h2>

    <div>
      <p>Отображает Виртуальную сенсорную Джойстиковую кнопку для мобильных устройств во время охоты для более удобного управления.</p>
      <input type="checkbox" id="hunting-Virtual-Joystick" data-setting="huntingVirtualJoystick" />
      <label for="hunting-Virtual-Joystick">Виртуальный джойстик для охоты</label>
      <input type="text" id="sizeHuntingVirtualJoystickField" placeholder=". . ." data-setting="sizeHuntingVirtualJoystick" />
      <label>px; - Размер Джойстика. Стандартный размер - 150 px;</label>
    </div>

  <hr>
  <h2>"О котах"</h2>

    <div>
      <p>Добавляет во всплывающее окно "О коте" кнопку "Подробнее" для просмотра большей полезной информации.</p>
      <input type="checkbox" id="show-More-Cat-Info" data-setting="showMoreCatInfo" />
      <label for="show-More-Cat-Info">Больше информации о Коте</label>
    </div>

    <div>
      <p>Сокращает и прописывает количество повторяющихся предметов в "О коте".</p>
      <input type="checkbox" id="compact-Mouth" data-setting="compactMouth" />
      <label for="compact-Mouth">Компактные инвентари</label>
    </div>

    <hr>
    <h2>Минное поле</h2>

    <div>
    <p>Включает окно для расчерчивания минного поля в Игровой.
    Выбранная ячейка готова принять в себя значение с клавиатуры от "0" до "7", "минус" ( - ) равняется красной клетке, а знак "равно" ( = ) ставит более яркую клетку, например для переходов,
    которая не будет очищаться при "Очистить всё поле/таблицу". Два раза прожмите на ячейку, чтобы очистить её значение.</p>
      <input type="checkbox" id="climbing-panel" data-setting="climbingPanel" />
      <label for="climbing-panel">Минное поле</label>
      <p>Здесь вы можете добавить/удалить Вкладки для хранения Таблиц и количество самих таблиц в выбранной вкладке.
      Не изменяйте !одновременно! ячейки минного поля и структуру Вкладок и Таблиц, а то можете потерять выставленные новые ячейки.</p>
        <h4>Вкладки</h4>
        <div id="uwu-buttonRow1-settings"></div>
        <h4>Локации</h4>
        <div id="uwu-buttonRow2-settings"></div>
    </div>

    <div>
      <p>Дописывает в чате громкость уведомления числом (В основном, когда с вами взаимодействуют боты, а в случае с лазалками - количество опасных клеток вокруг вас)</p>
      <input type="checkbox" id="climbing-Notifications-Numbers" data-setting="climbingNotificationsNumbers" />
      <label for="climbing-Notifications-Numbers">Подписывать громкость уведомления</label>
    </div>

    <div>
      <p>Звуковое уведомление, когда карта локации обновляется.</p>
      <input type="checkbox" id="climbing-Refresh-Notification" data-setting="climbingRefreshNotification" />
      <label for="climbing-Refresh-Notification">Уведомлять об перестановке</label>
    </div>

    <div id="climbingRefreshNotificationSoundContainer">
    <div class="custom-select" id="climbingRefreshNotificationSound">
      <div class="select-selected">Выберите звук</div>
      <div class="select-items">
        <!-- Опции будут добавлены сюда -->
      </div>
    </div>
  
    <div id="notification-volume">
    <p>Громкость</p>
      <input type="range" min="1" max="10" value="5" class="slider" id="climbing-Refresh-Notification-Volume" list="volumeStep"
        data-setting="climbingRefreshNotificationVolume">
      <datalist id="volumeStep">
        <option value="1">10%</option>
        <option value="5">50%</option>
        <option value="10">100%</option>
      </datalist>
    </div>
  </div>

    <hr>
    <h2>Быстрые ссылки</h2>

    <p>Быстрые ссылки в Игровой.</p>
    <div>
      <input type="checkbox" id="quick-Link1" data-setting="quickLink1" />
      <label for="quick-Link1">Настройки</label>
    </div>

    <div>
      <input type="checkbox" id="quick-Link2" data-setting="quickLink2" />
      <label for="quick-Link2">Памятка</label>
    </div>

    <div>
      <input type="checkbox" id="quick-Link3" data-setting="quickLink3" />
      <label for="quick-Link3">Блоги</label>
    </div>

    <div>
      <input type="checkbox" id="quick-Link4" data-setting="quickLink4" />
      <label for="quick-Link4">Лента</label>
    </div>

    <div>
      <p>Ваши ссылки. Вставляете ссылку, пробел и пишите название. Для множества просто пишите через запятую. Пример:
        https://мяу Котики, https://мяу2 Больше-котиков</p>
      <input type="text" id="users-quick-Links" placeholder=". . ." data-setting="userQuickLinks" />
    </div>

    <hr>
    <div>
      <h2>Настройки уведомлений</h2>
      <p>Уведомлять звуком, когда:</p>
    </div>
    
    <div>
      <input type="checkbox" id="notification-PM" data-setting="notificationPM" />
      <label for="notification-PM">Новое Личное Сообщение</label>
    </div>

    <div>
      <input type="checkbox" id="notification-Action-End" data-setting="notificationActionEnd" />
      <label for="notification-Action-End">Действие закончилось</label>
    </div>

    <div>
      <input type="checkbox" id="notification-In-Mouth" data-setting="notificationInMouth" />
      <label for="notification-In-Mouth">Кто-то меня поднял</label>
    </div>

    <div>
      <input type="checkbox" id="notification-In-Fight-Mode" data-setting="notificationInFightMode" />
      <label for="notification-In-Fight-Mode">Ввели в боевую стойку через Т+2 или Т+3</label>
    </div>

  </div>

  <div id="modules-panel">

    <h2>Главное</h2>
    <div>
      <p>Постоянное отображание Панели Расширенных Настроек в Игровой. Сама по себе пустая.</p>
      <input type="checkbox" id="extended-settings-Panel" data-setting="extendedSettingsPanel" />
      <label for="extended-settings-Panel">⚙️Панель Расширенных Настроек</label>
    </div>

    <div>
      <p>Отображает уведомление в ⚙️Панели Расширенных настроек в Игровой.</p>
      <input type="checkbox" id="show-Update-Notification" data-setting="showUpdateNotification" />
      <label for="show-Update-Notification">Уведомлять об обновлении Скрипта/Мода UwU</label>
    </div>

    <div>
      <p>⚙️Панели Расширенных Настроек не будет так скучно с рандомными фразами.</p>
      <input type="checkbox" id="show-Splash-Screens" data-setting="showSplashScreens" />
      <label for="show-Splash-Screens">Показывать Splash надписи.</label>
    </div>

    <div>
      <p>Скрывать или отображать расширенные подсказки к настройкам. Привет, я та самая расширенная подсказка. Делает Настройки CatWar UwU очень компактным на вид.</p>
      <input type="checkbox" id="extended-Hints" data-setting="extendedHints" />
      <label for="extended-Hints">Расширенные подсказки</label>
    </div>

    <hr>
    <h2>Гейм-Мастер</h2>
    <div>
      <p>⚠️Как пользователь, вы должны осознавать возможные риски и проблемы как с некоторым функционалом, так и с приватностью⚠️</p>
      <input type="checkbox" id="GM-beta-Test" data-setting="GMbetaTest" />
      <label for="GM-beta-Test">Стать тестировщиком функционала для Гейм-Мастеров.</label>
      <p>Что тут будет? Пока не ясно, могу лишь наобещать:</p>
      <p>- Показывать тревоги и уведомление от вашего племени/клана (Под большим сомнением)</p>
      <p>- Игровые режимы/комнаты (Очень хочется опробовать вернуть пошаговую боёвку, но в стиле Балдуры или Дивинити с передвижением и прочими плюхами)</p>
      <p>- Интерактив между котами и улучшение проводимости ивентов. Примером, Звуковые эмоции, или что-то в этом дух.</p>
      <p>- И ещё больше интерактива с Природными Эффектами при взаимодействии с локациями.</p>
    </div>

  <hr>
    <h2>Сборник стилей</h2>
    <p>Онлайн сборник стилей/модов/скриптов, которые не попали в основной функционал Скрипта/Мода UwU. Может и будет пополняться.</p>
  <hr>
    <div id="module-info">
    </div>

    <input type="text" id="private-module-input" placeholder=" . . . " />
    <button id="SettingSaveButton3">Сохранить</button> 

  <hr>
    <h2>Импорт/Экспорт</h2>

    <div>
      <p>Импорт/Экспорт всех настроек (Пока без расставленных блоков Компактной Игровой и Сборника Стилей).</p>
      <input type="text" id="exportSettings" placeholder="Экспорт"/>
      <input type="text" id="importSettings" placeholder="Импорт"/>
      <button id="importSettingsButton">Вставить</button>
    </div>

  </div>

  <hr>
</div>
`;
// ====================================================================================================================
//   . . . HTML БЛОК НОВОСТЕЙ . . .
// ====================================================================================================================
const newsPanel = `
<div id="news-panel">
  <button id="news-button">
    v${current_uwu_version} - 🌸 Свой статичный фон на локации, командные цвета для боёв и снова правки!
  </button>
  <div id="news-list" style="display: none">
    <h3>Главное</h3>
    <p>
      — Ну эм эм ну! Теперь вы можете выбрать цвета для оставшихся уникальных навыков, таких как ЦУ, Могущество и прочие! 
      Если быть точнее, это работает как "стандартный" цвет для навыков, если для этого навыка не выставлен какой-либо ещё цвет.
    </p>
    <hr>
    <h3>Внешний вид</h3>
    <p>— Небольшой редизайн покраса Навыков и Параметров.</p>
    <p>— Кнопка минного поля теперь тёмных оттенков, что позволяет ей не теряться на ярких дизайнах и фонах.</p>
    <p>— Маленькая укомплектовка вида настроек. Поднял строчки ввода размеров в строчки включения самой функции. Да и выглядит чуть опрятнее и понятнее.</p>
    <hr>
    <h3>Изменения кода</h3>
    <p>— Теперь Уведомление об обновлении скрипта изначально выключенно (Было встроенно хотфиксом в 1.19.0).</p>
    <p>— Переделано и упрощено определение Температуры Игровой в массив известных цветов.</p>
    <p>— Типо правка, возможность выставлять цвета "уникальных" навыков. Пока не поточненько, пока не выясну легально ли "раскрывать" остальные навыки. Хотя мне больше нравится нынешнее решение.</p>
    <p>— Переименовка констант вставки стилей (Я всё равно продолжил всё называть криво).</p>
    <p>— Вроде бы, надеюсь правильно, работает жалоба на игроков в чате.</p>
    <p>— Оптимизация производительности чата при помощи делегированных кликов.</p>
    <p>— Создана функция setupMutationObserver для упрощённой удобной динамической установки наблюдателей. Я отказываюсь использовать библиотеки когда я могу всё запилить сам.</p>
    <p>— Из-за новой установки наблюдателей Проценты параметров теперь не будут теряться...</p>
    <p>— ...И улучшен отклик изменений погодных эффектов и явлений.</p>
    <p>— Чота где-то удалил.</p>
    <hr>
    <p>Дата выпуска: 01.07.24</p>
  </div>
</div>
`;
// ====================================================================================================================
//   . . . HTML ПАНЕЛЬ РАСШИРЕННЫХ НАСТРОЕК . . .
// ====================================================================================================================
const extendedSettingsButton = `
<div id="uwu-extended-settings">
  <button type="button" id="extended-settings-button">
    <img src="https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/partly_sunny_rain.png" alt="Иконка"
      width="36" height="36">
  </button>

  <div id="extended-settings-container">
    <div id="splash-screen-panel"></div>

  </div>
</div>
`;
// ====================================================================================================================
//   . . . HTML БЛОК РУЧНОГО УПРАВЛЕНИЯ ПОГОДЫ . . .
// ====================================================================================================================
const manualWeatherPanel = `
<div id="manual-weather-panel">
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
`;
// ====================================================================================================================
//   . . . ГЛАВНЫЙ CSS СТИЛЬ . . .
// ====================================================================================================================
// TODO - Унифицировать шрифты, цвета текстов, прозрачность, закруглённость штучек ну кароче всё как надо чтобы не сделать в итоге лабиринт.
const css_uwu_main = `
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
  margin-top: 10px;
  margin-bottom: 15px;
  text-align: center;
}

#uwusettings h4 {
  margin-top: 5px;
  margin-left: 5px;
  margin-bottom: 5px;
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

#uwusettings .parameters-color-table,
#uwusettings .parameters-color-table tr,
#uwusettings .parameters-color-table td {
  border: 1px #232323 solid;
}

#colorSettingsTable,
#colorSettingsTable tr,
#colorSettingsTable td {
  border: 1px #232323 solid;
}

#uwusettings .parameters-color-table,
#colorSettingsTable {
  margin-top: 8px;
}

.rounded-image {
  background-repeat: repeat;
  background-attachment: fixed;
  border-radius: 20px;
}

#ref-vk {
  top: 25px;
  right: 25px;
  position: absolute;
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
#SettingSaveButton4,
#importSettingsButton {
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
#SettingSaveButton4:hover,
#importSettingsButton:hover {
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

#auroraPanel {
  width: 120px;
}

#notification-volume,
#step-slider {
  width: 150px;
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

#uwu-buttonRow1-settings,
#uwu-buttonRow2-settings {
  display: flex;
  margin-top: 3px;
}

#uwu-buttonRow1-settings button,
#uwu-buttonRow2-settings button  {
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2px 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 3px;
  margin-left: 0px;
}

#uwu-buttonRow1-settings > div > button.tab-button.active, #uwu-buttonRow2-settings > div > button.table-button.active {
  background-color: #abf6ffb0;
}

#uwu-global-container {
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

#manual-weather-panel,
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
#aurora-pos,
#notification-MyName-Volume,
#climbing-Refresh-Notification-Volume,
#cells-Borders-Thickness {
  width: 100%;
  cursor: pointer;
  -webkit-appearance: none;
  background-color: rgba(255, 255, 255, 0.06) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 10px;
  height: 10px;
  outline: none;
}

#manualWeather::-webkit-slider-thumb,
#aurora-pos::-webkit-slider-thumb,
#notification-MyName-Volume::-webkit-slider-thumb,
#climbing-Refresh-Notification-Volume::-webkit-slider-thumb,
#cells-Borders-Thickness::-webkit-slider-thumb  {
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

#WeatherStep,
#auroraStep,
#volumeStep,
#ThicknessStep {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
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

#button-container {
  display: flex;
  flex-wrap: wrap;
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
#manualFirefly_On:hover{
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

.custom-select {
  position: relative;
  display: inline-block;
}

.select-selected {
  margin-top: 10px;
  width: 120px;
  border-radius: 10px;
  color: white;
  background-color: #5c5c5c;
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px); 
  padding: 10px;
  cursor: pointer;
}

.select-items {
  margin-top: 5px;
  display: none;
  position: absolute;
  border-radius: 10px;
  width: 120px;
  color: white;
  background-color: #5c5c5c;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px); 
  z-index: 1;
}

.select-items div {
  padding: 8px 16px;
  cursor: pointer;
}

.select-items div:hover {
  background-color: #757575;
}

.custom-select.active .select-items {
  display: block;
}

#climbingRefreshNotificationSoundContainer button,
#myNameNotificationSoundContainer button {
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2px 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 3px;
  margin-left: 0px;
}

#climbingRefreshNotificationSoundContainer,
#myNameNotificationSoundContainer {
  gap: 5px;
  display: flex;
  align-items: center;
}

.update-notification {
  background-color: #78c8ff69;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.new-update::before {
  content: "•";
  color: #78c8ff;
  font-size: 4em;
  position: absolute;
  top: -20px;
  right: -5px;
}

.random-phrase-block {
  margin-bottom: 10px;
  width: 100%;
  border-radius: 10px;

  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);

  box-sizing: border-box;
  padding: 5px;
}
`;
document.head.insertAdjacentHTML('beforeend', `<style id="css_uwu_main">${css_uwu_main}</style>`);

// ====================================================================================================================
//   . . . ПРОЗРАЧНЫЙ CSS СТИЛЬ . . .
// ====================================================================================================================
// Glassmorphism вперёд Glassmorphism вперёд Glassmorphism вперёд Glassmorphism вперёд Glassmorphism вперёд
const css_uwu_glass = `

`; 
document.head.insertAdjacentHTML('beforeend', `<style id="css_uwu_glass">${css_uwu_glass}</style>`);
// ====================================================================================================================
//  . . . СОХРАНЕНИЯ И ЗАГРУЗКА НАСТРОЕК . . .
// ====================================================================================================================
function saveSettings() {
  try {
    localStorage.setItem("uwu-settings", JSON.stringify(settings));
    // console.log("Настройки сохранены:", settings);
  } catch (error) {
    console.error("Не удалось сохранить настройки:", error);
  }
}

function loadSettings() {
  const storedSettings = localStorage.getItem("uwu-settings");
  if (storedSettings && typeof storedSettings === "string") {
    const loadedSettings = JSON.parse(storedSettings);
    settings = { ...settings, ...loadedSettings };
  } else {
    console.log("Нет сохраненных настроек");
  }
}
// ====================================================================================================================
//   . . . ДИНАМИЧНЫЙ ОБОЗРЕВАТЕЛЬ . . .
// ====================================================================================================================
// TODO - Не забыть, что у меня существует теперь это.
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

async function setupMutationObserver(selector, callback, options = { attributes: true, attributeFilter: ["style"] }, maxAttempts = 8, delay = 500) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const element = document.querySelector(selector);
    if (element) {
      const observer = new MutationObserver(debounce(callback, 200));
      observer.observe(element, options);
      // console.log(`Наблюдатель установлен для элемента с селектором "${selector}".`);
      callback();
      return;
    }
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  console.warn(`Элемент с селектором "${selector}" не найден после ${maxAttempts} попыток.`);
}
// ====================================================================================================================
//  . . . ВНЕШНИЙ ВИД ПАНЕЛИ НАСТРОЕК . . .
// ====================================================================================================================
function createSettingsBlock(blockId, content) {
  const siteTable = document.querySelector("#site_table");
  const isMobile = siteTable.getAttribute("data-mobile") === "0";
  const backgroundImage = window.getComputedStyle(
    document.body
  ).backgroundImage;

  const settingsElement = document.createElement("div");
  settingsElement.classList.add("rounded-image");
  settingsElement.id = blockId;
  settingsElement.innerHTML = content;
  settingsElement.style.backgroundImage = backgroundImage;

  const settingsContainer = isMobile
    ? document.querySelector("#branch")
    : siteTable;
  settingsContainer.appendChild(settingsElement);
}
// ====================================================================================================================
//  . . . РАБОТА ПАНЕЛИ НАСТРОЕК . . .
// ====================================================================================================================
if (targetSettings.test(window.location.href)) {
  createSettingsBlock("uwu-settings", uwusettings);

  const uwuSettingsElement = document.getElementById("uwusettings");
  if (uwuSettingsElement) {
    uwuSettingsElement.insertAdjacentHTML("beforeend", newsPanel);
  }

  loadSettings();

  if (!settings.extendedHints) {
    const uwuHideHints = document.createElement("style");
    uwuHideHints.innerHTML = `
    #uwusettings p {
      display: none;
    }
    `;
    document.head.appendChild(uwuHideHints);
  }

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
    .querySelectorAll('#parameters-color-settings input[type="color"]')
    .forEach((element) => {
      element.addEventListener("change", () => {
        const paramId = element.dataset.param;
        const colorType = element.dataset.colorType;
        const colorValue = element.value;

        if (!settings.parametersColors[paramId]) {
          settings.parametersColors[paramId] = [];
        }
        const colorIndex =
          colorType === "bar-from"
            ? 0
            : colorType === "bar-to"
            ? 1
            : colorType === "bg-from"
            ? 2
            : 3;
        settings.parametersColors[paramId][colorIndex] = colorValue;

        saveSettings();
      });
    });

  function restoreColorPickers() {
    for (const paramId in settings.parametersColors) {
      const colors = settings.parametersColors[paramId];

      const barFromInput = document.querySelector(
        `#parameters-color-settings input[type="color"][data-param="${paramId}"][data-color-type="bar-from"]`
      );
      const barToInput = document.querySelector(
        `#parameters-color-settings input[type="color"][data-param="${paramId}"][data-color-type="bar-to"]`
      );
      const bgFromInput = document.querySelector(
        `#parameters-color-settings input[type="color"][data-param="${paramId}"][data-color-type="bg-from"]`
      );
      const bgToInput = document.querySelector(
        `#parameters-color-settings input[type="color"][data-param="${paramId}"][data-color-type="bg-to"]`
      );

      if (barFromInput) barFromInput.value = colors[0];
      if (barToInput) barToInput.value = colors[1];
      if (bgFromInput) bgFromInput.value = colors[2];
      if (bgToInput) bgToInput.value = colors[3];
    }
  }
  restoreColorPickers();

  document
    .querySelectorAll('#colorSettingsTable input[type="color"]')
    .forEach((element) => {
      element.addEventListener("change", () => {
        const team = `team${element.dataset.team}`;
        const part = element.dataset.part === "green" ? 0 : 1;
        const colorValue = element.value;
        settings.FightTeamsColors[team][part] = colorValue;
        saveSettings();
      });
    });

  function restoreColorTeamsPickers() {
    document
      .querySelectorAll('#colorSettingsTable input[type="color"]')
      .forEach((element) => {
        element.addEventListener("change", () => {
          const team = `team${element.dataset.team}`;
          const part = element.dataset.part === "green" ? 0 : 1;
          const colorValue = element.value;
          settings.FightTeamsColors[team][part] = colorValue;
          saveSettings();
        });
      });
  }

  restoreColorTeamsPickers();
  // ====================================================================================================================
  //  . . . ВЗАИМОИСКЛЮЧАЮЩИЕСЯ ЧЕКБОКСЫ . . .
  // ====================================================================================================================
  const exclusiveCheckboxGroups = [
    ["backgroundRepeat", "backgroundUser"],
    ["parametersBackgroundImage", "parametersUserBackgroundImage"],
  ];

  document
    .querySelectorAll("#uwusettings [data-setting]")
    .forEach((element) => {
      const setting = element.dataset.setting;
      element.addEventListener("change", () => {
        if (element.type === "checkbox") {
          const group = exclusiveCheckboxGroups.find((g) =>
            g.includes(setting)
          );
          if (group) {
            group.forEach((s) => {
              if (s !== setting) {
                settings[s] = false;
                document.querySelector(
                  `#uwusettings [data-setting="${s}"]`
                ).checked = false;
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
  // ====================================================================================================================
  //  . . . СОЗДАНИЕ ВЫПАДАЮЩИХ СПИСКОВ ПРИ ПОМОЩИ ФУНКЦИИ createCustomSelect . . .
  // ====================================================================================================================
  // Звуки звуки звуки, вуху.
  const notificationSounds = [
    { name: "Звук 1", id: "notificationSound1" },
    { name: "Звук 2", id: "notificationSound2" },
    { name: "Звук 3", id: "notificationSound3" },
  ];

  loadSettings();
  if (settings["myNameNotificationSound"]) {
    const selectedOption = notificationSounds.find(
      (option) => option.id === settings["myNameNotificationSound"]
    );
    document
      .getElementById("myNameNotificationSound")
      .querySelector(".select-selected").textContent = selectedOption.name;
  }

  loadSettings();
  if (settings["climbingRefreshNotificationSound"]) {
    const selectedOption = notificationSounds.find(
      (option) => option.id === settings["climbingRefreshNotificationSound"]
    );
    document
      .getElementById("climbingRefreshNotificationSound")
      .querySelector(".select-selected").textContent = selectedOption.name;
  }

  createCustomSelect("climbingRefreshNotificationSound", notificationSounds);
  createCustomSelect("myNameNotificationSound", notificationSounds);

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
  //   . . . КНОПКА ТЕСТА ЗВУКОВ . . .
  // ====================================================================================================================
  function addSoundTestButton(
    containerId,
    settingsKeyForSound,
    settingsKeyForVolume
  ) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Контейнер с ID ${containerId} не найден.`);
      return;
    }

    const testButton = document.createElement("button");
    testButton.textContent = "Тест звука";
    testButton.addEventListener("click", () => {
      const selectedSoundId = settings[settingsKeyForSound];
      const volume = settings[settingsKeyForVolume] || 5;
      if (selectedSoundId) {
        soundManager.playSound(selectedSoundId, volume);
      } else {
        console.error(
          `Выбранный звук для контейнера ${containerId} не найден.`
        );
      }
    });

    container.appendChild(testButton);
  }

  addSoundTestButton(
    "climbingRefreshNotificationSoundContainer",
    "climbingRefreshNotificationSound",
    "climbingRefreshNotificationVolume"
  );
  addSoundTestButton(
    "myNameNotificationSoundContainer",
    "myNameNotificationSound",
    "notificationMyNameVolume"
  );
  // ====================================================================================================================
  //   . . . СОЗДАНИЕ ВЫПАДАЮЩИХ СПИСКОВ . . .
  // ====================================================================================================================
  function createCustomSelect(selectId, options) {
    const selectContainer = document.getElementById(selectId);
    const selectedElement = selectContainer.querySelector(".select-selected");
    const optionsContainer = selectContainer.querySelector(".select-items");

    options.forEach((option, index) => {
      const optionElement = document.createElement("div");
      optionElement.textContent = option.name;
      optionElement.dataset.id = option.id;

      optionElement.addEventListener("click", () => {
        selectedElement.textContent = option.name;
        settings[selectId] = option.id;
        saveSettings();
        selectContainer.classList.remove("active");
      });

      optionsContainer.appendChild(optionElement);
    });

    selectedElement.addEventListener("click", () => {
      selectContainer.classList.toggle("active");
    });
  }
  // ====================================================================================================================
  //  . . . ИМПОРТ / ЭКСПОРТ НАСТРОЕК . . .
  // ====================================================================================================================
  const importButton = document.getElementById("importSettingsButton");
  const importSettingsInput = document.getElementById("importSettings");
  const exportSettingsInput = document.getElementById("exportSettings");

  importButton.addEventListener("click", () => {
    const importedSettings = importSettingsInput.value;

    try {
      const parsedSettings = JSON.parse(importedSettings);
      settings = { ...settings, ...parsedSettings };
      localStorage.setItem("uwu-settings", JSON.stringify(settings));
      console.log("Настройки импортированы:", settings);
    } catch (error) {
      console.error("Ошибка при импорте настроек:", error);
    }
    updateExportField();
  });

  function updateExportField() {
    const settingsToExport = JSON.stringify(settings);
    exportSettingsInput.value = settingsToExport;
  }

  loadSettings();
  updateExportField();
  // ====================================================================================================================
  //  . . . МАКЕТ КАСТОМИЗАЦИИ ИГРОВОЙ . . .
  // ====================================================================================================================
  const blockNames = {
    tr_info: "Информация",
    tr_tos: "Погода",
    tr_chat: "Чат",
    tr_actions: "Действия",
    tr_mouth: "Во рту",
    // 'tr_sky': 'Небо',
  };
  const leftColumn = document.querySelector("#layout-customizer .column.left");
  const rightColumn = document.querySelector(
    "#layout-customizer .column.right"
  );

  function createBlockElement(blockId) {
    const blockElement = document.createElement("div");
    blockElement.classList.add("block", blockId);

    const blockName = document.createElement("span");
    blockName.textContent = blockNames[blockId];
    blockElement.appendChild(blockName);

    const controlsWrapper = document.createElement("div");
    controlsWrapper.classList.add("controls");

    if (blockId === "tr_info") {
      const moveInfoButton = document.createElement("button");
      moveInfoButton.textContent = "⏪Переместить⏩";
      moveInfoButton.classList.add("move-info", "install-button");
      moveInfoButton.addEventListener("click", () => {
        swapColumns(blockElement);
      });
      controlsWrapper.appendChild(moveInfoButton);
    } else {
      const moveUpButton = document.createElement("button");
      moveUpButton.textContent = "🔼Вверх";
      moveUpButton.classList.add("move-up", "install-button");
      moveUpButton.addEventListener("click", () => {
        const previousBlock = blockElement.previousElementSibling;
        if (previousBlock) {
          blockElement.parentNode.insertBefore(blockElement, previousBlock);
        }
      });
      controlsWrapper.appendChild(moveUpButton);

      const moveDownButton = document.createElement("button");
      moveDownButton.textContent = "🔽Вниз";
      moveDownButton.classList.add("move-down", "install-button");
      moveDownButton.addEventListener("click", () => {
        const nextBlock = blockElement.nextElementSibling;
        if (nextBlock) {
          blockElement.parentNode.insertBefore(nextBlock, blockElement);
        }
      });
      controlsWrapper.appendChild(moveDownButton);
    }

    blockElement.appendChild(controlsWrapper);
    return blockElement;
  }

  function swapColumns(blockElement) {
    if (blockElement.parentNode === leftColumn) {
      const rightColumnBlocks = Array.from(rightColumn.children);
      rightColumn.innerHTML = "";
      rightColumn.appendChild(blockElement);
      rightColumnBlocks.forEach((block) => leftColumn.appendChild(block));
    } else {
      const leftColumnBlocks = Array.from(leftColumn.children);
      leftColumn.innerHTML = "";
      leftColumn.appendChild(blockElement);
      leftColumnBlocks.forEach((block) => rightColumn.appendChild(block));
    }
  }

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
    } else {
      const defaultLeftBlocks = ["tr_info"];
      const defaultRightBlocks = [
        "tr_tos",
        "tr_chat",
        "tr_actions",
        "tr_mouth",
      ];

      defaultLeftBlocks.forEach((blockId) => {
        leftColumn.appendChild(createBlockElement(blockId));
      });

      defaultRightBlocks.forEach((blockId) => {
        rightColumn.appendChild(createBlockElement(blockId));
      });

      const layoutSettings = {
        leftBlocks: defaultLeftBlocks,
        rightBlocks: defaultRightBlocks,
      };
      localStorage.setItem("layoutSettings", JSON.stringify(layoutSettings));
    }
  }

  window.addEventListener("load", loadLayoutSettings);
  // ====================================================================================================================
  //  . . . РЕДАКТОР ВКЛАДОК И ТАБЛИЦ МИННОГО ПОЛЯ . . .
  // ====================================================================================================================
  // как же я ненавижу минное поле как же я ненавижу минное поле как же я ненавижу минное поле
  const tabManager = {
    tabs: [],
    currentTabIndex: 0,

    createTab(name) {
      const newTab = {
        name: name,
        tables: [],
        currentTableId: 0,
      };

      this.tabs.push(newTab);
      this.renderTabs();
      renderTablesInSettings();
      this.switchTab(this.tabs.length - 1);
    },

    createTable(
      tableName = `Локация ${this.tabs[this.currentTabIndex].tables.length + 1}`
    ) {
      const currentTab = this.tabs[this.currentTabIndex];
      currentTab.tables.push({ name: tableName });
      this.saveState();
      renderTablesInSettings();
    },

    removeTable(tableIndex) {
      const currentTab = this.tabs[this.currentTabIndex];
      if (currentTab && currentTab.tables[tableIndex]) {
        currentTab.tables.splice(tableIndex, 1);
        if (currentTab.currentTableId === tableIndex) {
          currentTab.currentTableId = Math.max(
            0,
            currentTab.currentTableId - 1
          );
        }
        renderTablesInSettings();
      }
    },

    removeTab(index) {
      this.tabs.splice(index, 1);
      if (index === this.currentTabIndex) {
        this.currentTabIndex = Math.max(0, this.currentTabIndex - 1);
      }
      this.renderTabs();
      renderTablesInSettings();
    },

    switchTab(index) {
      this.currentTabIndex = index;
      renderTablesInSettings();

      const tabButtons = document.querySelectorAll(".tab-button");
      tabButtons.forEach((button, i) => {
        if (i === this.currentTabIndex) {
          button.classList.add("active");
        } else {
          button.classList.remove("active");
        }
      });
    },

    switchTable(tableIndex) {
      const currentTab = this.tabs[this.currentTabIndex];
      if (currentTab) {
        currentTab.currentTableId = tableIndex;
        renderTablesInSettings();
      }
    },

    saveState() {
      localStorage.setItem("climbingPanelState", JSON.stringify(this));
    },

    renderTabs() {
      const tabRow = document.getElementById("uwu-buttonRow1-settings");
      tabRow.innerHTML = "";

      this.tabs.forEach((tab, index) => {
        const tabButton = document.createElement("button");
        tabButton.textContent = tab.name;
        tabButton.classList.add("tab-button");

        if (index === this.currentTabIndex) {
          tabButton.classList.add("active");
        }

        tabButton.addEventListener("click", () => this.switchTab(index));

        const removeButton = document.createElement("button");
        removeButton.textContent = "X";
        removeButton.classList.add("remove-button");

        removeButton.addEventListener("click", () => this.removeTab(index));

        const tabContainer = document.createElement("div");
        tabContainer.classList.add("tab-container");
        tabContainer.appendChild(tabButton);
        tabContainer.appendChild(removeButton);

        tabRow.appendChild(tabContainer);
      });

      const addTabButton = document.createElement("button");
      addTabButton.textContent = "+";
      addTabButton.classList.add("add-button");
      addTabButton.addEventListener("click", () =>
        this.createTab(`Вкладка ${this.tabs.length + 1}`)
      );
      tabRow.appendChild(addTabButton);
    },
  };

  const savedState = localStorage.getItem("climbingPanelState");
  if (savedState) {
    const state = JSON.parse(savedState);
    Object.assign(tabManager, state);
  }

  function renderTabsInSettings() {
    const tabRow = document.getElementById("uwu-buttonRow1-settings");
    tabRow.innerHTML = "";

    tabManager.tabs.forEach((tab, index) => {
      const tabButton = document.createElement("button");
      tabButton.textContent = tab.name;
      tabButton.classList.add("tab-button");

      if (index === tabManager.currentTabIndex) {
        tabButton.classList.add("active");
      }

      tabButton.addEventListener("click", () => {
        tabManager.switchTab(index);
        renderTablesInSettings();
      });

      const removeButton = document.createElement("button");
      removeButton.textContent = "X";
      removeButton.classList.add("remove-button");

      removeButton.addEventListener("click", () => {
        tabManager.removeTab(index);
        renderTabsInSettings();
        renderTablesInSettings();
        tabManager.saveState();
      });

      const tabContainer = document.createElement("div");
      tabContainer.classList.add("tab-container");
      tabContainer.appendChild(tabButton);
      tabContainer.appendChild(removeButton);

      tabRow.appendChild(tabContainer);
    });
    const addTabButton = document.createElement("button");
    addTabButton.textContent = "+";
    addTabButton.classList.add("add-button");
    addTabButton.addEventListener("click", () => {
      const tabName = prompt("Введите имя вкладки:");
      if (tabName) {
        tabManager.createTab(tabName);
        renderTabsInSettings();
        tabManager.saveState();
      }
    });
    tabRow.appendChild(addTabButton);
  }

  function renderTablesInSettings() {
    const tableRow = document.getElementById("uwu-buttonRow2-settings");
    tableRow.innerHTML = "";

    const currentTab = tabManager.tabs[tabManager.currentTabIndex];

    if (tabManager.tabs.length > 0 && currentTab) {
      currentTab.tables.forEach((table, index) => {
        const tableButton = document.createElement("button");
        tableButton.textContent = table.name;
        tableButton.classList.add("table-button");

        tableButton.addEventListener("click", () => {
          tabManager.switchTable(index);
        });

        tableButton.dataset.tableindex = index;

        const removeButton = document.createElement("button");
        removeButton.textContent = "X";
        removeButton.classList.add("remove-button");

        removeButton.addEventListener("click", () => {
          tabManager.removeTable(index);
          renderTablesInSettings();
          tabManager.saveState();
        });

        const tableContainer = document.createElement("div");
        tableContainer.classList.add("table-container");
        tableContainer.appendChild(tableButton);
        tableContainer.appendChild(removeButton);

        tableRow.appendChild(tableContainer);
      });

      const addTableButton = document.createElement("button");
      addTableButton.textContent = "+";
      addTableButton.classList.add("add-button");

      addTableButton.addEventListener("click", () => {
        const tableName = prompt("Введите имя поля:");
        if (tableName) {
          tabManager.createTable(tableName);
          renderTablesInSettings();
          tabManager.saveState();
        }
      });

      tableRow.appendChild(addTableButton);
    }
  }

  renderTabsInSettings();
  renderTablesInSettings();
}
// ====================================================================================================================
//  . . . ВКЛАДКИ ГЛАВНЫХ НАСТРОЕК . . .
// ====================================================================================================================
if (targetSettings.test(window.location.href)) {
  const buttonContainer = document.getElementById("button-container");

  buttonContainer.addEventListener("click", (event) => {
    const clickedElement = event.target;
    const clickedButton = clickedElement.closest("button");
    if (!clickedButton) return;

    const panelId = clickedButton.id.replace("button", "panel");
    const targetPanel = document.getElementById(panelId);

    buttonContainer.querySelectorAll("button").forEach((button) => {
      const correspondingPanelId = button.id.replace("button", "panel");
      const correspondingPanel = document.getElementById(correspondingPanelId);

      correspondingPanel.style.display =
        correspondingPanel === targetPanel ? "block" : "none";
      button.classList.toggle("active", button === clickedButton);
    });
  });

  const defaultButton = buttonContainer.querySelector("button");
  const defaultPanelId = defaultButton.id.replace("button", "panel");
  const defaultPanel = document.getElementById(defaultPanelId);

  buttonContainer.querySelectorAll("button").forEach((button) => {
    const correspondingPanelId = button.id.replace("button", "panel");
    const correspondingPanel = document.getElementById(correspondingPanelId);

    if (correspondingPanel !== defaultPanel) {
      correspondingPanel.style.display = "none";
    }
  });

  defaultPanel.style.display = "block";
  defaultButton.classList.add("active");
}
// ====================================================================================================================
//  . . . МОДУЛЬНОСТЬ СКРИПТА . . .
// ====================================================================================================================
// буду вечно задаваться вопросом, а зачем я это вообще сделал..................
// фортнайт магазин сделать вхъазваъхзпъхазыв
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
  const url =
    "https://raw.githubusercontent.com/Ibirtem/CatWar/main/modules/modules.txt";

  const targetSettings = /^https:\/\/catwar\.su\/settings/;
  if (!targetSettings.test(window.location.href)) {
    return;
  }

  try {
    const response = await fetch(url);
    const moduleList = await response.text();
    const modules = moduleList.split("\n").filter((line) => line.trim() !== "");

    const moduleInfoContainer = document.getElementById("module-info");
    const privateModuleInput = document.getElementById("private-module-input");
    const saveButton = document.getElementById("SettingSaveButton3");

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
  const url =
    "https://raw.githubusercontent.com/Ibirtem/CatWar/main/modules/modules.txt";

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
    activateModule(cachedModule, moduleName, description, version);
  } else {
    const url = `https://raw.githubusercontent.com/Ibirtem/CatWar/main/modules/${moduleName}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.text();
        localStorage.setItem(moduleName, data);
        activateModule(data, moduleName, description, version);

        moduleStates[moduleName] = true;
        localStorage.setItem("moduleStates", JSON.stringify(moduleStates));

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
    GM_addStyle(data); // TODO - убрать на ванильную JS
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
window.addEventListener("load", activateModules);
// ====================================================================================================================
//   . . . ЗАГРУЗКА НАСТРОЕК . . .
// ====================================================================================================================
loadSettings();
// ====================================================================================================================
//   . . . АВАТАРЫ В КОММЕНТАРИЯХ . . .
// ====================================================================================================================
if (window.location.href !== targetCW3) {
  if (settings.commentsAvatars) {
    const checkForComments = setInterval(() => {
      const comments = document.querySelectorAll(".view-comment");
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
//   . . . МЕНЕДЖЕР ЗВУКОВ . . .
// ====================================================================================================================
function createSoundManager() {
  const sounds = {};
  let isUserInteracted = false;
  let lastPendingSound = null;

  function loadSound(id, url) {
    const audio = new Audio(url);
    sounds[id] = audio;
  }

  function playSound(id, volume) {
    return new Promise((resolve, reject) => {
      if (sounds[id]) {
        sounds[id].currentTime = 0;
        sounds[id].volume = volume / 10;
        sounds[id]
          .play()
          .then(resolve)
          .catch((error) => {
            if (!isUserInteracted) {
              console.warn(
                "Политика браузера заблокировала звук. Ждём взаимодействия со стороны пользователя для новой попытки."
              );
              lastPendingSound = { id, volume, resolve };
            } else {
              reject(error);
            }
          });
      } else {
        reject(new Error(`Звук с ID ${id} не найден.`));
      }
    });
  }

  function playSoundNow(id, volume, resolve) {
    sounds[id]
      .play()
      .then(resolve)
      .catch((error) => {
        console.error(`Не удалось воспроизвести звук с ID ${id}:`, error);
        resolve();
      });
  }

  function handleUserInteraction() {
    isUserInteracted = true;
    document.removeEventListener("click", handleUserInteraction);
    document.removeEventListener("touchstart", handleUserInteraction);
    document.removeEventListener("keydown", handleUserInteraction);

    if (lastPendingSound) {
      const { id, volume, resolve } = lastPendingSound;
      playSoundNow(id, volume, resolve);
      lastPendingSound = null;
    }
  }

  document.addEventListener("click", handleUserInteraction);
  document.addEventListener("touchstart", handleUserInteraction);
  document.addEventListener("keydown", handleUserInteraction);

  return {
    loadSound,
    playSound,
  };
}

const soundManager = createSoundManager();

// ===================== СПИСОК ДОСТУПНЫХ ЗВУКОВ =====================
soundManager.loadSound(
  "notificationSound1",
  "https://github.com/Ibirtem/CatWar/raw/main/sounds/notification_1.ogg"
);
soundManager.loadSound(
  "notificationSound2",
  "https://github.com/Ibirtem/CatWar/raw/main/sounds/notification_2.ogg"
);
soundManager.loadSound(
  "notificationSound3",
  "https://github.com/Ibirtem/CatWar/raw/main/sounds/notification_3.ogg"
);
// =====================  =====================

// ====================================================================================================================
//  . . . ЗАГРУЗКА КОДА В ИГРОВОЙ . . .
// ====================================================================================================================
// Игровая ли... Я чё знаю?
if (window.location.href === targetCW3) {
  const containerElement = document.querySelector("body");
  const globalContainerElement = document.createElement("div");
  globalContainerElement.id = "uwu-global-container";
  containerElement.appendChild(globalContainerElement);
  // ====================================================================================================================
  //  . . . РАСШИРЕННЫЕ НАСТРОЙКИ . . .
  // ====================================================================================================================
  const extendedSettingsButtonElement = document.createElement("div");
  extendedSettingsButtonElement.innerHTML = extendedSettingsButton;
  globalContainerElement.appendChild(extendedSettingsButtonElement);

  const panel = extendedSettingsButtonElement.querySelector(
    "#uwu-extended-settings"
  );
  const extendedSettingsContainer = extendedSettingsButtonElement.querySelector(
    "#extended-settings-container"
  );
  const button = extendedSettingsButtonElement.querySelector(
    "#extended-settings-button"
  );

  extendedSettingsContainer.style.display = "none";

  const shouldShowPanel = () => {
    return (
      settings.extendedSettingsPanel ||
      settings.showSplashScreens ||
      settings.showUpdateNotification ||
      settings.manualWeatherPanel
    );
  };

  if (shouldShowPanel()) {
    panel.style.display = "block";
  } else {
    panel.style.display = "none";
  }

  button.addEventListener("click", () => {
    extendedSettingsContainer.style.display =
      extendedSettingsContainer.style.display === "none" ? "block" : "none";

    button.classList.remove("new-update");
  });
  // ====================================================================================================================
  //  . . . СПЛЕШ СКРИН . . .
  // ====================================================================================================================
  if (settings.showSplashScreens) {
    const randomPhraseBlock = document.createElement("div");
    const splashPanel = extendedSettingsButtonElement.querySelector(
      "#splash-screen-panel"
    );
    randomPhraseBlock.classList.add("random-phrase-block");
    splashPanel.appendChild(randomPhraseBlock);

    function loadRandomPhrase(url) {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.status}`);
          }
          return response.text();
        })
        .then((text) => {
          const phrases = text.split("\n").filter((line) => line.trim() !== "");
          const randomIndex = Math.floor(Math.random() * phrases.length);
          randomPhraseBlock.innerHTML = parseColorCodes(phrases[randomIndex]);
        })
        .catch((error) => {
          console.error("Ошибка при загрузке случайной фразы:", error);
          randomPhraseBlock.textContent = "Не удалось загрузить фразу :(";
        });
    }

    function parseColorCodes(text) {
      const colorMap = {
        "&0": "</span>", // - Сброс -
        "&1": "<span style='color: blue;'>", // Синий
        "&2": "<span style='color: green;'>", // Зеленый
        "&3": "<span style='color: aqua;'>", // Бирюзовый
        "&4": "<span style='color: red;'>", // Красный
        "&5": "<span style='color: #dc00dc;'>", // Фиолетовый
        "&6": "<span style='color: gold;'>", // Золотой
        "&7": "<span style='color: pink;'>", // Розовый
        "&8": "<span style='color: white;'>", // Белый
        "&9": "<span style='color: black;'>", // Черный
      };

      text = "<b>" + text;

      for (const code in colorMap) {
        text = text.replace(new RegExp(code, "g"), colorMap[code]);
      }

      return text;
    }

    window.addEventListener("load", () => {
      loadRandomPhrase(
        "https://raw.githubusercontent.com/Ibirtem/CatWar/main/texts/text.txt"
      );
    });
  }
  // ====================================================================================================================
  //  . . . УВЕДОМЛЕНИЕ ОБ ОБНОВЛЕНИИ . . .
  // ====================================================================================================================
  function showUpdateNotification(oldVersion) {
    const panel = document.getElementById("extended-settings-container");
    const notificationBlock = document.createElement("div");
    notificationBlock.classList.add("update-notification");
    notificationBlock.innerHTML = `
          <p>Скрипт/Мод UwU был обновлен с версии v${
            oldVersion || "неизвестной"
          } до версии v${current_uwu_version}!</p>
          <p>Можете посетить <a href="https://catwar.su/settings" target="_blank">Настройки</a> для ознакомления с изменениями.</p>
        `;
    panel.appendChild(notificationBlock);
    const button = extendedSettingsButtonElement.querySelector("button");
    button.classList.add("new-update");
  }

  window.addEventListener("load", () => {
    const savedVersion = localStorage.getItem("uwu-version");
    if (savedVersion !== current_uwu_version) {
      localStorage.setItem("uwu-version", current_uwu_version);
    }
    if (
      settings.showUpdateNotification &&
      savedVersion !== current_uwu_version
    ) {
      showUpdateNotification(savedVersion);
    }
  });

  // ====================================================================================================================
  //  . . . РУЧНОЕ УПРАВЛЕНИЕ ПОГОДОЙ . . .
  // ====================================================================================================================
  if (settings.manualWeatherPanel) {
    const panel = extendedSettingsButtonElement.querySelector(
      "#extended-settings-container"
    );
    panel.innerHTML += manualWeatherPanel;

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
  //  . . . ДЕЙСТВИЯ ПРИ НАВОДКЕ НА .cat . . .
  // ====================================================================================================================
  document.addEventListener("mouseover", (event) => {
    const catElement = event.target.closest(".cat");

    if (catElement) {
      const catTooltip = catElement.querySelector(".cat_tooltip");

      if (
        settings.showMoreCatInfo &&
        !catTooltip.querySelector(".more-info-link")
      ) {
        const moreInfoLink = document.createElement("a");
        moreInfoLink.classList.add("more-info-link");
        moreInfoLink.textContent = "Подробнее";
        moreInfoLink.addEventListener("click", () => {
          showCatInfo(catElement);
        });

        const moreInfoContainer = document.createElement("div");
        moreInfoContainer.classList.add("more-info-container");
        moreInfoContainer.appendChild(moreInfoLink);

        const onlineSpan = catTooltip.querySelector("span.online");
        onlineSpan.parentNode.insertBefore(moreInfoContainer, onlineSpan);
      }

      if (settings.compactMouth) {
        compactInventory(catElement);
      }
    }
  });
  // ====================================================================================================================
  //  . . . КОМПАКТНЫЙ РОТ АХХАХХА . . .
  // ====================================================================================================================
  function compactInventory(cat) {
    const originalMouth = cat.querySelector(".cat_tooltip .mouth");

    if (originalMouth) {
      const existingSortedMouths = cat.querySelectorAll(".mouth.uwu-sorted");
      existingSortedMouths.forEach((mouth) => mouth.remove());

      const newMouth = document.createElement("ol");
      newMouth.classList.add("mouth", "uwu-sorted");
      originalMouth.parentNode.insertBefore(
        newMouth,
        originalMouth.nextSibling
      );

      originalMouth.style.display = "none";

      const inventory = new Map();
      const cats = [];

      [...originalMouth.querySelectorAll("li img")].forEach((img) => {
        const itemSrc = img.getAttribute("src");
        inventory.set(itemSrc, (inventory.get(itemSrc) || 0) + 1);
      });

      [...originalMouth.querySelectorAll("li")].forEach((item) => {
        if (!item.querySelector("img")) {
          cats.push(item.innerHTML);
        }
      });

      newMouth.innerHTML = "";
      for (const [itemSrc, count] of inventory) {
        const listItem = document.createElement("li");
        const itemImage = document.createElement("img");
        itemImage.setAttribute("src", itemSrc);
        listItem.appendChild(itemImage);

        if (count > 1) {
          const countSpan = document.createElement("span");
          countSpan.textContent = `x${count}`;
          listItem.appendChild(countSpan);
        }

        newMouth.appendChild(listItem);
      }

      cats.forEach((catHtml) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = catHtml;
        newMouth.appendChild(listItem);
      });
    }
  }
  // ====================================================================================================================
  //  . . . БОЛЬШЕ ИНФОРМАЦИИ В "О КОТЕ" . . .
  // ====================================================================================================================
  const defectsInfo = {
    wound: {
      name: "Раны",
      states: {
        1: "царапины",
        2: "лёгкие раны",
        3: "глубокие раны",
        4: "смертельные раны",
      },
    },
    poisoning: {
      name: "Отравление",
      states: {
        1: "недомогание",
        2: "лёгкое отравление",
        3: "сильное отравление",
        4: "смертельное отравление",
      },
    },
    drown: {
      name: "Травмы от утопления",
      states: {
        1: "ссадины",
        2: "небольшие кровоподтёки",
        3: "сильные травмы",
        4: "смертельные травмы",
      },
    },
    disease: {
      name: "Болезнь",
      states: {
        1: "кашель",
        2: "кашель",
        3: "кашель",
        4: "кашель",
      },
    },
    trauma: {
      name: "Переломы",
      states: {
        1: "синяки",
        2: "лёгкие ушибы",
        3: "сильные ушибы",
        4: "смертельные ушибы",
      },
    },
    dirt: {
      name: "Грязь",
      states: {
        1: "грязные лапы",
        2: "грязевые пятна",
        3: "клещи",
        4: "блохи",
      },
    },
  };

  let globalContainer = document.getElementById("uwu-global-container");
  if (!globalContainer) {
    globalContainer = document.createElement("div");
    globalContainer.id = "uwu-global-container";
    globalContainer.style.display = "none";
    document.body.appendChild(globalContainer);
  }

  function showCatInfo(cat) {
    const catName = cat.querySelector(".cat_tooltip a").textContent;
    const catSize = cat.querySelector(".d .first").style.backgroundSize;
    const catImage = cat
      .querySelector(".d .first")
      .style.backgroundImage.slice(5, -2);

    const defectElements = Array.from(
      cat.querySelectorAll(".d > div:not(.first)")
    );

    const uniqueDefects = new Set();

    const catDefects = defectElements
      .map((element) => {
        const defectUrl = element.style.backgroundImage;

        if (defectUrl.includes("/defects/")) {
          const defectParts = defectUrl.split("/");
          const lastPart = defectParts.pop();
          const defectLevel = parseInt(lastPart.split("/")[0]);
          const defectType = defectParts[5];
          const defectKey = `${defectType}-${defectLevel}`;

          if (!uniqueDefects.has(defectKey)) {
            uniqueDefects.add(defectKey);
            return { type: defectType, level: defectLevel };
          }
        }
        return null;
      })
      .filter(Boolean);

    const globalContainer = document.getElementById("uwu-global-container");
    let catInfoElement = globalContainer.querySelector(".cat-info");

    if (catInfoElement) {
      globalContainer.removeChild(catInfoElement);
    }

    catInfoElement = document.createElement("div");
    catInfoElement.classList.add("cat-info");

    const closeInfoContainer = document.createElement("div");
    closeInfoContainer.classList.add("close-info-container");

    const closeButton = document.createElement("button");
    closeButton.textContent = "Закрыть";
    closeButton.classList.add("close-info");

    const closeButtonHandler = () => {
      globalContainer.removeChild(catInfoElement);
    };
    closeButton.addEventListener("click", closeButtonHandler);
    closeInfoContainer.appendChild(closeButton);

    const catId = cat
      .querySelector(".cat_tooltip a")
      .getAttribute("href")
      .slice(4);

    catInfoElement.innerHTML = `
      <h2>${catName}</h2>
      <p><strong>ID</strong>: ${catId}</p>
      <p><strong>Размер</strong>: ${catSize}</p>
      <img src="${catImage}">
    `;

    const defectsContainer = document.createElement("div");
    if (catDefects.length > 0) {
      defectsContainer.innerHTML = "<p>Дефекты:</p>";
      catDefects.forEach((defect) => {
        const defectData = defectsInfo[defect.type];
        if (defectData) {
          const defectState = defectData.states[defect.level] || "";
          const defectLine = document.createElement("p");
          const defectNameSpan = document.createElement("strong");
          defectNameSpan.textContent = defectData.name;
          defectLine.appendChild(defectNameSpan);
          defectLine.insertAdjacentHTML(
            "beforeend",
            ` (${defect.level} стадия, ${defectState})`
          );

          defectsContainer.appendChild(defectLine);
        }
      });
      catInfoElement.appendChild(defectsContainer);
    } else {
      catInfoElement.innerHTML += "<p><strong>Здоровый</strong></p>";
    }

    catInfoElement.appendChild(closeInfoContainer);

    const css_catDefects = document.createElement("style");
    css_catDefects.innerHTML = `
    .cat-info {
    pointer-events: auto;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px #00000033;
    z-index: 5;
    width: 300px;
    text-align: center;
    display: block;
    background-color: white;
    color: black;
    }

    .close-info-container {
    text-align: right;
    }

    .close-info {
    cursor: pointer;
    }

    .more-info-container {
    cursor: pointer;
    }
`;

    document.head.appendChild(css_catDefects);

    globalContainer.appendChild(catInfoElement);
  }
  // ====================================================================================================================
  //  . . . СОБСТВЕННЫЙ ФОН ЛОКАЦИИ ИГРОВОЙ . . .
  // ====================================================================================================================
  if (settings.gameFieldBackgroundUser) {
    const css_gameField = document.createElement("style");
    css_gameField.textContent = `
      #cages_div {
          background-image: url(${settings.gameFieldBackgroundUserImageURL}) !important;
      }
  `;
    document.head.appendChild(css_gameField);
  }
  // ====================================================================================================================
  //  . . . ГРАНИЦЫ ЯЧЕЕК . . . cellsNumbers
  // ====================================================================================================================
  if (settings.cellsBorders) {
    const css_cellsBorders = document.createElement("style");
    css_cellsBorders.innerHTML = `
    .cage {
      box-shadow: inset 0 0 0 0.${settings.cellsBordersThickness}px #ffffff;
    }
   `;
    document.head.appendChild(css_cellsBorders);
  }
  // ====================================================================================================================
  //  . . . НУМЕРАЦИЯ ЯЧЕЕК . . .
  // ====================================================================================================================
  if (settings.cellsNumbers) {
    function createCellNumbers(style) {
      let css = `
        #cages_div { position: relative; }
        #cages td { position: relative; }
        #cages td::before { 
          content: attr(data-cell-num);
          position: absolute; 
          z-index: 0; 
          top: 5px; 
          right: 5px;
          color: ${style.color || "#000"}; 
          opacity: ${style.opacity || 0.4}; 
          font-size: 16px; 
          font-weight: bold;
        }
      `;

      let cagesNums = document.createElement("style");
      cagesNums.id = "cages_nums";
      cagesNums.innerHTML = css;
      document.head.appendChild(cagesNums);

      let table = document.getElementById("cages");
      let rows = table.querySelectorAll("tr");
      for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].querySelectorAll("td");
        for (let j = 0; j < cells.length; j++) {
          cells[j].setAttribute("data-cell-num", (j + 1).toString());
        }
      }
    }

    createCellNumbers({
      color: "white",
      opacity: 0.8,
    });
  }
// ====================================================================================================================
//   . . . ПРОЦЕНТЫ ПАРАМЕТРОВ . . .
// ====================================================================================================================
if (settings.displayParametersPercentages) {
  const parameterTableIds = [
    "dream_table",
    "hunger_table",
    "thirst_table",
    "need_table",
    "health_table",
    "clean_table",
  ];

  function updateParameterPercentages(tableId) {
    const table = document.getElementById(tableId);
    if (table) {
      const row = table.querySelector("tbody tr");
      if (!row) {
        console.warn(`Строка не найдена в таблице с ID "${tableId}".`);
        return;
      }
      const greenBar = row.querySelector("td[style*='background-color: green;']");
      const redBar = row.querySelector("td[style*='background-color: red;']");
      if (!greenBar || !redBar) {
        console.warn(`Бары не найдены в строке таблицы с ID "${tableId}".`);
        return;
      }
      const greenBarWidth = parseInt(greenBar.style.width, 10);
      const redBarWidth = parseInt(redBar.style.width, 10);
      const totalWidth = greenBarWidth + redBarWidth;
      let percentage = (greenBarWidth / totalWidth) * 100;
      percentage = percentage % 1 !== 0 ? percentage.toFixed(2) : Math.round(percentage);

      let percentageCell = row.querySelector(".percentage-cell");
      if (!percentageCell) {
        percentageCell = document.createElement("td");
        percentageCell.classList.add("percentage-cell");
        row.appendChild(percentageCell);
      }
      percentageCell.textContent = `${percentage}%`;
    } else {
      console.warn(`Таблица с ID "${tableId}" не найдена.`);
    }
  }

  async function setupTableObservers() {
    for (const tableId of parameterTableIds) {
      const tableSelector = `#${tableId}`;
      const rowSelector = `${tableSelector} tbody tr`;
      const greenBarSelector = `${rowSelector} td[style*='background-color: green;']`;
      const redBarSelector = `${rowSelector} td[style*='background-color: red;']`;

      await setupMutationObserver(tableSelector, () => updateParameterPercentages(tableId));
      await setupMutationObserver(greenBarSelector, () => updateParameterPercentages(tableId));
      await setupMutationObserver(redBarSelector, () => updateParameterPercentages(tableId));
    }
  }

  window.addEventListener("load", setupTableObservers);
}
  // ====================================================================================================================
  //   . . . ЧИСЛОВАЯ ГРОМКОСТЬ УВЕДОМЛЕНИЙ . . .
  // ====================================================================================================================
  if (settings.climbingNotificationsNumbers) {
    function addClimbingNotificationsStyles() {
      const styles = Array.from(
        { length: 11 },
        (_, i) => `
          .vlm${i} > .nick[style*="italic"]:after {
            content: " [${i}]";
          }
        `
      ).join("");

      const styleElement = document.createElement("style");
      styleElement.textContent = styles;
      document.head.appendChild(styleElement);
    }

    addClimbingNotificationsStyles();
  }
  // ====================================================================================================================
  //   . . . ЗВУКОВОЕ УВЕДОМЛЕНИЕ ПРИ ОБНОВЛЕНИИ КЛЕТОК . . .
  // ====================================================================================================================
  // TODO - debounceTimer, если не сработает решение со сравнением историй. P.S. Вроде работает.
  if (settings.climbingRefreshNotification) {
    function handleClimbingRefresh() {
      const refreshRegex = /Услышала? оглушительн/;
      let previousHistory = "";

      const updateHistory = () => {
        const istElement = document.getElementById("ist");
        const currentHistory = istElement.innerHTML;

        if (currentHistory !== previousHistory) {
          previousHistory = currentHistory;

          const entries = currentHistory.split(".");
          const lastEntry = entries[entries.length - 2];

          if (lastEntry !== undefined && refreshRegex.test(lastEntry)) {
            const lastPlayedEntry = entries[entries.length - 3];

            if (!lastPlayedEntry || !refreshRegex.test(lastPlayedEntry)) {
              soundManager.playSound(
                settings.climbingRefreshNotificationSound,
                settings.climbingRefreshNotificationVolume
              );
            }
          }
        }
      };

      const historyBlock = document.getElementById("history_block");
      const observer = new MutationObserver(() => {
        updateHistory();
      });

      const config = {
        childList: true,
        subtree: true,
        characterData: true,
      };
      observer.observe(historyBlock, config);
    }

    handleClimbingRefresh();
  }
  // ====================================================================================================================
  //   . . . МИННОЕ ПОЛЕ . . .
  // ====================================================================================================================
  // Вторая по ненависти работа с кодами. Но уже к самому себе а не к сайту.........
  // чат уже ничего не перебьёт....... наверно????????????
  if (settings.climbingPanel) {
    function updateCell(cell, value, backgroundColor) {
      cell.textContent = value || "";
      cell.style.backgroundColor = backgroundColor || "";
    }

    function transferColors() {
      const transferCheckbox = document.getElementById("uwu-transferCheckbox");
      if (transferCheckbox.checked) {
        const climbingPanelCells = Array.from(
          document.querySelectorAll("#uwu-climbingPanel td")
        );
        const cagesCells = Array.from(
          document.querySelectorAll("#cages tbody td.cage")
        );

        climbingPanelCells.forEach((cell, i) => {
          cagesCells[i].style.backgroundColor =
            getComputedStyle(cell).backgroundColor;
        });
      }
    }

    function clearColors() {
      const cagesCells = document.querySelectorAll("#cages tbody td.cage");
      cagesCells.forEach((cell) => {
        cell.style.backgroundColor = "";
      });
    }

    let lastClickedCell;

    function handleCellClick(event) {
      const cell = event.target.closest("td");
      if (cell && cell.closest("#uwu-climbingPanel")) {
        if (lastClickedCell === cell) {
          updateCell(cell, "");
          transferColors();
          lastClickedCell = null;
        } else {
          lastClickedCell = cell;
        }
      }
    }

    function handleKeyDown(event) {
      const keyPressed = event.key;
      const activeElement = document.activeElement;

      // TODO - Кастомайз цветов
      if (
        activeElement &&
        activeElement.tagName === "TD" &&
        activeElement.closest("#uwu-climbingPanel")
      ) {
        if (keyPressed >= "0" && keyPressed <= "7") {
          updateCell(activeElement, keyPressed, "");
        } else if (keyPressed === "-") {
          updateCell(activeElement, "", "#5b000073");
        } else if (keyPressed === "=") {
          updateCell(activeElement, "", "#ffffff87");
        }
        saveTableData(tabManager.currentTableId);
      }
    }

    function handleTransferCheckboxChange(event) {
      event.target.checked ? transferColors() : clearColors();
    }

    const uwuClimbingPanelContainer = `
    <div id="uwu-climbingMainPanel">
    <div id="uwu-climbingPanelButton">
      <h2>Минное поле</h2>
    </div>
    <div id="uwu-climbingPanelContainer">
      <h3>Вкладка</h3>
      <div id="uwu-buttonRow1"></div>
      <hr>
      <h3>Локация</h3>
      <div id="uwu-buttonRow2"></div>
      <div id="uwu-functionButtonsContainer">
        <input type="checkbox" id="uwu-transferCheckbox">
        <label for="uwu-transferCheckbox">Перенос на Игровое поле</label>
      </div>
      <div id="uwu-tableContainer"></div>
    </div>
  </div>
  </div>
  `;

    function createClimbingPanel() {
      const globalContainer = document.getElementById("uwu-global-container");
      globalContainer.insertAdjacentHTML(
        "beforeend",
        uwuClimbingPanelContainer
      );

      const transferCheckbox = document.getElementById("uwu-transferCheckbox");

      document.addEventListener("keydown", handleKeyDown);
      transferCheckbox.addEventListener("change", handleTransferCheckboxChange);
      document.addEventListener("keydown", (event) => {
        const keyPressed = event.key;
        if (
          (keyPressed >= "0" && keyPressed <= "7") ||
          keyPressed === "-" ||
          keyPressed === "="
        ) {
          transferColors();
        }
      });
    }

    function saveTableData(tableIndex) {
      const climbingPanel = document.getElementById("uwu-climbingPanel");
      if (climbingPanel) {
        const tableData = getTableData(climbingPanel.id);
        const currentTab = tabManager.tabs[tabManager.currentTabIndex];
        currentTab.tables[tableIndex] = {
          name: currentTab.tables[tableIndex].name,
          data: tableData,
        };
        tabManager.saveState();
      }
    }

    function clearTable() {
      const climbingPanel = document.getElementById("uwu-climbingPanel");
      if (climbingPanel) {
        const cells = Array.from(climbingPanel.querySelectorAll("td"));
        cells.forEach((cell) => {
          if (
            getComputedStyle(cell).backgroundColor !==
            "rgba(255, 255, 255, 0.53)"
          ) {
            updateCell(cell, "", "");
          }
        });

        const currentTab = tabManager.tabs[tabManager.currentTabIndex];
        currentTab.tables[tabManager.currentTableId] = {
          name: currentTab.tables[tabManager.currentTableId].name,
          data: getTableData(climbingPanel.id),
        };
        tabManager.saveState();
      }
      transferColors();
    }

    const tabManager = {
      tabs: [],
      currentTabIndex: 0,
      currentTableId: 0,

      createTab(name) {
        const newTab = {
          name: name,
          tables: [],
        };

        this.tabs.push(newTab);
        this.renderTabs();
        this.renderTables();
        this.switchTab(this.tabs.length - 1);
      },

      switchTab(index) {
        this.currentTabIndex = index;
        this.renderTables();

        const currentTab = this.tabs[this.currentTabIndex];

        if (currentTab && currentTab.tables.length > 0) {
          this.currentTableId = 0;
          this.switchTable(this.currentTableId);
        } else {
          this.currentTableId = null;
        }

        const tabButtons = document.querySelectorAll(".tab-button");
        tabButtons.forEach((button, i) => {
          if (i === this.currentTabIndex) {
            button.classList.add("active");
          } else {
            button.classList.remove("active");
          }
        });
        transferColors();
      },

      switchTable(tableIndex) {
        this.currentTableId = tableIndex;
        this.renderTable(tableIndex);

        const tableButtons = document.querySelectorAll(".table-button");
        tableButtons.forEach((button) => {
          const buttonIndex = parseInt(button.dataset.tableindex);
          if (buttonIndex === this.currentTableId) {
            button.classList.add("active");
          } else {
            button.classList.remove("active");
          }
        });
        transferColors();
      },

      saveState() {
        localStorage.setItem("climbingPanelState", JSON.stringify(this));
      },

      renderTabs() {
        const tabRow = document.getElementById("uwu-buttonRow1");
        tabRow.innerHTML = "";

        this.tabs.forEach((tab, index) => {
          const tabButton = document.createElement("button");
          tabButton.textContent = tab.name;
          tabButton.classList.add("tab-button");

          if (index === this.currentTabIndex) {
            tabButton.classList.add("active");
          }

          tabButton.addEventListener("click", () => this.switchTab(index));

          const tabContainer = document.createElement("div");
          tabContainer.classList.add("tab-container");
          tabContainer.appendChild(tabButton);

          tabRow.appendChild(tabContainer);
        });
      },

      renderTables() {
        const tableRow = document.getElementById("uwu-buttonRow2");
        tableRow.innerHTML = "";

        const currentTab = this.tabs[this.currentTabIndex];
        if (currentTab) {
          Object.keys(currentTab.tables).forEach((tableIndex, index) => {
            const table = currentTab.tables[tableIndex];
            let tableName = table.name || `Локация ${index + 1}`;

            const tableButton = document.createElement("button");
            tableButton.textContent = tableName;
            tableButton.classList.add("table-button");

            tableButton.addEventListener("click", () => {
              tabManager.switchTable(parseInt(tableIndex));
            });

            tableButton.dataset.tableindex = tableIndex;

            const tableContainer = document.createElement("div");
            tableContainer.classList.add("table-container");
            tableContainer.appendChild(tableButton);

            tableRow.appendChild(tableContainer);
          });
        }
      },

      renderTable(tableIndex) {
        const tableContainer = document.getElementById("uwu-tableContainer");
        tableContainer.innerHTML = "";

        const climbingPanel = document.createElement("table");
        climbingPanel.id = "uwu-climbingPanel";

        for (let i = 0; i < 6; i++) {
          const row = document.createElement("tr");
          for (let j = 0; j < 10; j++) {
            const cell = document.createElement("td");
            cell.setAttribute("tabindex", "0");
            cell.addEventListener("click", handleCellClick);
            row.appendChild(cell);
          }
          climbingPanel.appendChild(row);
        }

        const currentTab = this.tabs[this.currentTabIndex];
        const tableData = currentTab.tables[tableIndex]?.data;

        if (tableData) {
          for (let i = 0; i < tableData.length; i++) {
            for (let j = 0; j < tableData[i].length; j++) {
              const cellData = tableData[i][j];
              const cell = climbingPanel.rows[i].cells[j];
              cell.textContent = cellData.value;
              cell.style.backgroundColor = cellData.backgroundColor;
            }
          }
        }
        tableContainer.appendChild(climbingPanel);

        climbingPanel.addEventListener("click", () => {
          const tableData = currentTab.tables[tableIndex];
          currentTab.tables[tableIndex] = {
            name: tableData.name,
            data: getTableData(climbingPanel.id),
          };
          tabManager.saveState();
        });

        const clearButton = document.createElement("button");
        clearButton.textContent = "Очистить всё поле/таблицу";
        clearButton.id = "button-clear-table";
        clearButton.addEventListener("click", clearTable);
        tableContainer.appendChild(clearButton);
      },
    };

    const savedState = localStorage.getItem("climbingPanelState");
    if (savedState) {
      const state = JSON.parse(savedState);
      Object.assign(tabManager, state);

      const currentTab = tabManager.tabs[tabManager.currentTabIndex];
      if (currentTab && currentTab.tables.length > 0) {
        if (tabManager.currentTableId >= currentTab.tables.length) {
          tabManager.currentTableId = 0;
        }
      } else {
        tabManager.currentTableId = null;
      }
    }
    createClimbingPanel();

    tabManager.renderTabs();
    tabManager.renderTables();

    function getTableData(tableId) {
      const table = document.getElementById(tableId);
      const tableData = [];

      for (let i = 0; i < table.rows.length; i++) {
        const rowData = [];
        for (let j = 0; j < table.rows[i].cells.length; j++) {
          const cell = table.rows[i].cells[j];
          rowData.push({
            value: cell.textContent,
            backgroundColor: cell.style.backgroundColor,
          });
        }
        tableData.push(rowData);
      }

      return tableData;
    }

    // ===================== ПЕРЕТАСКИВАНИЕ =====================
    const climbingMainPanel = document.getElementById("uwu-climbingMainPanel");
    const climbingPanelButton = document.getElementById(
      "uwu-climbingPanelButton"
    );
    let isDragging = false;
    let initialX;
    let initialY;
    let currentX;
    let currentY;
    let wasDragging = false;

    climbingPanelButton.addEventListener("mousedown", dragStart);
    document.addEventListener("mouseup", dragEnd);
    document.addEventListener("mousemove", drag);
    climbingPanelButton.addEventListener("click", togglePanelContainer);

    function dragStart(e) {
      e.preventDefault();
      const savedPanelPosition = JSON.parse(
        localStorage.getItem("climbingPanelPosition")
      );
      initialX =
        e.clientX -
        (savedPanelPosition
          ? savedPanelPosition.x
          : climbingMainPanel.offsetLeft);
      initialY =
        e.clientY -
        (savedPanelPosition
          ? savedPanelPosition.y
          : climbingMainPanel.offsetTop);

      if (e.target === climbingPanelButton) {
        isDragging = true;
        wasDragging = false;
      }
    }

    function dragEnd(e) {
      if (isDragging) {
        saveClimbingPanelPosition(currentX, currentY);
      }
      isDragging = false;
    }

    function drag(e) {
      if (isDragging) {
        e.preventDefault();

        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const panelWidth = climbingMainPanel.offsetWidth;
        const panelHeight = climbingMainPanel.offsetHeight;

        const maxX = windowWidth - panelWidth;
        currentX = Math.max(0, Math.min(currentX, maxX));

        const maxY = windowHeight - panelHeight;
        currentY = Math.max(0, Math.min(currentY, maxY));

        setPosition(currentX, currentY, climbingMainPanel);

        wasDragging = true;
      }
    }

    function setPosition(x, y, el) {
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    }

    const climbingPanelContainer = document.getElementById(
      "uwu-climbingPanelContainer"
    );

    function togglePanelContainer(e) {
      if (!wasDragging) {
        climbingPanelContainer.classList.toggle("open");
      }
      wasDragging = false;
    }

    function saveClimbingPanelPosition(x, y) {
      const panelPosition = { x, y };
      localStorage.setItem(
        "climbingPanelPosition",
        JSON.stringify(panelPosition)
      );
    }

    function checkAndResetPanelPosition() {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const panelWidth = climbingMainPanel.offsetWidth;
      const panelHeight = climbingMainPanel.offsetHeight;

      const savedPanelPosition = JSON.parse(
        localStorage.getItem("climbingPanelPosition")
      );

      if (savedPanelPosition) {
        currentX = savedPanelPosition.x;
        currentY = savedPanelPosition.y;
      } else {
        currentX = 0;
        currentY = 0;
      }

      if (
        currentX + panelWidth > windowWidth ||
        currentY + panelHeight > windowHeight
      ) {
        currentX = 0;
        currentY = 0;
        saveClimbingPanelPosition(currentX, currentY);
      }

      setPosition(currentX, currentY, climbingMainPanel);
    }
    window.addEventListener("load", checkAndResetPanelPosition);

    const uwuClimbingPanel = document.createElement("style");
    uwuClimbingPanel.innerHTML = `
    #uwu-climbingPanelContainer {
      display: none;
    }
    
    #uwu-climbingPanelContainer.open {
      display: block;
    }

    #uwu-climbingMainPanel {
      z-index: 2;
      pointer-events: auto;
      width: 260px;
      position: absolute;
      background-color: #ffffff08;
      border: 1px solid #ffffff1a;
      padding: 5px;
      backdrop-filter: blur(20px);
      border-radius: 10px;
    }

    #uwu-climbingPanelButton {
      cursor: grab;
      background-color: #00000026;
      border-radius: 10px;
      border: 1px solid #ffffff1a;
    }

    #uwu-climbingPanelButton h2 {
      display: flex;
      margin-top: 2px;
      margin-bottom: 2px;
      justify-content: center;
      pointer-events: none; /* Добавьте это правило */
    }

    #uwu-climbingPanel {
      font-size: 26px;
      border-collapse: collapse;
      width: fit-content;
      background-color: #ffffff1a;
      border: 2px solid black;
    }
  
    #uwu-climbingPanel > tr> td {
      width: 23px;
      height: 32px;
      border: 1px solid black;
      text-align: center;
      cursor: pointer;
      pointer-events: auto;
      position: relative;
    }

    #uwu-climbingPanelContainer h3 {
      margin-top: 5px;
      margin-bottom: 5px;
    }

    #uwu-functionButtonsContainer {
      height: 25px;
    }

    #uwu-climbingPanel > tr > td:focus {
      outline: 2px solid white;
    }

    #uwu-climbingPanel > tr > td:not(:empty) {
      background-color: #cccccc4d;
    }

    #uwu-transferCheckbox, #uwu-transferValuesCheckbox {
    pointer-events: auto;
    cursor: pointer;
    }

    #uwu-buttonRow1,
    #uwu-buttonRow2 {
      display: flex;
      flex-wrap: wrap;
    }

    #uwu-climbingPanel > tab-container, #uwu-climbingPanel > table-container {
      display: inline-block;
      margin-right: 10px;
    }
  
    #uwu-climbingPanelContainer button {
      background-color: #ffffff4d;
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 2px 10px;
      border-radius: 10px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      margin: 3px;
      margin-left: 0px;
    }

    #uwu-buttonRow1 > div > button.tab-button.active,
    #uwu-buttonRow2 > div > button.table-button.active {
      background-color: #abf6ffb0;
    }

    #button-clear-table {
      margin-top: 5px !important;
      width: 100%;
      border-radius: 5px !important;
    }
  `;
    document.head.appendChild(uwuClimbingPanel);
  }
  // ====================================================================================================================
  //   . . . БЫСТРЫЕ ССЫЛКИ В ИГРОВОЙ . . .
  // ====================================================================================================================
  const quickLinks = {
    quickLink1: {
      href: "/settings",
      text: "Настройки",
    },
    quickLink2: {
      href: "/ls?id=0",
      text: "Памятка",
    },
    quickLink3: {
      href: "/blogs",
      text: "Блоги",
    },
    quickLink4: {
      href: "/sniff",
      text: "Лента",
    },
  };

  const spanElement = document.querySelector("span.small");

  Object.entries(quickLinks).forEach(([key, link]) => {
    if (settings[key]) {
      const newLink = document.createElement("a");
      newLink.href = link.href;
      newLink.textContent = link.text;

      const pipe = document.createTextNode(" | ");
      spanElement.appendChild(pipe);
      spanElement.appendChild(newLink);
    }
  });

  if (settings.userQuickLinks) {
    const userLinksArray = settings.userQuickLinks.split(", ");

    userLinksArray.forEach((userLink) => {
      const [href, text] = userLink.trim().split(" ");

      const newLink = document.createElement("a");
      newLink.href = href;
      newLink.textContent = text;

      const pipe = document.createTextNode(" | ");
      spanElement.appendChild(pipe);
      spanElement.appendChild(newLink);
    });
  }
  // ====================================================================================================================
  //   . . . ПОЛЬЗОВАТЕЛЬКИЙ ФОН . . .
  // ====================================================================================================================
  const cagesDiv = document.querySelector("#cages_div");

  function createBackgroundDiv() {
    const backgroundDiv = document.createElement("div");
    backgroundDiv.style.position = "fixed";
    backgroundDiv.style.top = "-1%";
    backgroundDiv.style.left = "-1%";
    backgroundDiv.style.width = "102%";
    backgroundDiv.style.height = "102%";
    backgroundDiv.style.zIndex = "-2";
    backgroundDiv.style.overflow = "hidden";
    return backgroundDiv;
  }

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

  if (settings.backgroundRepeat) {
    const backgroundDiv = createBackgroundDiv();

    backgroundDiv.style.filter = "blur(16px)";
    backgroundDiv.style.backgroundBlendMode = "overlay";
    backgroundDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

    const backgroundImageStyle =
      window.getComputedStyle(cagesDiv).backgroundImage;
    const url = backgroundImageStyle.match(/url\("?(.+?)"?\)/);
    const backgroundImageUrl = url ? url[1] : null;

    updateBackgroundImage(backgroundDiv, backgroundImageUrl);
    globalContainerElement.appendChild(backgroundDiv);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "style"
        ) {
          const backgroundImageStyle =
            window.getComputedStyle(cagesDiv).backgroundImage;
          const url = backgroundImageStyle.match(/url\("?(.+?)"?\)/);
          const backgroundImageUrl = url ? url[1] : null;
          updateBackgroundImage(backgroundDiv, backgroundImageUrl);
        }
      });
    });

    observer.observe(cagesDiv, {
      attributes: true,
      attributeFilter: ["style"],
    });
  }

  if (settings.backgroundUser) {
    const backgroundDiv = createBackgroundDiv();

    // backgroundDiv.style.filter = "blur(16px)";
    // backgroundDiv.style.backgroundBlendMode = "overlay";
    // backgroundDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

    updateBackgroundImage(backgroundDiv, settings.backgroundUserImageURL);
    globalContainerElement.appendChild(backgroundDiv);
  }

  // ====================================================================================================================
  //   . . . ПОЛЬЗОВАТЕЛЬСКИЕ ЦВЕТА НАВЫКОВ И ПАРАМЕТРОВ . . .
  // ====================================================================================================================
  if (settings.userParametersTheme) {
    const defaultBackgroundImageUrl =
      "https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/parametersBackgroundImageURL.png";

    function applyParameterColors() {
      let cssStyles = "";

      const otherColors = settings.parametersColors.other;

      let otherFirstCellBackground = `linear-gradient(to right, ${otherColors[0]}, ${otherColors[1]})`;
      let otherLastCellBackground = `linear-gradient(to right, ${otherColors[2]}, ${otherColors[3]})`;

      cssStyles += `#parameters_block .parameter td:first-child { background: ${otherFirstCellBackground}; }\n`;
      cssStyles += `#parameters_block .parameter td:last-child { background: ${otherLastCellBackground}; }\n`;

      for (const paramId in settings.parametersColors) {
        if (paramId === "other") continue;

        const colors = settings.parametersColors[paramId];

        let backgroundImageURL = defaultBackgroundImageUrl;
        if (settings.parametersUserBackgroundImage) {
          backgroundImageURL = settings.parametersUserBackgroundImageURL;
        }

        let firstCellBackground = `linear-gradient(to right, ${colors[0]}, ${colors[1]})`;
        if (
          settings.parametersBackgroundImage ||
          settings.parametersUserBackgroundImage
        ) {
          firstCellBackground = `url(${backgroundImageURL}), ${firstCellBackground}`;
        }

        let lastCellBackground = `linear-gradient(to right, ${colors[2]}, ${colors[3]})`;
        if (
          settings.parametersBackgroundImage ||
          settings.parametersUserBackgroundImage
        ) {
          lastCellBackground = `url(${backgroundImageURL}), ${lastCellBackground}`;
        }

        cssStyles += `#${paramId}_table .parameter td:first-child { background: ${firstCellBackground}; }\n`;
        cssStyles += `#${paramId}_table .parameter td:last-child { background: ${lastCellBackground}; }\n`;
      }

      const styleTag = document.createElement("style");
      styleTag.id = "custom-parameter-styles";
      styleTag.innerHTML = cssStyles;
      document.head.appendChild(styleTag);
    }

    applyParameterColors();
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
        background: ${settings.settingAccentColor3};
      }

      span.cat_tooltip {
        background: ${settings.settingСatTooltipBackground} !important;
        color: ${settings.settingTextColor} !important;
        border: 2px solid ${settings.settingAccentColor2} !important;
      } 

      span.cat_tooltip > span.online {
        filter: brightness(2) contrast(150%);
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

      .hotkey {
        background-color: ${settings.settingAccentColor1};
      }

      #newchat, #newls {
        color: ${settings.settingAccentColor3};
      }

    .cat-info {
      background-color: ${settings.settingСatTooltipBackground} !important;
      color: ${settings.settingTextColor} !important;
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
          rightBlocks
        );

        blocks.forEach((block) => {
          if (block.id) {
            block.style.gridArea = block.id;
          }
        });
      }
    }

    function generateGridRowStyles(leftBlocks, rightBlocks) {
      const numRows = Math.max(leftBlocks.length, rightBlocks.length);
      let rowStyles = [];

      for (let i = 0; i < numRows; i++) {
        let rowHeight = "auto";
        rowStyles.push(rowHeight);
      }

      const rowStylesString = rowStyles.join(" ");
      return rowStylesString;
    }

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
    border-spacing: 0px !important;
  }

  #main_table > tbody {
    margin-top: 10px;
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

  #family { 
    display: block;
    overflow-y: auto;
    resize: vertical;
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
    position: fixed;
    bottom: 0px;
    margin: 8px;
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

  #tr_chat > td {
    display: contents;
  }

  #chat_msg, #cws_chat_msg {
    height: ${settings.chatHeight}px;
    resize: vertical;
  }

  #tr_field, #tr_info {
    height: 10px;
  }

  #newchat, #newls {
    background-color: transparent;
  }
  `;
    document.head.appendChild(fixStyle);
    applyLayoutSettings();

    const paragraph = document.querySelector("#app > p > b");
    paragraph.textContent = "ТБ:";

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
  //   . . . ЗВУКОВЫЕ УВЕДОМЛЕНИЯ . . .
  // ====================================================================================================================
  // мяу мяу мяу мяу мяу мяу мяу мяу мяу мяу мяу мяу
  // ====================================================================================================================
  //   . . . ЛИЧНЫЕ СООБЩЕНИЯ . . .
  // ====================================================================================================================
  let previousCount = 0;

  if (settings.notificationPM) {
    const newlsElement = document.getElementById("newls");
    if (newlsElement) {
      const observer = new MutationObserver(handleNewlsChange);
      observer.observe(newlsElement, {
        characterData: true,
        subtree: true,
      });
    }

    function handleNewlsChange(mutations) {
      if (mutations.length > 0) {
        const currentText = newlsElement.textContent;
        const currentCount = parseInt(
          currentText.match(/\(\d+\)/)?.[0].slice(1, -1) || 0,
          10
        );

        if (!isNaN(currentCount) && currentCount > previousCount) {
          soundManager.playSound(
            "notificationSound1",
            settings.notificationMyNameVolume
          );
          previousCount = currentCount;
        } else if (!isNaN(currentCount)) {
          previousCount = currentCount;
        }
      }
    }
  }
  // ====================================================================================================================
  //   . . . ОКОНЧАНИЕ ДЕЙСТВИЯ . . .
  // ====================================================================================================================
  if (settings.notificationActionEnd) {
    const blockMess = document.getElementById("block_mess");
    let wasBlockMessEmpty = blockMess.innerHTML.trim() === "";
    let actionStartTime = null;

    const observer = new MutationObserver(() => {
      const isBlockMessEmptyNow = blockMess.innerHTML.trim() === "";

      if (!isBlockMessEmptyNow && !actionStartTime) {
        actionStartTime = Date.now();
      } else if (isBlockMessEmptyNow && actionStartTime) {
        const actionEndTime = Date.now();
        const actionDuration = actionEndTime - actionStartTime;

        if (actionDuration >= 6000) {
          soundManager.playSound(
            "notificationSound3",
            settings.notificationMyNameVolume
          );
        }
        actionStartTime = null;
      }

      wasBlockMessEmpty = isBlockMessEmptyNow;
    });

    observer.observe(blockMess, { childList: true, subtree: true });
  }
  // ====================================================================================================================
  //   . . . ПОДНЯЛИ В РОТ . . .
  // ====================================================================================================================
  if (settings.notificationInMouth) {
    const blockMess = document.getElementById("block_mess");

    const observer = new MutationObserver(() => {
      if (blockMess.innerHTML.includes("во рту. Вы не сможете выбраться")) {
        soundManager.playSound(
          "notificationSound1",
          settings.notificationMyNameVolume
        );
      }
    });

    observer.observe(blockMess, { childList: true, subtree: true });
  }
  // ====================================================================================================================
  //   . . . ВВЕЛИ В БОЕВУЮ СТОЙКУ . . .
  // ====================================================================================================================
  if (settings.notificationInFightMode) {
    const attackRegex = /в боевую стойку, поскольку на меня напал/;
    let previousHistory = "";

    const updateHistory = () => {
      const istElement = document.getElementById("ist");
      const currentHistory = istElement.innerHTML;

      if (currentHistory !== previousHistory) {
        previousHistory = currentHistory;

        const entries = currentHistory.split(".");
        const lastEntry = entries[entries.length - 2];

        if (lastEntry !== undefined && attackRegex.test(lastEntry)) {
          soundManager.playSound(
            "notificationSound1",
            settings.notificationMyNameVolume
          );
        }
      }
    };

    const historyBlock = document.getElementById("history_block");
    const observer = new MutationObserver(() => {
      updateHistory();
    });

    const config = {
      childList: true,
      subtree: true,
      characterData: true,
    };
    observer.observe(historyBlock, config);
  }
  // ====================================================================================================================
  // мяу мяу мяу мяу мяу мяу мяу мяу мяу мяу мяу мяу
  // ====================================================================================================================
  //   . . . СОВРЕМЕННЫЙ (НОВЫЙ) ЧАТ . . .
  // ====================================================================================================================
  // я на этом инвалиде потерял все нервы кетвар желаю тебе счастья удачи и всего хорошего 😌😌😌😌😌😌😌😌😌😌
  // И ДО СИХ ПОР ТЕРЯЮ ААААА
  // TODO - как-то пределать шоле 
  if (settings.newChat) {
    const newChatContainer = document.createElement("div");
    newChatContainer.id = "uwu_chat_msg";
    const chatForm = document.getElementById("chat_form");
    chatForm.parentNode.insertBefore(newChatContainer, chatForm.nextSibling);
  
    newChatContainer.addEventListener("click", function(event) {
      const target = event.target;
  
      const nickElement = target.closest(".nick");
      if (nickElement) {
        const textArea = document.getElementById("text");
        textArea.value += nickElement.textContent;
        textArea.focus();
        return;
      }
  
      const reportButton = target.closest(".msg_report");
      if (reportButton) {
        const dataId = reportButton.getAttribute('data-id');
        const originalReportLink = document.querySelector(`#chat_msg .msg_report[data-id="${dataId}"]`);
        if (originalReportLink) {
          originalReportLink.click();
        }
        return;
      }
    });
  
    const chatElement = document.getElementById("chat_msg");
    if (chatElement) {
      const observer = new MutationObserver(handleNewChatMessage);
      observer.observe(chatElement, { childList: true, subtree: true });
    }
  
    let addedSpanCount = 0;
  
    function handleNewChatMessage(mutations) {
      const addedNodes = Array.from(mutations)
        .flatMap((mutation) => Array.from(mutation.addedNodes))
        .filter(
          (node) =>
            node.nodeName === "SPAN" && node.querySelector("td > .chat_text")
        );
  
      addedSpanCount += addedNodes.length;
      processChatMessages(addedSpanCount);
      addedSpanCount = 0;
    }
  
    function processChatMessages(messageCount) {
      const chatMessages = document.querySelectorAll("#chat_msg > span");
      const messagesArray = Array.from(chatMessages);
      const messagesToProcess = messagesArray.slice(0, messageCount);
      messagesToProcess.reverse();
  
      messagesToProcess.forEach((message) => {
        copyMessageToNewChat(message);
      });
    }
  
    function copyMessageToNewChat(chatMessage) {
      const chatTextSpan = chatMessage.querySelector("td > .chat_text");
      const messageSpan = chatTextSpan.querySelector("span");
      const messageText = messageSpan ? messageSpan.innerHTML : "";
      const nickElement = chatTextSpan.querySelector(".nick");
      const nickName = nickElement ? nickElement.textContent.trim() : "";
      const chatTextClasses = chatTextSpan.className;
      const nickStyle = nickElement ? nickElement.getAttribute("style") : "";
      let nameFound = false;
  
      let processedText = messageText;
  
      if (settings.namesForNotification) {
        const names = settings.namesForNotification
          .trim()
          .split(/\s*,\s*/)
          .filter((name) => name);
  
        names.forEach((name) => {
          const regex = new RegExp(
            `(^|\\s|[.,!?])(${name})(?=$|\\s|[.,!?])`,
            "gi"
          );
          processedText = processedText.replace(regex, (match, p1, p2) => {
            nameFound = true;
            return `${p1}<span class="myname">${p2}</span>`;
          });
        });
      }
  
      if (!nameFound && messageSpan && messageSpan.querySelector(".myname")) {
        nameFound = true;
      }
  
      if (nameFound) {
        soundManager.playSound(
          settings.myNameNotificationSound,
          settings.notificationMyNameVolume
        );
      }
  
      const profileLink = chatMessage.querySelector('a[href^="/cat"]').href;
      const catIdMatch = profileLink.match(/\/cat(\d+)/);
      const catId = catIdMatch ? catIdMatch[1] : ". . .";
  
      const reportLink = chatMessage.querySelector('.msg_report');
      const dataId = reportLink ? reportLink.getAttribute('data-id') : '';
  
      const newChatMessageHTML = `
        <hr>
        <div id="msg">
          <div class="${chatTextClasses}">${processedText} - <b class="nick" style="${nickStyle}">${nickName}</b> [<i>${catId}</i>]</div>
          <div>
            <a href="${profileLink}" title="Перейти в профиль" target="_blank" rel="noopener noreferrer">➝</a>&nbsp;|&nbsp;
            <a href="#" title="Пожаловаться на нарушение ОПИ" class="msg_report" data-id="${dataId}">X</a>
          </div>
        </div>
      `;
      newChatContainer.insertAdjacentHTML("afterbegin", newChatMessageHTML);
    }
  
    const uwuChatMsg = document.createElement("style");
    uwuChatMsg.innerHTML = `
        #uwu_chat_msg {
          height: ${settings.chatHeight}px;
          resize: vertical;
          overflow-y: auto;
        }
  
        #chat_msg {
          display: none;
        }
  
        #msg {
          display: flex;
          justify-content: space-between;
        }
     `;
    document.head.appendChild(uwuChatMsg);
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

    // Make Enter great again!
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
  //   . . . РЕДИЗАЙНЫ + + ЗАКРУГЛЕНИЕ БЛОКОВ . . .
  // ====================================================================================================================
  const sliceInfoStyle = document.createElement("style");
  if (settings.sliceInfoBlock) {
    sliceInfoStyle.innerHTML = `
      #info_main > tbody > tr > td {
        background-color: ${settings.settingBlocksColor};
        margin-bottom: 5px;
      }
    `;
    document.head.appendChild(sliceInfoStyle);
  } else {
    sliceInfoStyle.innerHTML = `
      #tr_info > td {
        background-color: ${settings.settingBlocksColor};
      }
    `;
    document.head.appendChild(sliceInfoStyle);
  }

  const edgeTrimBlocksStyle = document.createElement("style");
  if (settings.edgeTrimBlocks) {
    edgeTrimBlocksStyle.innerHTML = `
    #info_main > tbody > tr > td {
      width: fit-content;
      border-radius: 10px;
      margin-bottom: 10px;
    }
    
    #info_main,
    #tos,
    #cages_overflow,
    #cages_div {
      border-radius: 10px;
    }
    
    #main_table > tbody > #tr_actions,
    #main_table > tbody > #tr_mouth,
    #main_table > tbody > #tr_chat,
    #main_table > tbody > #tr_tos,
    #main_table > tbody > #tr_info {
      margin: 0px 10px 10px 10px;
    }
    
    #tr_chat,
    #tr_actions > td,
    #tr_mouth > td,
    #location,
    .small,
    #tr_info > td {
      border-radius: 10px;
    }
    `;
    document.head.appendChild(edgeTrimBlocksStyle);
  }
  // ====================================================================================================================
  //  . . . КОМАНДЫ В БОЕВОМ РЕЖИМЕ . . .
  // ====================================================================================================================
  if (settings.FightTeams) {
    const colors = settings.FightTeamsColors;
  
    function createTeamTable() {
      const fightPanel = document.getElementById("fightPanel");
      const tableHTML = `
        <div id="uwu-team-settings" style="height: ${settings.FightTeamsPanelHight || auto}px; overflow-y: scroll; resize: vertical;">
          <table id="uwu-team-settings-table "style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="border: 1px solid #000; padding: 5px;">Имя</th>
                <th style="border: 1px solid #000; padding: 5px;">Команда</th>
              </tr>
            </thead>
            <tbody id="teamTableBody"></tbody>
          </table>
        </div>
        <button id="updateTableButton" style="width: 100%;">Обновить таблицу</button>
      `;
      fightPanel.insertAdjacentHTML("beforeend", tableHTML);
      document.getElementById("updateTableButton").onclick = () => updateTeamTable();
    }
  
    function updateTeamTable() {
      const tbody = document.getElementById("teamTableBody");
      tbody.innerHTML = "";
      const cages = document.querySelectorAll("#cages .cage");
  
      cages.forEach((cage) => {
        const catName = cage.querySelector(".cat_tooltip a")?.textContent;
        const arrow = cage.querySelector(".arrow.arrow-paws");
  
        if (catName && arrow) {
          const arrowId = arrow.id;
          const buttonsHTML = Object.keys(colors).map(
            (team) => {
              return `
                <button 
                  style="background-color: ${colors[team][0]}; width: 21%; height: 16px;"
                  onclick="document.getElementById('${arrowId}').querySelector('.arrow_green').style.backgroundColor = '${colors[team][0]}';
                           document.getElementById('${arrowId}').querySelector('.arrow_red').style.backgroundColor = '${colors[team][1]}';"
                ></button>
              `;
            }
          ).join("");
  
          const rowHTML = `
            <tr>
              <td style="border: 1px solid #000; padding: 5px;">${catName}</td>
              <td style="border: 1px solid #000; padding: 5px;">
                ${buttonsHTML}
              </td>
            </tr>
          `;
          tbody.insertAdjacentHTML("beforeend", rowHTML);
        }
      });
    }
    createTeamTable();
  }
  // ====================================================================================================================
  //   . . . ПЕРЕТАСКИВАНИЕ ПАНЕЛИ БОЕВОГО РЕЖИМА . . .
  // ====================================================================================================================
  if (settings.draggingFightPanel) {
    const dragDiv = document.createElement("div");
    dragDiv.style.cursor = "move";
    dragDiv.style.display = "inline-block";

    const dragImage = document.createElement("img");
    dragImage.src =
      "https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/drag-move.png";
    dragImage.style.width = "24px";
    dragImage.style.height = "24px";
    dragImage.style.pointerEvents = "none";
    dragDiv.appendChild(dragImage);

    const fightPanel = document.getElementById("fightPanel");
    const firstImage = fightPanel.querySelector("img");
    fightPanel.insertBefore(dragDiv, firstImage);

    let mouseX = 0;
    let mouseY = 0;
    let panelX = 0;
    let panelY = 0;
    let isDragging = false;

    function saveFightPanelPosition(x, y) {
      localStorage.setItem("fightPanelPosition", JSON.stringify({ x, y }));
    }

    function loadFightPanelPosition() {
      const savedPosition = localStorage.getItem("fightPanelPosition");
      if (savedPosition) {
        const position = JSON.parse(savedPosition);
        panelX = position.x;
        panelY = position.y;
      }
    }

    function setFightPanelPosition(x, y) {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const panelWidth = fightPanel.offsetWidth;
      const panelHeight = fightPanel.offsetHeight;

      const maxX = windowWidth - panelWidth;
      x = Math.max(0, Math.min(x, maxX));

      const maxY = windowHeight - panelHeight;
      y = Math.max(0, Math.min(y, maxY));

      fightPanel.style.left = `${x}px`;
      fightPanel.style.top = `${y}px`;

      saveFightPanelPosition(x, y);
    }

    dragDiv.addEventListener("mousedown", (e) => {
      e.preventDefault();
      isDragging = true;
      mouseX = e.clientX;
      mouseY = e.clientY;

      loadFightPanelPosition();

      document.body.style.userSelect = "none";
    });

    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        e.preventDefault();

        const dx = e.clientX - mouseX;
        const dy = e.clientY - mouseY;

        setFightPanelPosition(panelX + dx, panelY + dy);
      }
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;

      document.body.style.userSelect = "auto";
    });

    loadFightPanelPosition();
    setFightPanelPosition(panelX, panelY);
  }
  // ====================================================================================================================
  //   . . . ИЗМЕНЯЕМАЯ ВЫСОТА ПАНЕЛИ БОЕВОГО РЕЖИМА . . .
  // ====================================================================================================================
  if (settings.FightPanelAdjustableHeight) {
    const uwuFightLog = document.createElement("style");
    uwuFightLog.innerHTML = `
      #fightPanel {
        height: auto;
      }

      #fightLog {
        resize: vertical;
      }   
      `;
    document.head.appendChild(uwuFightLog);

    const fightLog = document.getElementById("fightLog");
    fightLog.style.height = settings.FightPanelHeight + "px";
  }
  // ====================================================================================================================
  //   . . . ВСЕГДА ДЕНЬ В ИГРОВОЙ . . .
  // ====================================================================================================================
  // Вот бы всё писалось так кратко и легко...........
  const alwaysDay = document.createElement("style");
  if (settings.alwaysDay) {
    alwaysDay.innerHTML = `
    #cages_div {
      opacity: 1 !important;
    }   
    `;
    document.head.appendChild(alwaysDay);
  }
  // ====================================================================================================================
  //   . . . НЕБО - ШАПКА . . .
  // ====================================================================================================================
  if (settings.skyInHeader) {
    function getSkyUrl() {
      const skyElement = document.querySelector("#sky");
      if (skyElement) {
        const skyStyle = skyElement.getAttribute("style");
        const match = skyStyle.match(/url\((.*?)\)/);
        if (match) {
          return match[1].trim();
        } else {
          console.log("Не удалось найти URL изображения неба");
        }
      }
      return "";
    }

    const skyDiv = document.createElement("div");
    skyDiv.id = "skyDuplicate";

    const globalContainerElement = document.getElementById(
      "uwu-global-container"
    );
    globalContainerElement.appendChild(skyDiv);

    const skyStyle = document.createElement("style");
    skyStyle.innerHTML = `
    #skyDuplicate {
      height: 15%;
      width: 100%;
      mask-image: linear-gradient(to bottom, 
        rgba(0, 0, 0, 1), 
        rgba(0, 0, 0, 0.40) 50%,
        rgba(0, 0, 0, 0)
      );
      top: 0;
      left: 0;
      z-index: -1;
      position: absolute;
      background-size: cover;
    }
    `;
    document.head.appendChild(skyStyle);

    const originalSkyStyle = document.createElement("style");
    originalSkyStyle.innerHTML = `
    #tr_sky {
      display: none;
    }
    `;
    document.head.appendChild(originalSkyStyle);

    function updateSkyImage() {
      const skyUrl = getSkyUrl();
      if (skyUrl) {
        skyDiv.style.backgroundImage = `url(${skyUrl})`;
      }
    }

    updateSkyImage();
    setInterval(updateSkyImage, 2000);
  }
  // ====================================================================================================================
  //   . . . ОПРЕДЕЛЕНИЕ ПОГОДЫ В ИГРОВОЙ . . . 🛠️
  // ====================================================================================================================
  var currentWeather = "null";
  var currentHour = "null";
  var currentSeason = "null";
  var currentTemperature = "null";
  var temperatureDescription = "null";
  // ахахаха глянье на этих незнающих
  var weatherModifier = 1;

  if (settings.manualWeatherPanel) {
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
      // console.log("Текущий час:", hourNumber);
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
    // console.log("Текущий сезон:", currentSeason);
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
        {
          description: "Очень холодно",
          temperature: -3,
          colors: ["#94BDD2"],
        },
        {
          description: "Холодно",
          temperature: -2,
          colors: ["#7FAAC5", "#76A2C0", "#6A96B8", "#6593B6", "#618FB3"],
        },
        {
          description: "Прохладно",
          temperature: -1,
          colors: ["#3B6C9B", "#4C7BA6", "#5887AE", "#5D8BB0"],
        },
        {
          description: "Тепло",
          temperature: 1,
          colors: ["#FCBD8E", "#F8A37A"],
        },
        {
          description: "Жарковато",
          temperature: 2,
          colors: [
            "#F79973",
            "#F6946F",
            "#F58F6B",
            "#F28060",
            "#F17A5C",
            "#EF6B50",
          ],
        },
        {
          description: "Жарко",
          temperature: 3,
          colors: ["#ED6149", "#EB5741", "#EB523D", "#E73D2E", "#E6382A"],
        },
      ];

      let foundTemperature = null;

      for (const range of temperatureRanges) {
        if (range.colors.includes(foundBackground)) {
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
        console.warn("Неизвестная температура.");
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

      // console.log("Температура:", currentTemperature);

      const temperatureDisplayElement = document.getElementById("temperature");
      if (temperatureDisplayElement) {
        temperatureDisplayElement.innerHTML = `[?] Текущий модификатор: ${weatherModifier} (${temperatureDescription})`;
      }
    } else {
      console.log("...я потерял бекграунд температуры🌡️...");
    }
  }
  // ====================================================================================================================
  if (!settings.manualWeatherPanel) {
    setupMutationObserver("#sky", getSkyType);

    setupMutationObserver("#hour", getTime, {
      attributes: true,
      attributeFilter: ["src"],
      subtree: true
    });

    setupMutationObserver("img[src*='symbole/season']", getSeason, {
      attributes: true,
      attributeFilter: ["src"]
    });

  }

  setupMutationObserver("#tos", getTemperature, {
    attributes: true,
    subtree: true
  });
  // ====================================================================================================================
  //   . . . ПОДГОТОВКА КОНТЕЙНЕРОВ / ИЗОБРАЖЕНИЙ . . . 🖼️
  // ====================================================================================================================
  const weatherContainer = document.getElementById("uwu-global-container");
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
  //   . . . РЕЖИМ НИЗКОЙ ПРОИЗВОДИТЕЛЬНОСТИ . . .
  // ====================================================================================================================
  // Может быть уже даже готовка к динамичному количеству частиц.
  var rainNumParticles = 10;
  var snowTimerValue = 120;
  var desiredNumberOfFireflies = 10;

  function setWeatherPerformanceMode() {
    rainNumParticles = settings.lowPerformanceMode ? 4 : 10;
    snowTimerValue = settings.lowPerformanceMode ? 240 : 120;
    desiredNumberOfFireflies = settings.lowPerformanceMode ? 6 : 10;

    return { rainNumParticles, snowTimerValue, desiredNumberOfFireflies };
  }

  setWeatherPerformanceMode();
  // ====================================================================================================================
  //   . . . ДОЖДЬ . . . 🌧️
  // ====================================================================================================================
  function generateRain() {
    const raindrops = [];

    setInterval(() => {
      if (currentWeather === "rain") {
        for (let i = 0; i < rainNumParticles; i++) {
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
  //   . . . СНЕГ . . . 🌨️
  // ====================================================================================================================
  function generateSnowflakes() {
    const snowflakes = [];
    const snowTimerValue = setWeatherPerformanceMode().snowTimerValue;

    setInterval(() => {
      if (currentWeather === "snow") {
        for (let i = 0; i < 1; i++) {
          const snowflake = generateSnowflake();
          if (snowflake) {
            snowflakes.push(snowflake);
          }
        }
      }
    }, snowTimerValue);

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
  //   . . . ПИКСЕЛЬНЫЙ ДОЖДЬ . . . 🌧️
  // ====================================================================================================================
  function generatePixelRain() {
    const pixelRaindrops = [];

    setInterval(() => {
      if (currentWeather === "pixelRain") {
        for (let i = 0; i < rainNumParticles; i++) {
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
  //   . . . ПИКСЕЛЬНЫЙ СНЕГ . . . 🌨️
  // ====================================================================================================================
  function generatePixelSnow() {
    const pixelSnowflakes = [];
    const snowTimerValue = setWeatherPerformanceMode().snowTimerValue;

    setInterval(() => {
      if (currentWeather === "pixelSnow") {
        for (let i = 0; i < 1; i++) {
          const pixelSnowflake = generatePixelSnowflake();
          if (pixelSnowflake) {
            pixelSnowflakes.push(pixelSnowflake);
          }
        }
      }
    }, snowTimerValue);

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
  if (settings.weatherEnabled || settings.manualWeatherPanel) {
    animateWeather();
  }
  // ====================================================================================================================
  //   . . . СЕВЕРНОЕ СИЯНИЕ . . . 🌟
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
    if (!settings.manualWeatherPanel) {
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
    if (!settings.manualWeatherPanel) {
      generateFirefliesNaturally();
    }
  }, 2000);
  // ====================================================================================================================
  //   . . . СВЕТЛЯЧКИ . . . 🪲
  // ====================================================================================================================
  const fireflies = [];
  const glowSizeMultiplier = 12;

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
    if (settings.manualWeatherPanel) {
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

  if (settings.weatherEnabled || settings.manualWeatherPanel) {
    animateFireflies();
  }
  // ====================================================================================================================
  //   . . . ПРИЗЕМЛЕНИЕ ЧАСТИЦ . . . ☔
  // ====================================================================================================================
  const landedSnowflakes = [];
  const landedPixelSnowflakes = [];
  const splashes = [];
  const pixelSplashes = [];

  switch (true) {
    case settings.manualWeatherPanel && !settings.weatherDrops:
    case settings.weatherEnabled && !settings.weatherDrops:
      setInterval(() => {
        checkElements(raindrops, weatherContainer);
        checkElements(snowflakes, weatherContainer);
        checkElements(pixelSnowflakes, weatherContainer);
        checkElements(pixelRaindrops, weatherContainer);
      }, 120);
      break;

    case settings.manualWeatherPanel && settings.weatherDrops:
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

    for (const splash of splashes) {
      splash.x += splash.xSpeed;
      splash.y += splash.ySpeed;
      splash.ySpeed += 0.1;

      weatherCtx.beginPath();
      weatherCtx.arc(
        splash.x,
        splash.y,
        splash.size / 1.2 / weatherModifier,
        0,
        Math.PI * 2
      );
      weatherCtx.fillStyle = "rgba(150, 150, 150, 0.4)";
      weatherCtx.fill();
    }

    for (const pixelSplash of pixelSplashes) {
      pixelSplash.x += pixelSplash.xSpeed;
      pixelSplash.y += pixelSplash.ySpeed;
      pixelSplash.ySpeed += 0.1;
      weatherCtx.drawImage(
        pixelSplash.image,
        pixelSplash.x,
        pixelSplash.y,
        pixelSplash.size * weatherModifier * 2,
        pixelSplash.size * weatherModifier * 2
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
  //   . . . РЕЖИМ ГЕЙМ-МАСТЕРА . . . АВТОРИЗАЦИЯ . . .
  // ====================================================================================================================
  if (settings.GMbetaTest) {
    // Епупе а когда? 
  }
  // ====================================================================================================================
} // Конец грандиозного, но и начало чево то нового... Зогдачно......
// ====================================================================================================================
// 🦐✨🦐✨🦐✨🦐✨🦐✨🦐✨🦐✨🦐✨🦐✨🦐✨🦐✨🦐✨🦐✨🦐✨🦐✨🦐✨🦐✨🦐✨🦐✨🦐✨🦐✨🦐✨🦐✨
// ====================================================================================================================
//   . . . ТАРГЕТИНГ ОКНА ОХОТЫ И ПОДГОТОВКА КОНТЕЙНЕРОВ . . .
// ====================================================================================================================
if (window.location.href === targetCW3Hunt) {
  amogusSus();
  const containerElement = document.querySelector("body");
  const globalContainerElement = document.createElement("div");
  globalContainerElement.id = "uwu-global-container";
  containerElement.appendChild(globalContainerElement);
  // ====================================================================================================================
  //   . . . ПОДПИСЫВАТЬ ЗАПАХ . . .
  // ====================================================================================================================
  if (settings.describeHuntingSmell) {
    const smellElement = document.getElementById("smell");
    let smellText = null;
    let smellTimer = null;
    let previousRed = null;
    let seconds = 0;

    function updateHintText(currentRed) {
      if (currentRed === 0) {
        smellText.textContent = "Потерян";
      } else if (previousRed !== null) {
        if (currentRed > previousRed) {
          smellText.textContent = "Ближе";
        } else if (currentRed < previousRed) {
          smellText.textContent = "Дальше";
        }
      } else {
        smellText.textContent = " ";
      }
      previousRed = currentRed;
    }

    function updateTimer() {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      smellTimer.textContent = `${String(minutes).padStart(2, "0")}:${String(
        remainingSeconds
      ).padStart(2, "0")}`;
      seconds++;
    }

    function handleSmellChange() {
      const style = window.getComputedStyle(smellElement);
      const currentColor = style.backgroundColor;

      if (
        currentColor !== "rgba(0, 0, 0, 0)" &&
        currentColor !== "transparent"
      ) {
        if (!smellText) {
          smellText = document.createElement("div");
          smellText.id = "smellText";
          smellTimer = document.createElement("div");
          smellTimer.id = "smellTimer";
          document.body.appendChild(smellText);
          document.body.appendChild(smellTimer);

          intervalId = setInterval(updateTimer, 1000);
        }

        const currentRed = parseInt(
          currentColor.slice(
            currentColor.indexOf("(") + 1,
            currentColor.indexOf(",")
          )
        );
        updateHintText(currentRed);
      }
    }

    new MutationObserver(handleSmellChange).observe(smellElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    const describeHuntingSmell = document.createElement("style");
    describeHuntingSmell.innerHTML = `
  #smellText {
    font-size: 20px;
    background: white;
    color: black;
    text-align: center;
    width: 100px;
    position: absolute;
    z-index: 3;
    bottom: 60px;
  }
  
  #smellTimer {
    font-size: 18px;
    background: white;
    color: black;
    text-align: center;
    width: 100px;
    position: absolute;
    z-index: 3;
    bottom: 40px; 
  }
  `;
    document.head.appendChild(describeHuntingSmell);
  }
  // ====================================================================================================================
  //   . . . ВИРТУАЛЬНЫЙ ДЖОЙСТИК . . .
  // ====================================================================================================================
  // Работаем с сайтовым обработчиком нажатий: "//e.catwar.su/js/key.js?268881668"
  if (settings.huntingVirtualJoystick) {
    function createJoystick() {
      const joystickHTML = `
        <div id="joystick-container">
          <div id="joystick-base">
            <div id="joystick-head"></div>
          </div>
        </div>
      `;
  
      const uwuContainer = document.getElementById("uwu-global-container");
      uwuContainer.insertAdjacentHTML("beforeend", joystickHTML);
  
      const css = `
        #nav_buttons_wrapper {
          display: none;
        }
  
        #joystick-container {
          pointer-events: auto;
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: ${settings.sizeHuntingVirtualJoystick}px; 
          height: ${settings.sizeHuntingVirtualJoystick}px;
          z-index: 10; 
        }
  
        #joystick-base {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: rgba(128, 128, 128, 0.5);
          position: relative;
        }
  
        #joystick-head {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: ${settings.sizeHuntingVirtualJoystick / 2}px;
          height: ${settings.sizeHuntingVirtualJoystick / 2}px;
          border-radius: 50%;
          background-color: #808080;
          touch-action: none; 
        }
      `;
      const style = document.createElement("style");
      style.innerHTML = css;
      document.head.appendChild(style);
  
      const joystickContainer = document.getElementById("joystick-container");
      const joystickHead = document.getElementById("joystick-head");
      const baseRadius = joystickContainer.offsetWidth / 2;
      let activeTouchId = null;
      let keys = {};
  
      function handleTouchStart(event) {
        if (activeTouchId === null) {
          const touch = event.touches[0];
          activeTouchId = touch.identifier;
          updateJoystickPosition(touch.clientX, touch.clientY);
        }
      }
  
      function handleTouchMove(event) {
        event.preventDefault();
        for (let i = 0; i < event.touches.length; i++) {
          const touch = event.touches[i];
          if (touch.identifier === activeTouchId) {
            updateJoystickPosition(touch.clientX, touch.clientY);
            break;
          }
        }
      }
  
      function handleTouchEnd(event) {
        activeTouchId = null;
        resetJoystick();
        releaseAllKeys();
      }
  
      function updateJoystickPosition(x, y) {
        const containerRect = joystickContainer.getBoundingClientRect();
        const deltaX = x - (containerRect.left + baseRadius);
        const deltaY = y - (containerRect.top + baseRadius);
        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.min(Math.hypot(deltaX, deltaY), baseRadius * 0.8);
  
        joystickHead.style.left = `${baseRadius + distance * Math.cos(angle)}px`;
        joystickHead.style.top = `${baseRadius + distance * Math.sin(angle)}px`;
  
        const threshold = 0.3;
        const newDirections = {
          w: false, a: false, s: false, d: false,
          q: false, e: false, z: false, x: false,
        };

        simulateKeyRelease('w');
        simulateKeyRelease('a');
        simulateKeyRelease('s');
        simulateKeyRelease('d');
        simulateKeyRelease('q');
        simulateKeyRelease('e');
        simulateKeyRelease('z');
        simulateKeyRelease('x');
  
        if (distance > baseRadius * threshold) {
          if (angle >= -Math.PI * 0.125 && angle < Math.PI * 0.125) {
            newDirections.d = true;
          } else if (angle >= Math.PI * 0.125 && angle < Math.PI * 0.375) {
            newDirections.x = true;
          } else if (angle >= Math.PI * 0.375 && angle < Math.PI * 0.625) {
            newDirections.s = true;
          } else if (angle >= Math.PI * 0.625 && angle < Math.PI * 0.875) {
            newDirections.z = true;
          } else if (angle >= Math.PI * 0.875 || angle < -Math.PI * 0.875) {
            newDirections.a = true;
          } else if (angle >= -Math.PI * 0.875 && angle < -Math.PI * 0.625) {
            newDirections.q = true;
          } else if (angle >= -Math.PI * 0.625 && angle < -Math.PI * 0.375) {
            newDirections.w = true;
          } else if (angle >= -Math.PI * 0.375 && angle < -Math.PI * 0.125) {
            newDirections.e = true;
          }
        }
  
        for (const key in newDirections) {
          if (newDirections[key] !== keys[key]) {
            if (newDirections[key]) {
              simulateKeyPress(key);
            } else {
              simulateKeyRelease(key);
            }
            keys[key] = newDirections[key];
          }
        }
      }
  
      function resetJoystick() {
        joystickHead.style.left = "50%";
        joystickHead.style.top = "50%";
      }
  
      function releaseAllKeys() {
        for (const key in keys) {
          if (keys[key]) {
            simulateKeyRelease(key);
            keys[key] = false;
          }
        }
      }
  
      function simulateKeyPress(key) {
        const keyCode = Key.dict[key];
        if (keyCode && !Key.keys.includes(keyCode)) {
          Key.push(keyCode);
          const mockEvent = createMockEvent(keyCode);
          Key.keydown(mockEvent);
        }
      }
  
      function simulateKeyRelease(key) {
        const keyCode = Key.dict[key];
        if (keyCode) {
          const mockEvent = createMockEvent(keyCode);
          Key.keyup(mockEvent);
          const index = Key.keys.indexOf(keyCode);
          if (index > -1) {
            Key.keys.splice(index, 1);
          }
        }
      }
  
      function createMockEvent(keyCode) {
        return {
          keyCode: keyCode,
          ctrlKey: false,
          shiftKey: false,
          altKey: false,
          preventDefault: () => {},
          repeat: false
        };
      }
  
      joystickContainer.addEventListener("touchstart", handleTouchStart);
      joystickContainer.addEventListener("touchmove", handleTouchMove);
      joystickContainer.addEventListener("touchend", handleTouchEnd);
      joystickContainer.addEventListener("touchcancel", handleTouchEnd);
  
      window.addEventListener('blur', function() {
        releaseAllKeys();
        resetJoystick();
      });
    }
  
    createJoystick();
  }
  // ====================================================================================================================
}
// ====================================================================================================================
function amogusSus() {
  console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣤⣤⣤⣤⣤⣤⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀ ");
  console.log("⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⡿⠛⠉⠙⠛⠛⠛⠛⠻⢿⣿⣷⣤⡀⠀⠀⠀⠀⠀ ");
  console.log("⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⠋⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⠀⠈⢻⣿⣿⡄⠀⠀⠀⠀ ");
  console.log("⠀⠀⠀⠀⠀⠀⠀⣸⣿⡏⠀⠀⠀⣠⣶⣾⣿⣿⣿⠿⠿⠿⢿⣿⣿⣿⣄⠀⠀⠀ ");
  console.log("⠀⠀⠀⠀⠀⠀⠀⣿⣿⠁⠀⠀⢰⣿⣿⣯⠁⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⢿⣷⡄⠀ ");
  console.log("⠀⠀⣀⣤⣴⣶⣶⣿⡟⠀⠀⢸⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣷⠀ ");
  console.log("⠀⢰⣿⡟⠋⠉⣹⣿⡇⠀⠀⠘⣿⣿⣿⣿⣷⣦⣤⣤⣤⣶⣶⣶⣶⣿⣿⣿⠀ ");
  console.log("⠀⢸⣿⡇⠀⠀⣿⣿⡇⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠀ ");
  console.log("⠀⣸⣿⡇⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠉⠻⠿⣿⣿⣿⣿⡿⠿⠿⠛⢻⣿⡇⠀⠀ ");
  console.log("⠀⣿⣿⠁⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣧⠀⠀ ");
  console.log("⠀⣿⣿⠀⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⠀⠀ ");
  console.log("⠀⣿⣿⠀⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⠀⠀ ");
  console.log("⠀⢿⣿⡆⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⡇⠀⠀ ");
  console.log("⠀⠸⣿⣧⡀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠃⠀⠀ ");
  console.log("⠀⠀⠛⢿⣿⣿⣿⣿⣇⠀⠀⠀⠀⣰⣿⣿⣷⣶⣶⣶⣶⠶⠀⠀⢠⣿⣿⠀⠀⠀ ");
  console.log("⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⣿⣿⡇⠀⣽⣿⡏⠁⠀⠀⠀⢸⣿⡇⠀⠀⠀ ");
  console.log("⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⣿⣿⡇⠀⢹⣿⡆⠀⠀⠀⠀⣸⣿⠇⠀⠀⠀ ");
  console.log("⠀⠀⠀⠀⠀⠀⠀⢿⣿⣦⣄⣀⣠⣴⣿⣿⠁⠀⠈⠻⣿⣿⣿⣿⡿⠏⠀⠀⠀⠀ ");
  console.log("⠀⠀⠀⠀⠀⠀⠀⠈⠛⠻⠿⠿⠿⠿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");
}
