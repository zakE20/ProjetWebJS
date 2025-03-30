import ObjectGraphique from "./ObjectGraphique.js";

export default class Player extends ObjectGraphique {
    constructor(x, y, vitesseX, ctx) {
        super(x, y, 45, 20, "green");
        this.vitesseX = vitesseX;
        this.ctx = ctx;
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.couleur;
        ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        ctx.restore();
    }

    move() {
        this.x += this.vitesseX;
    }
}
