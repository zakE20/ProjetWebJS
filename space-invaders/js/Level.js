export default class Level {
    constructor(lignes, colonnes, vitesseEnnemis, couleurFond) {
        this.lignes = lignes;
        this.colonnes = colonnes;
        this.vitesseEnnemis = vitesseEnnemis;
        this.couleurFond = couleurFond;
    }

    creerGrilleEnnemis(game){
        //To implement dans les autres fichiers levels num 
        throw new Error("La méthode s doit être redéfinie dans chaque niveau.");

    }

    appliquerLeFond(game) {
        game.ctx.canvas.style.backgroundColor = this.couleurFond;
    }
}