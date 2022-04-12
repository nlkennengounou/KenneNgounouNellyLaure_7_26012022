// Recupérer les recettes en cours dans localstorage
let data = localStorage.getItem('recipes')
data = JSON.parse(data);

/** Classe qui gère le filtre Appareil */
export class AppareilFilter extends HTMLElement {

    // Constructeur de la classe     
    constructor() {
        super();
        this.allAppareils = new Set();
    } 
    
    /** 
     * Methode appelé automatiquement lors de l'instanciation de la classe AppareilFilter
     * qui cree le filtre Appareil à partir d'un template HTML
     * écoute les évènements dessus 
     * filtre la liste des Appareils 
     * afficher le resultat dans l'element HTML appareil__results
     */
    connectedCallback () {
        const template = document.createElement('template');
        template.innerHTML = `
            <!-- filter by appareil -->
            <form class="research__fields__form appareil__form">
                <input
                    class="research__fields__form__input appareil__input"
                    placeholder="Appareil"
                    type="search"
                />
                <button class="research__fields__form__submit appareil__button" type="button">
                    <i class="far fa-chevron-down appareil__chevron"></i>
                </button>
            </form>
            <aside class="research__fields__form__results__appareil">
                <ul class="appareil__results appareil__results__undisplayed"></ul>
            </aside>
        `;
        this.appendChild(template.content);
        this.queryAppareils();
        this.render("");
        this.listenInput();
    }

    /** 
     * Actualiser la liste des tags appareils selon l'entrée de l'utilisateur sur le filtre appareils 
     * */
    queryAppareils() {
        data.recipes.forEach(recipe => this.allAppareils.add(recipe.appliance));
    }

    /** 
     * Traiter la liste des tags en fonction de l'entrée utilisateur
     * @param {string} request - texte entré par l'utilisateur sur le champ de filtre Appareils
     */    
    render(request) {
        // vider le champ des tags
        this.querySelectorAll("li").forEach(element => {element.remove()})
        
        let appareils = [];
         
        // Recupérer les recettes en cours dans localstorage
        let data = localStorage.getItem('recipes')
        data = JSON.parse(data);

        /** Actualiser la liste des tags Appareils selon l'entrée de l'utilisateur sur le filtre Appareils */
        this.allAppareils = new Set();
        data.recipes.forEach(recipe => this.allAppareils.add(recipe.appliance));

        if(request === ""){
            // Si aucune entrée, renvoie tous les tags Appareils
            appareils = [...this.allAppareils].sort();
            console.log("new appareils empty", appareils.length);
        }else{
            // Si entrée détectée, renvoie les tags Appareils corespondants
            appareils = [...this.allAppareils].sort().filter(appareil => appareil.toLowerCase().includes(request.toLowerCase()));
            console.log("new appareils fill " + request, appareils.length);
        }

        // Affiche la liste des tags Appareils
        appareils.forEach((appareil) => {
            var li = document.createElement("li");
            li.classList.add("appareil__item");
            li.appendChild(document.createTextNode(`${appareil.toLowerCase()}`));
            document.querySelector(".appareil__results").appendChild(li);
        });
        
    }


    listenInput() {
        // pour toute entrée sur le champ appareil, acualiser le champ des tags
        this.querySelector(".appareil__input").addEventListener('input', input => {
            this.render(input.target.value);
        })

        // si on click sur le change appareil
        this.querySelector(".appareil__input").addEventListener('click', input => {
            if(document.querySelector(".appareil__results").classList.contains("appareil__results__undisplayed")){

                // afficher les tags appareils disponibles
                document.querySelector(".appareil__chevron").classList.replace("fa-chevron-down", "fa-chevron-up");
                document.querySelector(".appareil__results").classList.replace("appareil__results__undisplayed","appareil__results__displayed")
                
                // fermer ustensils wrapper
                document.querySelector(".ustensil__chevron").classList.replace("fa-chevron-up", "fa-chevron-down");
                document.querySelector(".ustensil__results").classList.replace("ustensil__results__displayed", "ustensil__results__undisplayed")

                // fermer ingredient wrapper
                document.querySelector(".ingredient__chevron").classList.replace("fa-chevron-up", "fa-chevron-down");
                document.querySelector(".ingredient__results").classList.replace("ingredient__results__displayed", "ingredient__results__undisplayed")
    
                document.querySelector(".ustensil__results").innerHTML = "";
                document.querySelector(".ingredient__results").innerHTML = "";
            }
            // Actualise la liste des tags
            this.render(input.target.value);
            
        })

        // si on click sur le chevron appareil, fermer le wrapper appareil
        this.querySelector(".appareil__chevron").addEventListener('click', () => {
            if(document.querySelector(".appareil__results").classList.contains("appareil__results__displayed")){
                document.querySelector(".appareil__chevron").classList.replace("fa-chevron-up", "fa-chevron-down");
                document.querySelector(".appareil__results").classList.replace("appareil__results__displayed","appareil__results__undisplayed");
            }
        });
    }
}