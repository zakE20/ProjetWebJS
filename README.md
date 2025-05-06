
# ProjetWebJS
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
