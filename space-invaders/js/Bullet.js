import ObjectGraphique from "./ObjectGraphique.js";

export default class Bullet extends ObjectGraphique {
    constructor(x, y, w, h, couleur, vitesse) {
        super(x, y, w, h, couleur);
        this.vitesse = vitesse;
    }
    move() {
        this.y += this.vitesse;

        // Supprime la balle si elle sort du canvas
        if (this.y + this.h < 0) {
            this.toDelete = true;
        }
    }
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.couleur;
        ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        ctx.restore();
    }
}