// lanceur des differents modules
import Api from "../js/api.js";
import RecipeBuilder from "./RecipeBuilder.js";

(function applauncher() {
	new Api().getDataFromJsonFile().then((dataRecipes) => {
     
        if(window.location.pathname.includes("/index.html")) {
            new RecipeBuilder().builder(dataRecipes);
		}
        
	});
	//.catch((err) => console.log("An error occurs when fetching recipes", err));
    
})();
