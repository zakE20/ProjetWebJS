export default class Lives {
    constructor(ctx, x, y, ) {
        this.ctx = ctx; 
        this.x = x; // Position horizontale pour afficher les vies.
        this.y = y; // Position verticale pour afficher les vies.
        this.value =3; // Nombre initial de vies.
    }

    // Dessine les vies à l'écran.
    draw() {
        this.ctx.font = '20px Arial'; // Police d'écriture.
        this.ctx.fillStyle = 'white'; // Couleur du texte.
        this.ctx.fillText(`Lives: ${this.value}`, this.x, this.y); // Affiche "Lives: [valeur]".
    }

    // Réduit le nombre de vies.
    decrement() {
        if (this.value > 0) {
            this.value -= 1; // Enlève une vie.
        }
    }

    // Vérifie si le joueur a encore des vies.
    isGameOver() {
        return this.value <= 0; // Retourne true si les vies sont à 0 ou moins.
    }
}