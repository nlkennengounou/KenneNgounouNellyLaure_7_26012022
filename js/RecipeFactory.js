export default class RecipeFactory {
	// Create a recipe element
	createHTML(element) {
        let recipe = document.createElement("article");
        recipe.className="recipe__card";
        
        let ingredients = element.ingredients;
        let ingredientsResult = ingredients.reduce((listIngredients, currentingredient) => {
            let ingredient = `
                <li class ="recipe__card__list__item">
                    <strong> ${currentingredient.ingredient}:</strong> 
                    ${currentingredient.quantity? currentingredient.quantity : ""} 
                    ${currentingredient.unit? currentingredient.unit:""}
                </li>`;
            return listIngredients + ingredient;
        }, "" ); 

        let template = `
        <div class="recipe__card__placeholder"> </div>
        <section class="recipe__card__section"> 
            <header class="recipe__card__header"> 
                <h2 class="recipe__card__header__title"> ${element.name}</h2>
                <h2 class="recipe__card__header__time"> ${element.time} min
                    <i class="fal fa-clock recipe__card__header__icon"> </i>
                </h2>
            </header>
            <aside class="recipe__card__aside"> 
                <ul id="recipe__card__list_${element.id}"class="recipe__card__list">
                    ${ingredientsResult}
                </ul>
                <p class="recipe__card__description"> ${element.description}</p>
            </aside>
        </section>
        `
        
        recipe.innerHTML = template;
        return recipe;
    }
}