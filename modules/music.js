setupSingleCallback("#cages_div", playMusic);

function playMusic() {
        soundManager.loadSound(
            "mountsound",
            "https://github.com/Ibirtem/CatWar/raw/main/sounds/mountain-wind-rushing-wind.mp3",
        );
        soundManager.playSound("mountsound", "5", true);
}