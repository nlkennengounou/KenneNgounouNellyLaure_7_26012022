export default class Api {
	async getDataFromJsonFile() {
		let dataUrl = "../assets/data/recipes.json";
		//Charger la ressource via l'url du fichier json
		let response = await fetch(dataUrl);

		//Convertir la reponse obtenu en json
		let data = await response.json();

		// Stocker les dpdonnes dans deux tableaux 
		const dataRecipes = [...data.recipes];

		// retourner un dictionnaire 
		return {
			"recipes": dataRecipes
		};
	}
}