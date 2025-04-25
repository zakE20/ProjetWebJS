import Enemy from './Enemy.js';
export default class Level {
    constructor(lignes, colonnes, vitesseEnnemis, couleurFond) {
        this.lignes = lignes;
        this.colonnes = colonnes;
        this.vitesseEnnemis = vitesseEnnemis;
        this.couleurFond = couleurFond;
    }

    creerGrilleEnnemis(game){
        const largeurEnnemi = 40;
        const hauteurEnnemi = 40;
        const espacementX = 20;
        const espacementY = 30;

        const departX = (game.canvas.width - (this.colonnes * (largeurEnnemi + espacementX) - espacementX)) / 2;
        const departY = 50;
        const couleurs = ["red", "blue", "green", "purple", "orange"];

        for (let ligne = 0; ligne < this.lignes; ligne++) {
            for (let colonne = 0; colonne < this.colonnes; colonne++) {
                const x = departX + colonne * (largeurEnnemi + espacementX);
                const y = departY + ligne * (hauteurEnnemi + espacementY);
                const couleur = couleurs[ligne % couleurs.length];
                const ennemi = new Enemy(x, y, this.vitesseEnnemis, game.ctx, couleur);
                game.objetsGraphiques.push(ennemi);
            }
        }
    }

    appliquerLeFond(game) {
        game.ctx.canvas.style.backgroundColor = this.couleurFond;
    }
}