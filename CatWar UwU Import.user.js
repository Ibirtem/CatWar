// ==UserScript==
// @name         CatWar UwU Import
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Позволяет импортировать настройки Мода/Скрипта UwU, и ЛС Варомода.
// @author       Ibirtem / Затменная ( https://catwar.net/cat1477928 )
// @match        http*://*.catwar.net/*
// @grant        none
// @iconURL      https://raw.githubusercontent.com/Ibirtem/CatWar/main/images/hammer_and_wrench.png
// ==/UserScript==

'use strict';

const settingsKeys = [
  "uwu_settings",
  "uwu_layoutSettings",
  "uwu_climbingPanelState",
  "uwu_moduleStates",
  "uwu_fightPanelPosition",
  "uwu_climbingPanelStatus",
  "uwu_privateModules",
  "uwu_colorThemes",
  "uwu_fontSize",
  "uwu_clock",
  "uwu_templates",
  "uwu_highlightResources",

  "cwmod_ls",
];

const container = document.createElement("div");
container.style.position = "fixed";
container.style.bottom = "10px";
container.style.right = "10px";
container.style.backgroundColor = "#333";
container.style.color = "#fff";
container.style.padding = "10px";
container.style.border = "1px solid #555";
container.style.zIndex = "1000";

const importSettingsInput = document.createElement("textarea");
importSettingsInput.id = "importSettings";
importSettingsInput.style.width = "300px";
importSettingsInput.style.height = "100px";
importSettingsInput.style.backgroundColor = "#444";
importSettingsInput.style.color = "#fff";

const importButton = document.createElement("button");
importButton.textContent = "Импорт настроек";
importButton.id = "importSettingsButton";
importButton.style.backgroundColor = "#555";
importButton.style.color = "#fff";
importButton.style.border = "1px solid #777";
importButton.style.marginRight = "5px";
importButton.style.cursor = "pointer";
importButton.style.pointerEvents = "auto";

container.appendChild(importSettingsInput);
container.appendChild(importButton);

document.body.appendChild(container);

importButton.addEventListener("click", () => {
  const importedSettings = importSettingsInput.value;

  try {
    const parsedSettings = JSON.parse(importedSettings);
    settingsKeys.forEach(key => {
      if (parsedSettings[key] !== undefined) {
        localStorage.setItem(key, JSON.stringify(parsedSettings[key]));
      }
    });
    console.log("Настройки импортированы:", parsedSettings);
  } catch (error) {
    console.error("Ошибка при импорте настроек:", error);
  }
});