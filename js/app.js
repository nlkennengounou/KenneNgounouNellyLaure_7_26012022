import {IndexPage} from "./index.js"
window.customElements.define("index-page", IndexPage);

import {SearchBar} from "./search-bar.js"
window.customElements.define("research-bar", SearchBar);

import {IngredientFilter} from "./ingredient-filter.js"
window.customElements.define("ingredient-filter", IngredientFilter);

import {AppareilFilter} from "./appareil-filter.js"
window.customElements.define("appareil-filter", AppareilFilter);

import {UstensilFilter} from "./ustensil-filter.js"
window.customElements.define("ustensil-filter", UstensilFilter);

import {SearchResult} from "./search-results.js"
window.customElements.define("search-result", SearchResult);
