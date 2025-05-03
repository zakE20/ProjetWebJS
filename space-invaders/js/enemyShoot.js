import Bullet from "./Bullet.js";
import { rectsOverlap } from "./collisions.js";//POUR LES COLLISIONS ENTRE LES BALLS ET LE JOUEUR

const enemyBullets = []; // C'est comme une liste où on met toutes les balles des ennemis.

// Cette fonction permet à un ennemi de tirer une balle.
function enemyShoot(enemy) {
    // On crée une nouvelle balle qui part de l'ennemi.
    // Elle est bleue, petite, et descend vers le bas (vitesse positive).
    const bullet = new Bullet(enemy.x, enemy.y + enemy.h / 2, 5, 10, 'blue', 5);

    // On met cette balle dans notre boîte 
    enemyBullets.push(bullet);
}

// Cette fonction fait bouger toutes les balles des ennemis et vérifie si elles touchent le joueur.
function moveEnemyBullets(ctx, player, onPlayerHit) {
    // On regarde chaque balle dans notre boîte
    enemyBullets.forEach((bullet, index) => {
        //bouge la balle pour descendre vers le bas
        bullet.move();

        // On dessine la balle sur l'écran pour qu'on puisse la voir.
        bullet.draw(ctx);

        // Maintenant, on vérifie si la balle a touché le joueur.
        if (rectsOverlap(
            bullet.x - bullet.w / 2, bullet.y - bullet.h / 2, bullet.w, bullet.h, // Position et taille de la balle
            player.x - player.w / 2, player.y - player.h / 2, player.w, player.h  // Position et taille du joueur
        )) {
           // On enlève la balle de notre boîte Basta son travaille.
            enemyBullets.splice(index, 1);
            player.hit();

            // On appelle une fonction pour dire que le joueur a été touché et pour enlever des points de vie (ça arrive procahinement).
            onPlayerHit();
        }

        // Si la balle sort de l'écran 
        if (bullet.y > ctx.canvas.height) {
            enemyBullets.splice(index, 1); // On enlève la balle de la boîte.
        }
    });
}

export { enemyShoot, moveEnemyBullets };