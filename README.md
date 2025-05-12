
# ProjetWebJS
## 1. **Space Alien Invaders**

### Description
**Space Alien Invaders** est un jeu de tir (shoot'em up) rétro où le joueur pilote un vaisseau spatial pour éliminer des vagues d'extraterrestres tout en évitant leurs tirs. Le jeu comporte 5 niveaux avec une difficulté croissante.

### Technologies utilisées
- **JavaScript** (Vanilla)
- **HTML5** / **CSS3**
- **Canvas API** pour les rendus graphiques
- **localStorage** pour la gestion des scores et des utilisateurs

### Fonctionnalités
- **Contrôles du joueur** :
  - Déplacement : **Flèches gauche/droite** ou **A / D**
  - Tir : **Barre d'espace**
  - Pause : **Touche P**
  
- **Niveaux progressifs** :
  Le jeu comporte 5 niveaux, avec des ennemis plus rapides et plus nombreux à chaque niveau.

- **Système de vies** :
  Le joueur perd une vie chaque fois qu'il est touché par un tir ennemi.

- **Classement** :
  Les scores sont sauvegardés dans **localStorage** pour chaque utilisateur connecté.

---
# jeu de babylone

comme expliqué dans la présentation :

# Installation

1. Téléchargez Node.js ici : https://nodejs.org/fr/download/
2. Dans le dossier du projet sur votre machine, exécutez `npm install`, puis `npm start`

# concept du jeu

1. Éliminez tous les ennemis
2. La porte du village s’ouvre
3. Éliminez les ennemis à l’intérieur
4. Félicitations, vous avez sauvé le monde !

# Fonctionnalités

* 5 types de zones de jeu : Point de départ, Lac, Forêt, Désert, Village fortifié
* 5 armes animées disponibles : Pistolet, Fusil à pompe, AK, RayGun et LightningGun, chacune avec son propre effet de tir
* 4 types d’ennemis animés : Crâne flottant, Zombie lent, Dragon volant, Squelette géant
* 2 types d’objets consommables : Potion de santé et Potion d’énergie
* Sprint avec la touche Maj (Shift) qui consomme de l’énergie
* Packs de munitions pour chaque arme disséminés un peu partout
* HUD (interface tête haute) du joueur
* Barres de vie des ennemis

# 2ème jeu de bateaux

Une implémentation du jeu de bateaux en JavaScript utilisant le DOM pour l'affichage, avec une IA intelligente, le placement de bateaux, la mécanique de tir et un système de score local.

---

## 🚀 Fonctionnalités

* **Phase de placement**

  * Placement manuel (glisser-déposer ou clic) des bateaux (horizontal/vertical).
  * Placement aléatoire automatique.

* **Modèles de données**

  * Plateau 10×10 géré par `GameBoard`.
  * Objet `Ship` avec gestion des tirs (`hit`) et détection de coulé (`isSunk`).
  * Objet `Player` (humain ou IA) avec méthode d'attaque.

* **IA intelligente**

  * Attaques aléatoires jusqu'au premier contact.
  * Stratégie de poursuite en spirale autour du point touché.
  * Réinitialisation automatique après coulé.

* **Mécanique de jeu**

  * Tour par tour entre le joueur et l'IA.
  * Détection automatique de la fin de partie.
  * Système de score (10 points par touche) sauvegardé dans `localStorage`.

* **Interface utilisateur**

  * Affichage dynamique des deux grilles (joueur vs IA).
  * Mise à jour des cases (`hit` / `miss`) et des adjacences après un coulé.
  * Modal de fin de partie et sauvegarde du meilleur score.

---

## 📁 Structure du jeu

```text
src/
├── placementScreen.js   # UI phase de placement
├── gameScreen.js        # UI phase de jeu
├── gameController.js    # Contrôleur principal (init, playTurn)
├── gameboard.js         # Logique du plateau
├── ship.js              # Classe Ship
├── player.js            # Classe Player (humaine)
├── computerPlayer.js    # Classe IA
├── helpers.js           # Fonctions utilitaires
├── utils.js             # Fonctions génériques
└── index.html           # Point d'entrée du jeu
```

## 🎮 Usage

1. Placez vos bateaux manuellement ou automatiquement.
2. Cliquez sur **Start Game** pour lancer la partie.
3. Cliquez sur une case adverse pour tirer.
4. L'IA répond automatiquement après un délai.
5. Le score s'affiche et se sauvegarde en fin de partie.

---

## 🧩 Architecture

* **Modèle-Vue-Contrôleur** :

  * **Modèles** : `Ship`, `GameBoard`, `Player`.
  * **Vues** : `placementScreen`, `gameScreen` (manipulation du DOM).
  * **Contrôleur** : `gameController` orchestre les tours et la fin.

---

---
