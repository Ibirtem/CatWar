console.log("Ура, модуль!");

setupSingleCallback("#cages_div", playMusic);

function playMusic() {
    console.log("Ура, калбечек!");
        soundManager.loadSound(
            "notificationSound1",
            "https://github.com/Ibirtem/CatWar/raw/main/sounds/mountain-wind-rushing-wind.mp3",
        );
        soundManager.playSound("notificationSound3", "5");
}