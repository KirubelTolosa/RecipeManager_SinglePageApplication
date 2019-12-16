		
function searchCuisine() {
	       var res;
	       var recipeList = document.getElementById("searchedItems");
           var recipeSearched = document.getElementById("search").value;
	
			//send request to the API
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {						
						recipeList.innerHTML = "";
						res = JSON.parse(xhttp.responseText);
						for (var i=0; i<res.recipes.length; i++)
						 {		
						  var recipe = res.recipes[i];	
					 	  var cuisine = document.createElement("div");
						  		var cuisineContainer = document.createElement("div");
							  		var cuisineImage = document.createElement("img");
								  	var cuisineDetail = document.createElement("div");
								  		var title = document.createElement("h3");
								  		var publisher = document.createElement("h3");
								  	var listId = recipe.recipe_id;
						  title.innerText = recipe.title;
						  publisher.innerText = recipe.publisher;
						  cuisineImage.src = recipe.image_url;
						  cuisineImage.className = 'cropper';
						  cuisineImage.setAttribute("id", listId);
						  cuisineImage.setAttribute("data-id", listId);


						  //var action = "javascript:loadRecipe(\"" + listId + "\");";
						  var action = "javascript:loadRecipe(this);";
						  cuisineImage.setAttribute("onClick", action);


						  cuisineContainer.className = 'flexerContainer';
						  cuisineDetail.className = 'flexerDetail';
						  title.className = 'flexerDetail';
							  	cuisineDetail.append(title);
							  	cuisineDetail.append(publisher);
							  	cuisineContainer.append(cuisineImage);
							  	cuisineContainer.append(cuisineDetail);
							  cuisine.append(cuisineContainer);						  
						  recipeList.append(cuisine);
						}						
					}
					};
				xhttp.open("GET", "https://api.codetabs.com/v1/proxy?quest=https://recipesapi.herokuapp.com/api/search?q=" + recipeSearched, true);
				xhttp.send();
}

function loadRecipe(source) {
	
	var id = source.attributes["data-id"].nodeValue;
	var ingredients = document.getElementById("list");	
	var xhttp_a = new XMLHttpRequest();
				xhttp_a.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {						
						ingredients.innerHTML = "";
						var res_2 = JSON.parse(xhttp_a.responseText);
						var id = res_2.recipe._id;						
						var list = res_2.recipe.ingredients;
						for (var i = 0; i<list.length; i++) {
							var ingredientContainer = document.createElement("div");			
							var ingredientList = document.createElement("li");																
							ingredientContainer = list[i];	
							ingredientList.append(ingredientContainer);							
							ingredients.append(ingredientList); 
						}						
					}
				};		
				xhttp_a.open("GET", "https://api.codetabs.com/v1/proxy?quest=https://recipesapi.herokuapp.com/api/get?rId=" + id, true);
				xhttp_a.send();					
}


						








