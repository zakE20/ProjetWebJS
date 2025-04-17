// La classe Player représente le joueur dans le jeu.
import ObjectGraphique from "./ObjectGraphique.js";
import Bullet from "./Bullet.js";

export default class Player extends ObjectGraphique {
    constructor(x, y, vitesseX, ctx) {
        super(x, y, 45, 20, "green");
        this.vitesseX = vitesseX; // La vitesse du joueur.
        this.ctx = ctx; // Le crayon pour dessiner le joueur.
        this.shootCooldown = 300; // Temps d'attente entre deux tirs pour éviter les tirs multiples.
        this.canShoot = true; // Le joueur peut tirer au début.
    }

    draw(ctx) {
        // On sauvegarde l'état actuel du crayon.
        ctx.save(); 
        // On choisit la couleur du joueur (vert).
        ctx.fillStyle = this.couleur; 
        ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h); // On dessine un rectangle pour représenter le joueur.
        ctx.restore(); // On restaure l'état du crayon.
    }
    shoot() {
        if (this.canShoot) { // on vérifie si le joueur peut tirer
            this.canShoot = false; // on désactive temporairement le tir
            setTimeout(() => {
                this.canShoot = true; // le tir recative après le cooldown
            }, this.shootCooldown);
    
            return new Bullet(this.x, this.y - this.h / 2, 5, 10, 'red', -5);
        }
        return null; //null
    }

    //  déplace le joueur.
    // Si la vitesse est positive il va à droite si elle est négative il va à gauche.
    move() {
        this.x += this.vitesseX; 
    }
    stayWithinBounds(canvasWidth) {
        if (this.x - this.w / 2 < 0) {
            this.x = this.w / 2; // Bloque à gauche.
        }
        if (this.x + this.w / 2 > canvasWidth) {
            this.x = canvasWidth - this.w / 2; // Bloque à droite.
        }
    }
}