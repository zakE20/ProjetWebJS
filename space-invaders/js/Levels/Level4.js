import Level from '../Level.js';
import Enemy from '../Enemy.js';

export default class Level4 extends Level {
    constructor() {
        super(8, 10, 2.5, 'darkred');  
    }

    creerGrilleEnnemis(game) {
        const largeur = 40, hauteur = 40, espX = 20, espY = 30;
        const departX = (game.canvas.width - (this.colonnes * (largeur + espX) - espX)) / 2;
        const departY = 50;

        for (let r = 0; r < this.lignes; r++) {
            for (let c = 0; c < this.colonnes; c++) {
                const x = departX + c * (largeur + espX);
                const y = departY + r * (hauteur + espY);
                const couleur = (r % 2 === 0) ? 'yellow' : 'orange';
                const e = new Enemy(x, y, this.vitesseEnnemis, game.ctx, couleur);
                e.canShootMultiple = (r % 2 === 0);  
                game.objetsGraphiques.push(e);
            }
        }
    }
}
