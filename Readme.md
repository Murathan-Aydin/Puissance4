# Puissance 4

Ce projet est une implémentation du célèbre jeu Puissance 4. Le but du jeu est d'aligner quatre jetons de votre couleur horizontalement, verticalement ou en diagonale avant votre adversaire.

## Règles du jeu

1. Le jeu se joue sur une grille de 7 colonnes et 6 lignes.
2. Deux joueurs s'affrontent en déposant tour à tour un jeton dans une colonne.
3. Le jeton tombe dans la position la plus basse disponible de la colonne.
4. Le premier joueur à aligner 4 jetons gagne la partie.
5. Si la grille est remplie sans qu'aucun joueur n'ait aligné 4 jetons, la partie est déclarée nulle.

## Comment lancer le jeu

1. Assurez-vous d'avoir installé [Node.js](https://nodejs.org/) sur votre machine.
2. Clonez ce dépôt sur votre machine locale :
    ```bash
    git clone git@github.com:Murathan-Aydin/Puissance4.git
    ```
3. Accédez au répertoire du projet :
    ```bash
    cd Puissance4
    ```
4. Lancez un serveur local pour exécuter le projet. Par exemple, vous pouvez utiliser le module `http-server` intégré à Node.js :
    ```bash
    npx http-server
    ```
5. Ouvrez votre navigateur et accédez à l'URL indiquée dans le terminal (par défaut, cela pourrait être `http://127.0.0.1:8080`).
6. Suivez les instructions affichées dans le jeu pour jouer.

Amusez-vous bien avec Puissance 4 !