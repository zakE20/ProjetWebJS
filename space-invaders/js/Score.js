// La classe  sert à afficher et gérer le score du joueur dans le jeu.
export default class Score {
    
    constructor(ctx, x, y) {
        this.ctx = ctx; // Le crayon pour dessiner sur l'écran.
        this.x = x; // La position horizontale (gauche-droite) où le score sera affiché.
        this.y = y; // La position verticale (haut-bas) où le score sera affiché.
        this.value = 0; // Le score commence  à 0
    }

    //  dessine le score .
    draw() {
        this.ctx.font = '20px Arial'; // On choisit une police d'écriture (taille et style).
        this.ctx.fillStyle = 'white'; // La couleur du texte est blanche.
        this.ctx.fillText(`Score: ${this.value}`, this.x, this.y); // On écrit "Score: [valeur]" à la position (x, y).
    }

    //  ajoute des points au score.
    //  cette méthode les ajoute au score actuel.
    increment(points) {
        this.value += points; // On ajoute les points au score actuel.
    }
}