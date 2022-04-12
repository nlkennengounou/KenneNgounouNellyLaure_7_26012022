# Les petits plats
Projet du parcours "Développeur Front End" chez OpenClassroom. 
Les petits plats est une application de recherche de recettes de cuisine, les utilisateurs peuvent chercher des recettes 
    - via Une barre principale en entrant un mot ou
groupes de lettres et la recherche fera correspondre avec le titre, les ingrédients ou la description des recettes en cours.
    - via un filtre en choisissant un ou plusieurs tags dans les ingrédients, les ustensiles et ou les appareils des recettes en cours.

## Objectifs
Accéder rapidement à une recette correspondant à un besoin
de l’utilisateur dans les recettes déjà reçues. 
Deux algorithmes sont à tester pour choisir le plus optimal:
- ALGO A:  version utilisant les boucles natives (while, for...)
- ALGO B:  version en programmation fonctionnelle avec les méthodes de l'objet array (foreach, filter, map, reduce)

## Cours requis
- DÉVELOPPEMENT: Découvrez le fonctionnement des algorithmes
## Technologies
- **Recommandée:** HTML / CSS / JS / BOOTSTRAP / SASS
- **Interdit:** tout autre framework

## Livrables attendus
- Une fiche d’investigation de fonctionnalité sur l’algorithme de recherche (format PDF). Vous y intégrerez le choix de l'algorithme définitif en comparaison à l’autre algorithme de recherche développé.
- Un fichier au format TXT contenant le lien vers votre code sur GitHub comprenant les deux branches avec les deux solutions différentes pour la recherche. 

## Tester le projet
clonez le projet depuis un terminal
```terminal
git clone https://github.com/nlkennengounou/KenneNgounouNellyLaure_6_15122021.git

lancer liveserver

par défaut la recherche lance l'Algorithme A.
si vous souhaitez tester l'algorithme B 
- ouvrir le fichier js/search-results.js 
- rechercher searchA et commenter les lignes (ctrl + /)   
- rechercher searchB et décommenter les lignes ( ctrl + /)
