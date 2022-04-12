export class IndexPage extends HTMLElement {
    
    constructor() {
        super();
    } 
    
    /**
     * Insert the page template
     */
    connectedCallback () {
        const template = document.createElement('template');
        template.innerHTML = `
		<div class="Application">
			<!-- Entete page d'accueil -->
			<header  class="header">
				<img src= "../assets/media/logo.svg" class="header__logo" alt="Logo de Les Petits Plats - page d'accueil"/>
			</header>
    
			<!-- Barre de recherche page d'accueil -->
			<research-bar></research-bar>
			<research-filters></research-filters>
			<section class="research__filters">
				<ingredient-filter></ingredient-filter>
				<appareil-filter></appareil-filter>
				<ustensil-filter></ustensil-filter>
            </section>
            <search-result></search-result>
  		</div>
      `;
        this.appendChild(template.content);
    }
}


