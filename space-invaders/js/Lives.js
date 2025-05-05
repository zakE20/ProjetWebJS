export default class Lives {
    constructor(ctx, x, y, ) {
        this.ctx = ctx; 
        this.x = x; // Position horizontale pour afficher les vies.
        this.y = y; // Position verticale pour afficher les vies.
        this.value =3; // Nombre initial de vies.
    }
    draw() {
     this.ctx.fillStyle = "white";
        this.ctx.font = "24px Arial";
        this.ctx.fillText(`Lives: ${this.value}`, this.x, this.y); 
    }
    decrement() {
        if (this.value > 0) {
            this.value -= 1; // on enlève une vie.
        }
    }
    isGameOver() {
        return this.value <= 0; // Retourne true si les vies sont à 0 ou moins.
    }
}