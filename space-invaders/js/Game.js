import Player from "./Player.js";
import Enemy from "./Enemy.js";
import Bullet from "./Bullet.js";
import { rectsOverlap } from "./collisions.js";
import { initListeners } from "./ecouteurs.js";

export default class Game {
    objetsGraphiques = [];

    constructor(canvas) {
        this.canvas = canvas;
        this.inputStates = {
            ArrowRight: false,
            ArrowLeft: false,
            Space: false, // Pour tirer
            mouseX: 0,
            mouseY: 0,
        };
    }

    async init() {
        this.ctx = this.canvas.getContext("2d");

        this.player = new Player(this.canvas.width / 2, this.canvas.height - 30, 0, this.ctx);
        this.objetsGraphiques.push(this.player);

        const enemyColors = ['red', 'green', 'blue', 'yellow'];
        for (let i = 0; i < 20; i++) {
            const x = 50 + (i * 50) % (this.canvas.width - 100);
            const y = 50 + Math.floor(i / ((this.canvas.width - 100) / 50)) * 50;
            const color = enemyColors[i % enemyColors.length];
            const enemy = new Enemy(x, y, 1, this.ctx, color);
            this.objetsGraphiques.push(enemy);
        }

        initListeners(this.inputStates, this.canvas);
        console.log("Game initialisé");
    }

    start() {
        console.log("Game démarré");
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    mainAnimationLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawAllObjects();
        this.update();
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    update() {
        this.movePlayer();

        this.objetsGraphiques.forEach(obj => {
            if (obj instanceof Enemy || obj instanceof Bullet) {
                obj.move();
            }
        });

        if (this.inputStates.Space) {
            this.shoot();
            this.inputStates.Space = false; // Empêche les tirs multiples
        }

        this.checkCollisions();
    }

    shoot() {
        const bullet = new Bullet(this.player.x + this.player.w / 2, this.player.y, 5, 10, 'red', -5);
        this.objetsGraphiques.push(bullet);
    }

    drawAllObjects() {
        this.objetsGraphiques.forEach(obj => {
            obj.draw(this.ctx);
        });
    }

    movePlayer() {
        this.player.vitesseX = 0;

        if (this.inputStates.ArrowRight) {
            this.player.vitesseX = 3;
        }
        if (this.inputStates.ArrowLeft) {
            this.player.vitesseX = -3;
        }

        this.player.move();
    }

    checkCollisions() {
        this.objetsGraphiques.forEach(obj => {
            if (obj instanceof Bullet) {
                this.objetsGraphiques.forEach(enemy => {
                    if (enemy instanceof Enemy) {
                        if (rectsOverlap(obj.x, obj.y, obj.w, obj.h, enemy.x - enemy.rayon, enemy.y - enemy.rayon, enemy.rayon * 2, enemy.rayon * 2)) {
                            this.objetsGraphiques = this.objetsGraphiques.filter(o => o !== obj && o !== enemy);
                        }
                    }
                });
            }
        });
    }
}
