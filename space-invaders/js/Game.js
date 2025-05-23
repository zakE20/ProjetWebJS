import Player from "./Player.js";
import Enemy from "./Enemy.js";
import Bullet from "./Bullet.js";
import Score from "./Score.js"; 
import { rectsOverlap } from "./collisions.js";
import { initListeners } from "./ecouteurs.js";
import { enemyShoot, moveEnemyBullets } from "./enemyShoot.js"; 
import Lives from './Lives.js';
import Level1 from './Levels/Level1.js';
import Level2 from './Levels/Level2.js';
import Level3 from './Levels/Level3.js';
import Level4 from './Levels/Level4.js';
import Victoire from './Levels/Victoire.js';
import { playGame,setMuted,playGameOver} from './Son.js'; 
// Game class gère tout : le joueur, les ennemis, les balles, le score, et les règles du jeu.
export default class Game {
    objetsGraphiques = []; // Une liste pour stocker joueur, ennemis, balles.
    levels=[new Level1(),new Level2(),new Level3(),new Level4(),new Victoire()]; // Liste des niveaux.
    currentLevelIndex = 0; 
    constructor(canvas) {
        this.canvas = canvas; 
        this.inputStates = { 
            ArrowRight: false, // Aller à droite.
            ArrowLeft: false, // Aller à gauche.
            Space: false, // Tirer.
            mouseX: 0, // Position de la souris.
            mouseY: 0, // Position de la souris .
            
        };
        this.isPaused = false;   
        this.pauseOverlayAlpha = 0; 
        this.iswin = false; 
        this.enemyDirection = 1; // Les ennemis commencent par aller à droite.
        this.enemyVerticalDirection = 1; // Les ennemis descendent au début.
    }
    resizeCanvas() {
        this.canvas.width = window.innerWidth; // Largeur de la fenêtre
        this.canvas.height = window.innerHeight; // Hauteur de la fenêtre
    }

    

    // =initialise le jeu.
    async init() {
        this.ctx = this.canvas.getContext("2d"); 
        //fix:ici je redimensionne le canvas pour qu'il prenne toute la fenêtre.
        this.resizeCanvas();
        this.player = new Player(this.canvas.width / 2, this.canvas.height - 50, 0, this.ctx); // Crée le joueur.
        this.objetsGraphiques.push(this.player); // on ajoute le joueur à la liste.
        this.loadLevel(this.currentLevelIndex); // Charge le niveau.
        const email = localStorage.getItem('currentUser');
        this.score = new Score(this.ctx, 10, 30,email); // on initialise le score en haut à gauche.
        this.lives = new Lives(this.ctx, this.canvas.width - 100, 30, 3); // on initialise les vies en haut à droite.

        initListeners(this.inputStates, this.canvas); 
        document.getElementById('pause-btn')
        .addEventListener('click', () => this.togglePause());
        window.addEventListener('keydown', (e) => {
    if (e.key === 'p' || e.key === 'P') this.togglePause();
        });
// fix:on Déclenche les tirs ennemis toutes les 2 secondes
         setInterval(() => {
            if (this.currentLevelIndex !== 0) {
                if (this.currentLevelIndex === 2) {
                    this.shootMultipleEnemies(3); // 3 ennemis tirent simultanément
                }
                // si le niveau 3,4 et 5 ennemis peuvent tirer simultanément
                else if (this.currentLevelIndex === 3) {
                    this.shootMultipleEnemies(5); // 5 ennemis tirent simultanément
                }
                else if (this.currentLevelIndex === 4) {
                    this.shootMultipleEnemies(7); // 7 ennemis tirent simultanément
                }
                // Si c'est le niveau 2, un seul ennemi tire
                else {
                    const enemies = this.objetsGraphiques.filter(obj => obj instanceof Enemy);
                    if (enemies.length > 0) {
                        const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
                        enemyShoot(randomEnemy, this); // enemyShoot pour un ennemi unique
                    }
                }
            }
        }, 2000);
    }
    togglePause(){
        this.isPaused = !this.isPaused;
        const btn = document.getElementById('pause-btn');
        btn.textContent = this.isPaused ? '▶' : '⏸';
        setMuted(this.isPaused);
    }
        shootMultipleEnemies(numEnemies) {
            const enemies = this.objetsGraphiques.filter(obj => obj instanceof Enemy);
            const randomEnemies = [];
            // on liimite le nombre de tirs à la quantité d'ennemis disponibles
            const actualEnemiesToShoot = Math.min(numEnemies, enemies.length);
            while (randomEnemies.length < actualEnemiesToShoot) {
                const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
                if (!randomEnemies.includes(randomEnemy)) {
                    randomEnemies.push(randomEnemy);
                }
            }
        randomEnemies.forEach(enemy => {
                enemyShoot(enemy, this); 
            });
        }
        loadLevel(indexLevel) {
        if (indexLevel < this.levels.length) {
            const level = this.levels[indexLevel]; // on récupère le niveau actuel.
            level.appliquerLeFond(this); // on applique le fond du niveau.

           level.creerGrilleEnnemis(this); // on crée la grille d'ennemis.
            if (this.currentLevelIndex === 3) { // Niveau 4
                this.player.vitesseX = 5;  //  vitesse du joueur pour le niveau 4
            }
            else if(this.currentLevelIndex === 4) { // Niveau 5
                this.player.vitesseX = 7;  //vitesse du joueur pour le niveau 5
            }
            else {
                this.player.vitesseX = 3;  // vitesse normale pour les autres niveaux
            }
    
        } else {
            console.log("Tous les niveaux sont terminés !"); //debug.
        }
    }
//  démarre le jeu.
    start() {
        console.log("Game démarré");
        playGame();
        requestAnimationFrame(this.mainAnimationLoop.bind(this)); // On lance la boucle principale.
    }
    drawPauseOverlay(){
        if (this.pauseOverlayAlpha < 0.6) this.pauseOverlayAlpha += 0.02;
        this.ctx.fillStyle = `rgba(0,0,0,${this.pauseOverlayAlpha})`;
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('PAUSE', this.canvas.width/2, this.canvas.height/2);
    }
    mainAnimationLoop() {
        if (this.isPaused){
            this.drawAllObjects();
            this.drawPauseOverlay();
            requestAnimationFrame(this.mainAnimationLoop.bind(this));
            return;                       
        }
        if (this.isGameOver) {
            const email  = localStorage.getItem('currentUser');        // joueur connecté
            const scores = JSON.parse(localStorage.getItem('scores') || '{}');
        if (email) {
                const best = scores[email] || 0;
                scores[email] = Math.max(best, this.score.value);      
                localStorage.setItem('scores', JSON.stringify(scores));
            }
            localStorage.setItem('lastScore', this.score.value); 
            localStorage.setItem('lastUnlockedLevel', this.currentLevelIndex);
            playGameOver();  
            setTimeout(() => {
                const affiche = this.iswin ? "../html/win.html" : "../html/gameOver.html";
                window.location.href = affiche;
            }, 3000); 
            return;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
        this.drawAllObjects(); 
        this.score.draw(); // ondessine le score.
        this.lives.draw();
        this.update(); // update les positions et les règles du jeu.
        requestAnimationFrame(this.mainAnimationLoop.bind(this)); // On relance la boucle.
    }
    // update le jeu .
    update() {
        this.movePlayer(); // Déplace le joueur.
        let shouldChangeDirection = false; 
        let shouldReverseVertical = false; 
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
          //on déplace les projectiles ennemis et on vérifie collisions
          moveEnemyBullets(this.ctx, this.player, () => {
            this.lives.decrement(); // Réduit les vies.
        if (this.lives.isGameOver()) {
            this.isGameOver = true; // Fin du jeu si plus de vies.
        }
        });
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
        if (this.inputStates.ArrowRight || this.inputStates["D"]) {
            this.player.vitesseX = 3; // Vitesse à droite.
        }
        if (this.inputStates.ArrowLeft || this.inputStates["A"]) {
            this.player.vitesseX = -3;
        }
        this.player.move(); //move  joueur.
        this.player.stayWithinBounds(this.canvas.width); // Empêche le joueur de sortir des limites.
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
        //on verifie si tous les ennemies sont élimines
        const enemieRestants = this.objetsGraphiques.some(obj => obj instanceof Enemy);
        if(!enemieRestants) {
            this.nextLevel(); //  niveau suivant.
        }
    }
    // on passe au niveau suivant. 
    nextLevel() {
        this.currentLevelIndex++; //++indice du niveau.
        if(this.currentLevelIndex < this.levels.length) {
            this.loadLevel(this.currentLevelIndex); // next  niveau.
        }
        else {
            this.iswin = true; // Si tous les niveaux sont terminés, on affiche la victoire.
            
            this.isGameOver = true;
        }
    }
   
}