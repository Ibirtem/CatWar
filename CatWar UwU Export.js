// ==UserScript==
// @name         CatWar UwU Export
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Позволяет экспортировать настройки Мода/Скрипта UwU
// @author       Ibirtem / Затменная ( https://catwar.net/cat1477928 )
// @match        http*://*.catwar.su/*
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

const exportSettingsInput = document.createElement("textarea");
exportSettingsInput.id = "exportSettings";
exportSettingsInput.style.width = "300px";
exportSettingsInput.style.height = "100px";
exportSettingsInput.style.backgroundColor = "#444";
exportSettingsInput.style.color = "#fff";
exportSettingsInput.readOnly = true;

const exportButton = document.createElement("button");
exportButton.textContent = "Экспорт настроек";
exportButton.id = "exportSettingsButton";
exportButton.style.backgroundColor = "#555";
exportButton.style.color = "#fff";
exportButton.style.border = "1px solid #777";
exportButton.style.marginRight = "5px";
exportButton.style.cursor = "pointer";
exportButton.style.pointerEvents = "auto";

const copyButton = document.createElement("button");
copyButton.textContent = "Скопировать в буфер";
copyButton.id = "copySettingsButton";
copyButton.style.backgroundColor = "#555";
copyButton.style.color = "#fff";
copyButton.style.border = "1px solid #777";
copyButton.style.cursor = "pointer";
copyButton.style.pointerEvents = "auto";

container.appendChild(exportSettingsInput);
container.appendChild(exportButton);
container.appendChild(copyButton);

document.body.appendChild(container);

function updateExportField() {
  const settingsToExport = JSON.stringify(getSpecificLocalStorageItems(), null, 2);
  exportSettingsInput.value = settingsToExport;
}

function getSpecificLocalStorageItems() {
  const items = {};
  settingsKeys.forEach(key => {
    const value = localStorage.getItem(key);
    if (value !== null) {
      try {
        items[key] = JSON.parse(value);
      } catch (error) {
        console.error(`Ошибка при разборе JSON для ключа ${key}:`, error);
      }
    }
  });
  return items;
}

exportButton.addEventListener("click", () => {
  updateExportField();
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(exportSettingsInput.value);
    console.log("Настройки скопированы в буфер обмена");
  } catch (error) {
    console.error("Ошибка при копировании в буфер обмена:", error);
  }
});

updateExportField();