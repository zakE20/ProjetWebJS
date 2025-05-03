import Level from '../Level.js';
import Enemy from '../Enemy.js';

export default class Victoire extends Level {
    constructor() {
        super(8, 10, 3, 'gold');  
    }

    creerGrilleEnnemis(game) {
        const largeur = 40, hauteur = 40, espX = 20, espY = 30;
        const departX = (game.canvas.width - (this.colonnes * (largeur + espX) - espX)) / 2;
        const departY = 50;

        for (let r = 0; r < this.lignes; r++) {
            for (let c = 0; c < this.colonnes; c++) {
                // format diagonale
                const x = departX + c * (largeur + espX) + (r * 40);  
                const y = departY + r * (hauteur + espY);  
                
                const couleur = 'red';  
                const e = new Enemy(x, y, this.vitesseEnnemis, game.ctx, couleur);
                game.objetsGraphiques.push(e);
            }
        }
    }
}
