import { searchA } from "./searchByAlgoA.js";
import { searchB } from "./searchByAlgoB.js";

/** Classe qui gère le champ de recherche principal */
export class SearchResult extends HTMLElement {

    // Constructeur de la classe
    constructor() {
        super();
        this.results = searchA("", [], [], []);
        // this.results = searchB("", [], [], []);

        // mettre à jour la liste des recettes en fonction du resultat dans localStorage
        localStorage.clear();
        let dat = {'recipes': Object.values(this.results)};
        localStorage.setItem('recipes', JSON.stringify(dat));

        this.request = "";
        this.appareils = [];
        this.ustensils = [];
        this.ingredients = [];
        this.allTags = [];
    } 
    
    /** 
     * Methode appelé automatiquement lors de l'instanciation de la classe SearchResult
     * met à jour la section resultats de recherche
     */
    connectedCallback () {
        const template = document.createElement('template');
        template.innerHTML = `
            <section id="recette" class="recette"> 

            </section>
        `;
        this.appendChild(template.content);
        this.render();
        this.listeners();
    }

    /** Methode permetant de creer chaque recette sous forme d'article
     * inserer ces articles dans la section resultat
     * afficher un message si le tableau de resultat est vide
     */
    render() {
        if(this.results.length === 0){
            // afficher un message si le tableau de resultat est vide
            document.querySelectorAll("section")[1].innerHTML = ""
            document.querySelectorAll("section")[1].classList.replace("recette", "no__results")
            let template = `<div> Aucune recette ne correspond à votre critère… vous pouvez
                chercher « tarte aux pommes », « poisson », etc. </div>`
            document.querySelectorAll("section")[1].innerHTML = template;

        }else{
            // creer chaque recette sous forme d'article
            document.querySelectorAll("section")[1].classList.replace("no__results", "recette")
            document.querySelectorAll("section")[1].innerHTML = "";
            this.results.forEach(recipe => {
            
                let article = document.createElement("article");
                article.className="recipe__card";
                
                let ingredients = recipe.ingredients;
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
                        <h2 class="recipe__card__header__title"> ${recipe.name}</h2>
                        <h2 class="recipe__card__header__time"> ${recipe.time} min
                            <i class="fal fa-clock recipe__card__header__icon"> </i>
                        </h2>
                    </header>
                    <aside class="recipe__card__aside"> 
                        <ul id="recipe__card__list_${recipe.id}"class="recipe__card__list">
                            ${ingredientsResult}
                        </ul>
                        <p class="recipe__card__description"> ${recipe.description}</p>
                    </aside>
                </section>
                `
                //inserer ces articles dans la section resultat
                article.innerHTML = template;
                document.querySelectorAll("section")[1].insertAdjacentElement('beforeend', article);
            });
        }
    }

    /**
     * les evenements pouvant survenir
     */
    listeners() {
        // search bar
        document.querySelector(".research__bar__input").addEventListener('input', input => {
            if(input.target.value.length > 2) {
                this.request = document.querySelector("input").value;
            }else {
                this.request = "";
            }
            this.querySearch();
        })

        // ingredient filter

        // ingredientItemOnclick
        document.querySelectorAll(".ingredient__item").forEach(ingredient => {
            ingredient.addEventListener('click', event => {
                let ingrt = event.target.innerHTML;
                if(!this.ingredients.includes(ingrt)){
                    this.ingredients.push(ingrt);
                    this.allTags.push(ingrt);
                }
                this.addTag(this.allTags, "ingredient");
                this.querySearch();
                document.querySelector(".ingredient__results").classList.replace("ingredient__results__displayed","ingredient__results__undisplayed");
            }) 
        })

        // ingredientInputOnChange + ingredientItemOnclick
        document.querySelector(".ingredient__input").addEventListener("change", () => {
            document.querySelectorAll(".ingredient__item").forEach(ingredient => {
                ingredient.addEventListener('click', event => {
                    let ingrt = event.target.innerHTML;
                    if(!this.ingredients.includes(ingrt)){
                        this.ingredients.push(ingrt);
                        this.allTags.push(ingrt);
                    }
                    this.addTag(this.allTags, "ingredient");
                    this.querySearch();
                    document.querySelector(".ingredient__results").classList.replace("ingredient__results__displayed","ingredient__results__undisplayed");
                }) 
            })
        })

        // ingredientInputOnChange + ingredientItemOnclick
        document.querySelector(".ingredient__input").addEventListener("click", () => {
            document.querySelectorAll(".ingredient__item").forEach(ingredient => {
                ingredient.addEventListener('click', event => {
                    let ingrt = event.target.innerHTML;
                    if(!this.ingredients.includes(ingrt)){
                        this.ingredients.push(ingrt);
                        this.allTags.push(ingrt);
                    }
                    this.addTag(this.allTags, "ingredient");
                    this.querySearch();
                    document.querySelector(".ingredient__results").classList.replace("ingredient__results__displayed","ingredient__results__undisplayed");
                }) 
            })
        })


        // appareil filter

        // appareilItemOnclick
        document.querySelectorAll(".appareil__item").forEach(appareil => {
            appareil.addEventListener('click', event => {
                let app = event.target.innerHTML;
                this.appareils = [app];
                if(! this.allTags.includes(app)){
                    this.allTags.push(app);
                }
                this.addTag(this.allTags, "appareil");
                this.querySearch();
                document.querySelector(".appareil__results").classList.replace("appareil__results__displayed","appareil__results__undisplayed")

            }) 
        })

        // appareilInputOnChange + appareilItemOnclick
        document.querySelector(".appareil__input").addEventListener("change", () => {
            document.querySelectorAll(".appareil__item").forEach(appareil => {
                appareil.addEventListener('click', event => {
                    this.appareils = [app];
                    if(! this.allTags.includes(app)){
                        this.allTags.push(app);
                    }
                    this.addTag(this.allTags, "appareil");
                    this.querySearch();
                }) 
            })
        })

        // appareilInputOnChange + appareilItemOnclick
        document.querySelector(".appareil__input").addEventListener("click", () => {
            document.querySelectorAll(".appareil__item").forEach(appareil => {
                appareil.addEventListener('click', event => {
                    let app = event.target.innerHTML;                  
                    this.appareils = [app];
                    if(! this.allTags.includes(app)){
                        this.allTags.push(app);
                    }
                    this.addTag(this.allTags, "appareil");
                    this.querySearch();
                    document.querySelector(".appareil__results").classList.replace("appareil__results__displayed","appareil__results__undisplayed");
                }) 
            })
        })
        
        // ustensil filter

        // ustensilItemOnclick
        document.querySelectorAll(".ustensil__item").forEach(ustensil => {
            ustensil.addEventListener('click', event => {
                let ust = event.target.innerHTML;
                if(!this.ustensils.includes(ust)){
                    this.ustensils.push(ust);
                    this.allTags.push(ust);
                }
                this.addTag(this.allTags, "ustensil");
                this.querySearch();
                document.querySelector(".ustensil__results").classList.replace("ustensil__results__displayed","ustensil__results__undisplayed");
            }) 
        })

        // ustensilInputOnChange + ustensilItemOnclick
        document.querySelector(".ustensil__input").addEventListener("change", () => {
            document.querySelectorAll(".ustensil__item").forEach(ustensil => {
                ustensil.addEventListener('click', event => {
                    let ust = event.target.innerHTML;
                    if(!this.ustensils.includes(ust)){
                        this.ustensils.push(ust);
                        this.allTags.push(ust);
                    }
                    this.addTag(this.allTags, "ustensil");
                    this.querySearch();
                    document.querySelector(".ustensil__results").classList.replace("ustensil__results__displayed","ustensil__results__undisplayed");
                }) 
            })
        })

        // ustensilInputOnChange + ustensilItemOnclick
        document.querySelector(".ustensil__input").addEventListener("click", () => {
            document.querySelectorAll(".ustensil__item").forEach(ustensil => {
                ustensil.addEventListener('click', event => {
                    let ust = event.target.innerHTML;
                    if(!this.ustensils.includes(ust)){
                        this.ustensils.push(ust);
                        this.allTags.push(ust);
                    }
                    this.addTag(this.allTags, "ustensil");
                    this.querySearch();
                    document.querySelector(".ustensil__results").classList.replace("ustensil__results__displayed","ustensil__results__undisplayed");
                }) 
            })
        })



    }

    /** actualiser la zone de resultat */
    querySearch() {
        // vider la section resultat
        this.querySelectorAll("article").forEach(element => {element.remove()})

        console.log("Looking for # " + this.request + " # in search bar");
        console.log("Looking for # " + this.ingredients + " # in ingredient filter");
        console.log("Looking for # " + this.appareils + " # in appareil filter");
        console.log("Looking for # " + this.ustensils + " # in ustensil filter");

        this.results = searchA(this.request, this.appareils, this.ustensils, this.ingredients);
        // this.results = searchB(this.request, this.appareils, this.ustensils, this.ingredients);

        // mettre à jour la liste des recettes en fonction du resultat dans localStorage
        let dat = {'recipes': Object.values(this.results)};
        localStorage.setItem('recipes', JSON.stringify(dat));

        this.render();
    }

    /** 
     * mettre à jour la zone des Tags selectionnés
     * @param {array} selectedTags - tableau des tags selectionnés par l'utlisateur
     * @param {string} filter - choix entre les textes "ingredient", "ustensil", "appareil"
    */
    addTag(selectedTags, filter){
        // vider le champ des Tags selectionnés
        document.querySelector(".research__filters").innerHTML = "";

        // trier les éléments uniques du tableau 
        let allTags = [];
        allTags = [...selectedTags];

        allTags.forEach((filterTag) => {

            var div = document.createElement("div");
            div.classList.add("filter__query");

            // ajouter une classe spécifique selon le type de tag selectionné
            if(this.ingredients.includes(filterTag)){
                div.classList.add("filter__query__" + "ingredient")
                div.appendChild(document.createTextNode(`${filterTag}`));
            }else  if(this.appareils.includes(filterTag)){
                div.classList.add("filter__query__" + "appareil")
                div.appendChild(document.createTextNode(`${filterTag}`));
            } else  if(this.ustensils.includes(filterTag)){
                div.classList.add("filter__query__" + "ustensil")
                div.appendChild(document.createTextNode(`${filterTag}`));
            }

            // ajouter un bouton close
            var i = document.createElement("i");
            i.classList.add("fal");
            i.classList.add("fa-times-circle");
            i.classList.add("filter__query__icon");
            div.appendChild(i);

            // ajouter un attribut avec la valeur selectionné pour supprimer tu tableau de tags selectionnés
            i.setAttribute("data-close", `${filterTag}`);
            div.setAttribute("data-close", `${filterTag}`);

            // ajouter des evenements sur on clique sur un tag à supprimer
            if(filter === "ingredient"){
                i.addEventListener("click", this.onClickTagIngredient.bind(this))
                div.addEventListener("click", this.onClickTagIngredient.bind(this))
            }
            if(filter === "appareil"){
                i.addEventListener("click", this.onClickTagAppareil.bind(this))
                div.addEventListener("click", this.onClickTagAppareil.bind(this))
            }
            if(filter === "ustensil"){
                i.addEventListener("click", this.onClickTagUstensil.bind(this))
                div.addEventListener("click", this.onClickTagUstensil.bind(this))
            }
           
            return document.querySelector(".research__filters").appendChild(div);
	    });

    }

    /**Supprimer un tag Ingredient parmi les tags selectionnés */
    onClickTagIngredient(e){

        // recuperer la tag à supprimer
        let currentTag = e.target.getAttribute("data-close");

        // actualiser les tableaux 
        this.ingredients = this.ingredients.filter(tag => tag !== currentTag);
        this.appareils = this.appareils.filter(tag => tag !== currentTag);
        this.ustensils = this.ustensils.filter(tag => tag !== currentTag);
        this.allTags = this.allTags.filter(tag => tag !== currentTag);

        // actualiser la liste des tags ajoutés
        this.addTag(this.allTags, "ingredient");
        this.querySearch();

        // fermer la zone de tag
        document.querySelector(".ingredient__results").classList.replace("ingredient__results__displayed","ingredient__results__undisplayed");
    }

    /**Supprimer un tag Appareil parmi les tags selectionnés */
    onClickTagAppareil(e){

        // recuperer la tag à supprimer
        let currentTag = e.target.getAttribute("data-close");

        // actualiser les tableaux
        this.ingredients = this.ingredients.filter(tag => tag !== currentTag);
        this.appareils = this.appareils.filter(tag => tag !== currentTag);
        this.ustensils = this.ustensils.filter(tag => tag !== currentTag);
        this.allTags = this.allTags.filter(tag => tag !== currentTag);
        
        // actualiser la liste des tags ajoutés
        this.addTag(this.allTags, "appareil");
        this.querySearch();

        // fermer la zone de tag à selectionner
        document.querySelector(".appareil__results").classList.replace("appareil__results__displayed","appareil__results__undisplayed");
    }

    /**Supprimer un tag Ingredient parmi les tags selectionnés */
    onClickTagUstensil(e){
        let currentTag = e.target.getAttribute("data-close");
        
        // actualiser les tableaux
        this.ingredients = this.ingredients.filter(tag => tag !== currentTag);
        this.appareils = this.appareils.filter(tag => tag !== currentTag);
        this.ustensils = this.ustensils.filter(tag => tag !== currentTag);
        this.allTags = this.allTags.filter(tag => tag !== currentTag);

        // actualiser la liste des tags ajoutés
        this.addTag(this.allTags, "ustensil");
        this.querySearch();

        // fermer la zone de tag à selectionner
        document.querySelector(".ustensil__results").classList.replace("ustensil__results__displayed","ustensil__results__undisplayed");
    }
}

