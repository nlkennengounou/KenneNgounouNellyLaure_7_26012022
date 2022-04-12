// Recupérer les recettes en cours dans localstorage
let data = localStorage.getItem('recipes')
data = JSON.parse(data);

/** Classe qui gère le filtre Ingredient */
export class IngredientFilter extends HTMLElement {
    
    // Constructeur de la classe
    constructor() {
        super();
        this.allIngredients = new Set();
    } 
    
    /** 
     * Methode appelé automatiquement lors de l'instanciation de la classe IngredientFilter
     * qui cree le filtre Ingredient à partir d'un template HTML
     * écoute les évènements dessus 
     * filtre la liste des Ingredients 
     * afficher le resultat dans l'element HTML ingredient__results
     */
    connectedCallback () {
        const template = document.createElement('template');
        template.innerHTML = `
        <!-- filter by ingredient -->
        <form class="research__fields__form ingredient__form">
            <input
                class="research__fields__form__input ingredient__input"
                placeholder="Ingrédient"
                type="search"
            />
            <button class="research__fields__form__submit ingredient__button" type="button">
                <i class="far fa-chevron-down ingredient__chevron"></i>
            </button>
        </form>
        <aside class="research__fields__form__results__ingredient">
            <ul class="ingredient__results ingredient__results__undisplayed">
            </ul>
        </aside>
        `;
        this.appendChild(template.content);
        this.queryIngredients();
        this.render("");
        this.listenInput();
    }

    /** 
     * Actualiser la liste des tags ingredients selon l'entrée de l'utilisateur sur le filtre ingredients 
     * */
    queryIngredients() {
        data.recipes.forEach(recipe => recipe.ingredients.forEach(ingredient => this.allIngredients.add(ingredient.ingredient)))
    }

    /** 
     * Traiter la liste des tags en fonction de l'entrée utilisateur
     * @param {string} request - texte entré par l'utilisateur sur le champ de filtre Ingredients
     */
    render(request) {
        // vider le champ des tags
        this.querySelectorAll("li").forEach(element => {element.remove()})

        let ingredients = [];

        // Recupérer les recettes en cours dans localstorage
        let data = localStorage.getItem('recipes')
        data = JSON.parse(data);

        /** Actualiser la liste des tags Ingredients selon l'entrée de l'utilisateur sur le filtre Ingredients */
        this.allIngredients = new Set();
        data.recipes.forEach(recipe => recipe.ingredients.forEach(ingredient => this.allIngredients.add(ingredient.ingredient)))

        if(request === ""){
            // Si aucune entrée, renvoie tous les tags Ingredients
            ingredients = [...this.allIngredients].sort();
            console.log("new ingredients empty", ingredients.length);
        }else{
            // Si entrée détectée, renvoie les tags Ingredients corespondants
            ingredients = [...this.allIngredients].sort().filter(ingredient => ingredient.toLowerCase().includes(request.toLowerCase()));
            console.log("new ingredients fill " + request, ingredients.length);
        }
        // Affiche la liste des tags Ingredients 
        ingredients.forEach((ingredient) => {
            var li = document.createElement("li");
            li.classList.add("ingredient__item");
            li.appendChild(document.createTextNode(`${ingredient.toLowerCase()}`));
            document.querySelector(".ingredient__results").appendChild(li);
        });
    }

    /**
     * les evenements pouvant survenir sur le champ de filtre Ingredients
     */
    listenInput() {

        // pour toute entrée sur le champ ingredient, acualiser le champ des tags
        this.querySelector(".ingredient__input").addEventListener('input', input => {
            this.render(input.target.value);
        })

        // si on click sur le champ Ingredient
        this.querySelector(".ingredient__input").addEventListener('click', input => {
            if(document.querySelector(".ingredient__results").classList.contains("ingredient__results__undisplayed")){

                // afficher les tags Ingredients disponibles
                document.querySelector(".ingredient__chevron").classList.replace("fa-chevron-down", "fa-chevron-up");
                document.querySelector(".ingredient__results").classList.replace("ingredient__results__undisplayed","ingredient__results__displayed");
                
                // fermer appareils wrapper
                document.querySelector(".appareil__chevron").classList.replace("fa-chevron-up", "fa-chevron-down");
                document.querySelector(".appareil__results").classList.replace("appareil__results__displayed", "appareil__results__undisplayed");

                // fermer ustensils wrapper
                document.querySelector(".ustensil__chevron").classList.replace("fa-chevron-up", "fa-chevron-down");
                document.querySelector(".ustensil__results").classList.replace("ustensil__results__displayed", "ustensil__results__undisplayed");
    
                document.querySelector(".ustensil__results").innerHTML = "";
                document.querySelector(".appareil__results").innerHTML = "";
            }
            // Actualise la liste des tags
            this.render(input.target.value);
            
        })
        // si on click sur le chevron ingredient, fermer le wrapper ingredient
        this.querySelector(".ingredient__chevron").addEventListener('click', () => {
            if(document.querySelector(".ingredient__results").classList.contains("ingredient__results__displayed")){
                document.querySelector(".ingredient__chevron").classList.replace("fa-chevron-up", "fa-chevron-down");
                document.querySelector(".ingredient__results").classList.replace("ingredient__results__displayed","ingredient__results__undisplayed");
            }
        });
    }
}