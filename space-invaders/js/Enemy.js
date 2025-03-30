import ObjectGraphique from "./ObjectGraphique.js";
import { drawCircleImmediat } from "./utils.js";

export default class Enemy extends ObjectGraphique {
    constructor(x, y, vitesse, ctx, couleur) {
        const rayon = 20; // Définir le rayon avant d'appeler super
        super(x, y, 2 * rayon, 2 * rayon, couleur); // Appeler le constructeur parent avec les bons arguments
        this.vitesse = vitesse; // Initialiser la vitesse après super
        this.ctx = ctx; // Initialiser le contexte après super
        this.rayon = rayon; // Initialiser le rayon après super
    }

    move() {
        this.x += this.vitesse;

        // Inverser la direction si l'ennemi atteint les bords du canvas
        if (this.x - this.rayon < 0 || this.x + this.rayon > this.ctx.canvas.width) {
            this.vitesse = -this.vitesse;
        }
    }

    draw() {
        this.ctx.save(); // Sauvegarder l'état actuel du contexte
        this.ctx.translate(this.x, this.y); // Déplacer le système de coordonnées

        // Dessiner le corps de l'ennemi
        drawCircleImmediat(this.ctx, 0, 0, this.rayon, this.couleur);

        // Dessiner les yeux de l'ennemi
        drawCircleImmediat(this.ctx, -this.rayon / 3, -this.rayon / 3, this.rayon / 5, "white");
        drawCircleImmediat(this.ctx, this.rayon / 3, -this.rayon / 3, this.rayon / 5, "white");

        this.ctx.restore(); // Restaurer l'état du contexte
    }
}