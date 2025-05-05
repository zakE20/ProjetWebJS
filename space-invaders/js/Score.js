// La classe  sert à afficher et gérer le score du joueur dans le jeu.
export default class Score {
    
    constructor(ctx, x, y,email) {
        this.ctx = ctx; // Le crayon pour dessiner sur l'écran.
        this.x = x; // La position horizontale (gauche-droite) où le score sera affiché.
        this.y = y; // La position verticale (haut-bas) où le score sera affiché.
        this.value = 0; // Le score commence  à 0
        this.email = email; // L'email du joueur.
        this.highScore = this.getHighScore(); // Le meilleur score est récupéré depuis le stockage local.
    }
    draw() {
        this.ctx.fillStyle = "white";
        this.ctx.font = "24px Arial";
        this.ctx.textAlign = "left"; 
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
        const scores = JSON.parse(localStorage.getItem('scores') || '{}');
        return scores[this.email] || 0;
    }
    setHighScore() {
        const scores = JSON.parse(localStorage.getItem('scores') || '{}');
        scores[this.email] = this.value;
        localStorage.setItem('scores', JSON.stringify(scores));    
    }
    updateHighScore() {
        if (this.value > this.highScore) {
            this.highScore = this.value;
            this.setHighScore();
        }
    }
}