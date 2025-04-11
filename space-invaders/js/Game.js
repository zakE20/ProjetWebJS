import Player from "./Player.js";
import Enemy from "./Enemy.js";
import Bullet from "./Bullet.js";
import Score from "./Score.js"; 
import { rectsOverlap } from "./collisions.js";
import { initListeners } from "./ecouteurs.js";

// Game class gère tout : le joueur, les ennemis, les balles, le score, et les règles du jeu.
export default class Game {
    objetsGraphiques = []; // Une liste pour stocker joueur, ennemis, balles.

    constructor(canvas) {
        this.canvas = canvas; 
        this.inputStates = { // Les touches que le joueur peut utiliser.
            ArrowRight: false, // Aller à droite.
            ArrowLeft: false, // Aller à gauche.
            Space: false, // Tirer.
            mouseX: 0, // Position de la souris.
            mouseY: 0, // Position de la souris .
        };

        this.enemyDirection = 1; // Les ennemis commencent par aller à droite.
        this.enemyVerticalDirection = 1; // Les ennemis descendent au début.
    }

    // crée une grille d'ennemis.
    createEnemyGrid(rows, coll, enemyWidth, enemyHeight, spacingX, spacingY) {
        const startX = (this.canvas.width - (coll * (enemyWidth + spacingX) - spacingX)) / 2; // Centrer la grille.
        const startY = 50; // Position de départ en haut de l'écran.
        const colors = ["green", "blue", "purple", "yellow", "red"]; // Couleurs des ennemis.

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < coll; col++) {
                const x = startX + col * (enemyWidth + spacingX); // Position horizontale.
                const y = startY + row * (enemyHeight + spacingY); // Position verticale.
                const color = colors[row % colors.length]; // Couleur de l'ennemi.
                const vitesse = 1; // Vitesse de déplacement des ennemis.
                const enemy = new Enemy(x, y, vitesse, this.ctx, color); // Crée un ennemi.
                this.objetsGraphiques.push(enemy); // Ajoute l'ennemi à la liste.
            }
        }
    }

    // =initialise le jeu.
    async init() {
        this.ctx = this.canvas.getContext("2d"); 

        this.player = new Player(this.canvas.width / 2, this.canvas.height - 30, 0, this.ctx); // Crée le joueur.
        this.objetsGraphiques.push(this.player); // on ajoute le joueur à la liste.

        this.createEnemyGrid(5, 10, 40, 40, 20, 30); // On crée une grille de 5 lignes et 10 colonnes d'ennemis.

        this.score = new Score(this.ctx, 10, 30); // on initialise le score en haut à gauche.

        initListeners(this.inputStates, this.canvas); 
        console.log("Game initialisé");
    }

    //  démarre le jeu.
    start() {
        console.log("Game démarré");
        requestAnimationFrame(this.mainAnimationLoop.bind(this)); // On lance la boucle principale.
    }

    // La boucle principale du jeu.
    mainAnimationLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Efface l'écran.
        this.drawAllObjects(); 
        this.score.draw(); // Dessine le score.
        this.update(); // update les positions et les règles du jeu.
        requestAnimationFrame(this.mainAnimationLoop.bind(this)); // On relance la boucle.
    }

    // update le jeu .
    update() {
        this.movePlayer(); // Déplace le joueur.

        let shouldChangeDirection = false; // Les ennemis doivent-ils changer de direction ?
        let shouldReverseVertical = false; // Les ennemis doivent-ils remonter ?

        this.objetsGraphiques.forEach(obj => {
            if (obj instanceof Enemy) {
                obj.x += this.enemyDirection * obj.vitesse; // Déplace l'ennemi horizontalement.

                // Si un ennemi touche un bord on change de direction.
                if (obj.x - obj.rayon < 0 || obj.x + obj.rayon > this.canvas.width) {
                    shouldChangeDirection = true;
                }

                //  SI un ennemi est trop proche du joueur, il remonte.
                if (obj.y + obj.rayon >= this.player.y - 100) {
                    shouldReverseVertical = true;
                }
            } else if (obj instanceof Bullet) {
                obj.y += obj.vitesse; // on déplace la balle.
            }
        });

        if (shouldChangeDirection) {
            this.enemyDirection *= -1; // on change la direction horizontale.
            this.objetsGraphiques.forEach(obj => {
                if (obj instanceof Enemy) {
                    obj.y += 20; // on descend d'une ligne.
                }
            });
        }

        // Si les ennemis sont trop proches, ils remontent légèrement.
        if (shouldReverseVertical) {
            this.objetsGraphiques.forEach(obj => {
                if (obj instanceof Enemy) {
                    obj.y -= 10; // 
                }
            });
        }
        if (this.inputStates.Space) {
            this.shoot(); // Appelle la méthode shoot.
        }
        
        

      

        this.checkCollisions(); // balle contre ennemi.
    }

    shoot() {
        const bullet = this.player.shoot(); // 
        if (bullet) {
            this.objetsGraphiques.push(bullet); 
        }
    }

    drawAllObjects() {
        this.objetsGraphiques.forEach(obj => {
            obj.draw(this.ctx); // dessine chaque objet.
        });
    }

    // On déplace le joueur en fonction des touches clavier.
    movePlayer() {
        this.player.vitesseX = 0; // Par défaut le joueur fixe.

        if (this.inputStates.ArrowRight) {
            this.player.vitesseX = 3; 
        }
        if (this.inputStates.ArrowLeft) {
            this.player.vitesseX = -3;
        }

        this.player.move(); //move  joueur.
    }

    //  on vérifie les collisions entre les balles et les ennemis.
    checkCollisions() {
        this.objetsGraphiques.forEach(obj => {
            if (obj instanceof Bullet) {
                this.objetsGraphiques.forEach(enemy => {
                    if (enemy instanceof Enemy) {
                        if (rectsOverlap(obj.x, obj.y, obj.w, obj.h, enemy.x - enemy.rayon, enemy.y - enemy.rayon, enemy.rayon * 2, enemy.rayon * 2)) {
                            this.objetsGraphiques = this.objetsGraphiques.filter(o => o !== obj && o !== enemy); // Supprime la balle et l'ennemi.
                            this.score.increment(10); //  10 points au score.
                        }
                    }
                });
            }
        });
    }
}