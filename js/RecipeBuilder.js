import RecipeFactory from './RecipeFactory.js'

export default class RecipeBuilder {
    	
	builder(dataRecipes) {
		let recipes = dataRecipes.recipes;
		recipes.forEach(recipe => {
			let sectionRecette = document.getElementById("recette");
			let recipeFactory = new RecipeFactory().createHTML(recipe);
			sectionRecette.appendChild(recipeFactory);
		});
    }
}


