/**
 * An imput used for the search
 */
 export class SearchBar extends HTMLElement {
    constructor() {
        super();
        
    } 
    
    /**
     * Insert a input template used by the search
     */
    connectedCallback () {
        const template = document.createElement('template');
        template.innerHTML = `
        <div class="research">
            <form class="research__bar">
                <input
                    class="research__bar__input"
                    placeholder="Rechercher un ingrédient, appareil, ustensiles ou une recette"
                    type="search"
                />
                <button class="research__bar__submit" type="submit">
                    <i class="far fa-search"></i>
                </button>
            </form>
            <aside class="research__filters"></aside>
        </div>
      `;
        this.appendChild(template.content);
        this.listerners();
    }

    listerners(){
        this.querySelector(".research__bar__input").addEventListener("click", ()=>{
            this.closeAllWrapper()
        })

        this.querySelector(".research__bar__input").addEventListener("change", ()=>{
            this.closeAllWrapper()
        })
    }

    closeAllWrapper(){
        document.querySelector(".ingredient__chevron").classList.replace("fa-chevron-up", "fa-chevron-down");
        document.querySelector(".ingredient__results").classList.replace("ingredient__results__displayed","ingredient__results__undisplayed")
        
        document.querySelector(".ustensil__chevron").classList.replace("fa-chevron-up", "fa-chevron-down");
        document.querySelector(".ustensil__results").classList.replace("ustensil__results__displayed", "ustensiles__results__undisplayed")

        document.querySelector(".appareil__chevron").classList.replace("fa-chevron-up", "fa-chevron-down");
        document.querySelector(".appareil__results").classList.replace("appareil__results__displayed", "appareil__results__undisplayed")
    }
}
