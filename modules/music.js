console.error("Ура, модуль!");

setupSingleCallback("#cages_div", playMusic);

function playMusic() {
    return new Promise((resolve, reject) => {
        soundManager.loadSound(
            "notificationSound1",
            "https://github.com/Ibirtem/CatWar/raw/main/sounds/notification_1.mp3",
            (success) => {
                if (success) {
                    resolve();
                } else {
                    reject(new Error("Ошибка при загрузке звука"));
                }
            }
        );
    }).then(() => {
        soundManager.playSound("notificationSound3", "5");
        console.error("Ура, звук!");
    }).catch((error) => {
        console.error("Ошибка:", error);
    });
}