import ObjectGraphique from "./ObjectGraphique.js";
import { drawCircleImmediat } from "./utils.js";

export default class Enemy extends ObjectGraphique {
    constructor(x, y, vitesse, ctx, couleur) {
        const rayon = 20; 
        super(x, y, 2 * rayon, 2 * rayon, couleur); 
        this.vitesse = vitesse; 
        this.ctx = ctx; 
        this.rayon = rayon; 
        this.shootInterval = 1000; // Intervalle de tir en millisecondes
    }

    move() {
        this.x += this.vitesse;

        // on inverse la direction si l'ennemi atteint les bords du canvas
        if (this.x - this.rayon < 0 || this.x + this.rayon > this.ctx.canvas.width) {
            this.vitesse = -this.vitesse;
        }
    }

    draw() {
        this.ctx.save(); // on sauvegarde l'état actuel du contexte
        this.ctx.translate(this.x, this.y); // on déplace le système de coordonnées

        //  le corps de l'ennemi
        drawCircleImmediat(this.ctx, 0, 0, this.rayon, this.couleur);

        // les yeux de l'ennemi
        drawCircleImmediat(this.ctx, -this.rayon / 3, -this.rayon / 3, this.rayon / 5, "white");
        drawCircleImmediat(this.ctx, this.rayon / 3, -this.rayon / 3, this.rayon / 5, "white");

        this.ctx.restore(); // restaure l'état du contexte
    }
}