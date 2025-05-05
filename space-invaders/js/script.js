import Game from "./Game.js";

// Bonne pratique : avoir une fonction appelée une fois
// que la page est prête, que le DOM est chargé, etc.
window.onload = init;

async function init() {
   // On recupère le canvas
   let canvas = document.querySelector("#myCanvas");
   let params     = new URLSearchParams(window.location.search);
    let startLevel = parseInt(params.get("level"), 10) || 1;

   // On cree une instance du jeu
    let game = new Game(canvas);
    const maxIndex = game.levels.length - 1;
    const idx      = Math.min(Math.max(startLevel - 1, 0), maxIndex);
    game.currentLevelIndex = idx;
    // ici on utilise await car la méthode init est asynchrone
    // typiquement dans init on charge des images, des sons, etc.
    await game.init();

    // on peut démarrer le jeu
    game.start();
}

