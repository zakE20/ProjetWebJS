// La classe Player représente le joueur dans le jeu.
import ObjectGraphique from "./ObjectGraphique.js";
import Bullet from "./Bullet.js";

export default class Player extends ObjectGraphique {
    constructor(x, y, vitesseX, ctx) {
        super(x, y, 45, 20, "green");
        this.vitesseX = vitesseX; // La vitesse du joueur.
        this.ctx = ctx; // Le crayon pour dessiner le joueur.
        this.shootCooldown = 500; // Temps d'attente entre deux tirs pour éviter les tirs multiples.
        this.canShoot = true; // Le joueur peut tirer au début.
        this.isHit = false; //  si le joueur a été touché.
        this.image = new Image();
        this.image.src = '../../assets/spaceship.png'; // Chemin de l'image du joueur.
    }

    draw(ctx) {
        // On sauvegarde l'état actuel du crayon.
        ctx.save(); 
        if (this.isHit) {
            ctx.filter = 'brightness(0) saturate(100%) sepia(100%) hue-rotate(0deg) saturate(400%)'; 
        } else {
            ctx.filter = 'none'; 
        }

        const newHeight = this.h * 2; 

        // On dessine l'image du joueur avec la nouvelle hauteur, tout en gardant la largeur inchangée
        ctx.drawImage(this.image, this.x - this.w / 2, this.y - newHeight / 2, this.w, newHeight);
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
    hit() {
        if (!this.isHit) { 
            this.isHit = true;
            setTimeout(() => {
                this.isHit = false; 
            }, 500); 
        }
    }

    //  déplace le joueur.
    // Si la vitesse est positive il va à droite si elle est négative il va à gauche.
    move() {
        this.x += this.vitesseX; 
    }
    //fix:On gére que le joueur sera pas dehors de l'écran.
    // On vérifie si le joueur est dans les limites de l'écran.
    stayWithinBounds(canvasWidth) {
        if (this.x - this.w / 2 < 0) {
            this.x = this.w / 2; // Bloque à gauche.
        }
        if (this.x + this.w / 2 > canvasWidth) {
            this.x = canvasWidth - this.w / 2; // Bloque à droite.
        }
    }
}