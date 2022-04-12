// Recupérer les recettes en cours dans localstorage
let data = localStorage.getItem('recipes')
data = JSON.parse(data);

/** Classe qui gère le filtre Ustensil */
export class UstensilFilter extends HTMLElement {
   
    // Constructeur de la classe
    constructor() {
        super();
        this.allUstensils = new Set();
    } 

    /** 
     * Methode appelé automatiquement lors de l'instanciation de la classe UstensilFilter
     * qui cree le filtre Ustensil à partir d'un template HTML
     * écoute les évènements dessus 
     * filtre la liste des ustensils 
     * afficher le resultat dans l'element HTML ustensil__results
     */
    connectedCallback () {
        const template = document.createElement('template');
        template.innerHTML = `
        <!-- filter by ustensil -->
        <form class="research__fields__form ustensil__form">
            <input
                class="research__fields__form__input ustensil__input"
                placeholder="Ustensiles"
                type="search"
            />
            <button class="research__fields__form__submit ustensil__button" type="button">
                <i class="far fa-chevron-down ustensil__chevron"></i>
            </button>
        </form>
        <aside class="research__fields__form__results__ustensil">
            <ul class="ustensil__results ustensil__results__undisplayed"></ul>
        </aside>
        `;
        this.appendChild(template.content);
        this.queryUstensils();
        this.render("");
        this.listenInput();
    }

    /** 
     * Actualiser la liste des tags ustensils selon l'entrée de l'utilisateur sur le filtre ustensiles 
     * */
    queryUstensils() {
        data.recipes.forEach(recipe => recipe.ustensils.forEach(ustensil => {
            this.allUstensils.add(ustensil)
        }))
    }

    /** 
     * Traiter la liste des tags en fonction de l'entrée utilisateur
     * @param {string} request - texte entré par l'utilisateur sur le champ de filtre Ustensiles
     */
    render(request) {
        // vider le champ des tags
        this.querySelectorAll("li").forEach(element => {element.remove()})
        
        let ustensils = [];

        // Recupérer les recettes en cours dans localstorage
        let data = localStorage.getItem('recipes')
        data = JSON.parse(data);

        /** Actualiser la liste des tags ustensils selon l'entrée de l'utilisateur sur le filtre ustensiles */
        this.allUstensils = new Set();
        data.recipes.forEach(recipe => recipe.ustensils.forEach(ustensil => this.allUstensils.add(ustensil)))

        if(request === ""){ 
            // Si aucune entrée, renvoie tous les tags ustensils
            ustensils = [...this.allUstensils].sort();
            console.log("new ustensils empty", ustensils.length);
        }else{ 
            // Si entrée détectée, renvoie les tags ustensils corespondants
            ustensils = [...this.allUstensils].sort().filter(ustensil => ustensil.toLowerCase().includes(request.toLowerCase()));
            console.log("new ustensils fill " + request, ustensils.length);
        }

        // Affiche la liste des tags ustensils 
        ustensils.forEach((ustensil) => {
            var li = document.createElement("li");
            li.classList.add("ustensil__item");
            li.appendChild(document.createTextNode(`${ustensil.toLowerCase()}`));
            document.querySelector(".ustensil__results").appendChild(li);
        });
        
    }

    /**
     * les evenements pouvant survenir sur le champ de filtre Ustensils
     */
    listenInput() {

        // pour toute entrée sur le champ ustensil, acualiser le champ des tags
        this.querySelector(".ustensil__input").addEventListener('input', input => {
            this.render(input.target.value);
        })

        // si on click sur le champ ustensil
        this.querySelector(".ustensil__input").addEventListener('click', input => {
            if(document.querySelector(".ustensil__results").classList.contains("ustensil__results__undisplayed")){

                // afficher les tags ustensils disponibles
                document.querySelector(".ustensil__chevron").classList.replace("fa-chevron-down", "fa-chevron-up");
                document.querySelector(".ustensil__results").classList.replace("ustensil__results__undisplayed","ustensil__results__displayed")
                
                // fermer appareils wrapper
                document.querySelector(".appareil__chevron").classList.replace("fa-chevron-up", "fa-chevron-down");
                document.querySelector(".appareil__results").classList.replace("appareil__results__displayed", "appareil__results__undisplayed")

                // fermer ingredient wrapper
                document.querySelector(".ingredient__chevron").classList.replace("fa-chevron-up", "fa-chevron-down");
                document.querySelector(".ingredient__results").classList.replace("ingredient__results__displayed", "ingredient__results__undisplayed")
    
                document.querySelector(".appareil__results").innerHTML = "";
                document.querySelector(".ingredient__results").innerHTML = "";
            }
            // Actualise la liste des tags
            this.render(input.target.value);
            
        })

        // si on click sur le chevron ustensil, fermer le wrapper ustensil
        this.querySelector(".ustensil__chevron").addEventListener('click', () => {
            if(document.querySelector(".ustensil__results").classList.contains("ustensil__results__displayed")){
                document.querySelector(".ustensil__chevron").classList.replace("fa-chevron-up", "fa-chevron-down");
                document.querySelector(".ustensil__results").classList.replace("ustensil__results__displayed","ustensil__results__undisplayed")

            }
        });
    }
}