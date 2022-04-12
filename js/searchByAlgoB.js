/** ALGO B:  version en programmation fonctionnelle avec les méthodes de l'objet array (foreach, filter, map, reduce) */

// Charger la ressource via l'url du fichier json
let dataUrl = "../assets/data/recipes.json";
let response = await fetch(dataUrl);

// Convertir la reponse obtenu en json
let data = await response.json();
localStorage.clear();
localStorage.setItem('recipes', JSON.stringify(data));

// stocker les derniers resultats de chaque recherche
let lastSearch = [];

/**
 * @returns {array} lastSearch - tableau contenant les éléménts recherchés 
 *                            et les derniers resultats de chaque recherche 
 */
export function getLastSearch() {
    return lastSearch;
}

/**
 * recupère les entrées de l'utilisateur et retourne la liste des recettes correspondantes
 * @param {string} request - texte entré par l'utilisateur dans la barre de recherche
 * @param {string} appareil - tableau avec l'appareil selctionné par l'utilisateur dans le filtre appareil
 * @param {array} ustensil - tableau des ustensiles selectionnés par l'utilisateur dans le filtre ustensiles
 * @param {array} ingredients - tableau des ingredients selectionnés par l'utilisateur dans le filtre ingredients
 * @returns {array} recipes - tableau de recettes correspondantes
 */
export function searchB(request, appareil, ustensils, ingredients) {
    console.log("\n\n********** ALGO B ********** ")

    console.time("searchB");
    
    let recipes = data.recipes;
    console.log(" Match Json file", recipes.length)

    recipes = matchAppareil(recipes, appareil);
    console.log(" Match Appareils", recipes.length)

    recipes = matchUstensils(recipes, ustensils);
    console.log(" Match Ustensils", recipes.length)

    recipes = matchIngredients(recipes, ingredients);
    console.log(" Match Ingredients", recipes.length)

    recipes = matchSearchBar(recipes, request.toLowerCase());
    console.log(" Match SearchBar", recipes.length)

    // sauvegarder la derniere recherche et le dernier resultat
    lastSearch = [appareil, ustensils, ingredients, recipes];
    localStorage.clear();
    
    // mettre en memoire local storage le dernier resultat
    let dat = {'recipes': Object.values(recipes)};
    localStorage.setItem('recipes', JSON.stringify(dat));

    console.log("Result ===== ",lastSearch)
    console.log("\n");

    // afficher le temps mis par la recherche ALGO B
    console.timeEnd("searchB");
    console.log("********** END ALGO B ********** \n\n");

    return recipes;
}

/**
 * ALGO B: faire correspondre les recettes affichées avec l'appareil selectionné
 * @param {array} recipes - tableau de recettes en cours
 * @param {array} appareil - tableau avec l'appareil selectionné par l'utilisateur
 * @returns {array} recipesMatched - tableau de recettes correspondantes
 */
function matchAppareil(recipes, appareil) {
    let recipesMatched = [];
    if(appareil === undefined || appareil === "" || appareil === []){
        recipesMatched = recipes;
    }else{
        recipes.forEach(recipe => {
            if (recipe.appliance.toLowerCase().includes(appareil)) {
                recipesMatched.push(recipe)
            }
        });
    }
  
    return recipesMatched;
}

/**
 * ALGO B: faire correspondre les recettes affichées avec les ustensils selectionnés
 * @param {array} recipes - tableau de recettes en cours
 * @param {array} ustensils - tableau des ustensils selectionnés par l'utilisateur
 * @returns {array} recipesMatched - tableau de recettes correspondantes
 */
function matchUstensils(recipes, ustensils) {
    let recipesMatched = [];
    if(ustensils === undefined){
        recipesMatched = recipes;
    }else{
        recipes.forEach(recipe => {
            let ustensilsMatch = []
            ustensils.forEach(ustensil => {
                ustensilsMatch.push(
                    recipe.ustensils.filter(itemUstensil =>
                        itemUstensil.toLowerCase().includes(ustensil.toLowerCase())    
                    ).length > 0 
            )})
            if (ustensilsMatch.every(match => match == true)) {
                recipesMatched.push(recipe)
            }
        });
    }
    
    return recipesMatched;
}

/**
 * ALGO B: faire correspondre les recettes affichées avec les ingredients selectionnés
 * @param {array} recipes - tableau de recettes en cours
 * @param {array} ingredients - tableau des ingredients selectionnés par l'utilisateur
 * @returns {array} recipesMatched - tableau de recettes correspondantes
 */
 function matchIngredients(recipes, ingredients) {
    let recipesMatched = [];
    recipes.forEach(recipe => {
        let ingredientsMatch = []
        ingredients.forEach(ingredient => {
            ingredientsMatch.push(
                recipe.ingredients.filter(recIngredient =>
                    recIngredient.ingredient.toLowerCase().includes(ingredient.toLowerCase())    
                ).length > 0 
        )})
        if (ingredientsMatch.every(match => match == true)) {
            recipesMatched.push(recipe)
        }    
    });
    return recipesMatched;
}

/**
 * ALGO B: faire correspondre les recettes affichées avec le texte entré 
 * @param {array} recipes - tableau de recettes en cours
 * @param {string} request - texte entré par l'utilisateur dans la barre de recherche
 * @returns {array} recipesMatched - tableau de recettes correspondantes
 */
function matchSearchBar(recipes, request) {
    let recipesMatched = [];
    recipes.forEach(recipe => {
        if (recipe.name.toLowerCase().includes(request) 
            || recipe.description.toLowerCase().includes(request)
            || recipe.ingredients
                .filter(ingredient => ingredient.ingredient
                    .toLowerCase().includes(request)).length > 0) {
            recipesMatched.push(recipe)
        }
    });
    return recipesMatched;
}
