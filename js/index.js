// lanceur des differents modules
import Api from "../js/api.js";

(function applauncher() {
	new Api().getDataFromJsonFile().then((data) => {
     
        if(window.location.pathname.includes("/index.html")) {
			console.log(data);
		}
        
	}).catch((err) => console.log("An error occurs when fetching recipes", err));
    
})();
