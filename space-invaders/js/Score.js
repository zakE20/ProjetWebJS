// La classe  sert à afficher et gérer le score du joueur dans le jeu.
export default class Score {
    
    constructor(ctx, x, y) {
        this.ctx = ctx; // Le crayon pour dessiner sur l'écran.
        this.x = x; // La position horizontale (gauche-droite) où le score sera affiché.
        this.y = y; // La position verticale (haut-bas) où le score sera affiché.
        this.value = 0; // Le score commence  à 0
        this.highScore = this.getHighScore(); 
    }

    //  dessine le score .
    draw() {
        this.ctx.fillStyle = "white";
        this.ctx.font = "24px Arial";
        this.ctx.fillText(`SCORE ${this.value}`, this.x, this.y); // On écrit "Score: [valeur]" à la position (x, y).
        this.ctx.fillText(`High: ${this.highScore}`, this.x, this.y + 30);
        
    }

    //  ajoute des points au score.
    //  cette méthode les ajoute au score actuel.
    increment(points) {
        this.value += points; // On ajoute les points au score actuel.
        this.updateHighScore(); 

    }
    getHighScore() {
        return parseInt(localStorage.getItem('highScore')) || 0;
    }

    setHighScore() {
        localStorage.setItem('highScore', this.value);
    }

    updateHighScore() {
        if (this.value > this.highScore) {
            this.highScore = this.value;
            this.setHighScore();
        }
    }
}