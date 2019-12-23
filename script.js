		
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
	var ingredients_1 = document.getElementById("list_1");	
	var ingredients_2 = document.getElementById("list_2");	
	var mainPicture = document.getElementById("mainPicture");
	var cuisineImage = document.createElement("img"); 
	var publisher = document.getElementById("publisher");
	var social_rank = document.getElementById("social_rank");
	var pictureFrameContainer = document.getElementById("pictureFrameContainer");
	var xhttp_a = new XMLHttpRequest();
				xhttp_a.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {	

						ingredients_1.innerHTML = "";						
						ingredients_2.innerHTML = "";
						mainPicture.innerHTML = "";	
						publisher.innerHTML = "";
						social_rank.innerHTML = "";

						var res_2 = JSON.parse(xhttp_a.responseText);
						var id = res_2.recipe._id;						
						var list = res_2.recipe.ingredients;
						var publisherValue = res_2.recipe.publisher;
						var social_rankValue =  Math.round(res_2.recipe.social_rank) + "%";
						var a = Math.round(list.length/2);
						b = list.length;

							pictureFrameContainer.className = 'pictureFrame1';
							cuisineImage.src =res_2.recipe.image_url;	
							mainPicture.append(cuisineImage);	
							cuisineImage.className = 'fillwidth'; 
							
							
						    publisher.append(publisherValue);
							social_rank.append(social_rankValue);

						for (var i = 0; i<a; i++) {
							var ingredientContainer = document.createElement("div");			
							var ingredientList = document.createElement("li");
							var action_2 = "javascript:shopItem(this);";
							ingredientList.setAttribute("onClick", action_2);

							ingredientList.className = 'list'; 		
							ingredientList.setAttribute("item_id", "item" + i);														
							ingredientContainer = list[i];	
							ingredientList.append(ingredientContainer);							
							ingredients_1.append(ingredientList); 
						}		

						for (var j = a; j<b; j++) {						
							var ingredientContainer_2 = document.createElement("div");			
							var ingredientList_2 = document.createElement("li");	
							var action_2 = "javascript:shopItem(this);";
							ingredientList_2.setAttribute("onClick", action_2);

							ingredientList_2.className = 'list'; 	
							ingredientList.setAttribute("item_id", "item" + j);		
							ingredientContainer_2 = list[j];	
							ingredientList_2.append(ingredientContainer_2);							
							ingredients_2.append(ingredientList_2); 
						}				
					}
					
				};		
				xhttp_a.open("GET", "https://api.codetabs.com/v1/proxy?quest=https://recipesapi.herokuapp.com/api/get?rId=" + id, true);
				xhttp_a.send();					
}

function shopItem(input) {
	var item = input.innerText;

	//var item = input.textContent;
	var shoppingList = document.getElementById("shoppingList");
	var removeButton = document.createElement("img");
	//var text = document.createTextNode("X")
	removeButton.src = "https://cdn1.iconfinder.com/data/icons/main-ui-elements-with-colour-bg/512/close-24.png";                  
    //removeButton.appendChild(text);
    var remove = "javascript:remove(this);";
    removeButton.setAttribute("onClick", remove);
	var itemList = document.createElement("li");
	
	//itemList.setAttribute("")
	itemList.append(removeButton);
	itemList.append(item);
	itemList.className = 'list';
	shoppingList.append(itemList);
	//document.getElementById("myBtn").addEventListener("click", displayDate);
}

function remove(input) {	
	input.parentNode.remove();	    

}

						
function PlaceOrder() {

	var Items = document.getElementById("shoppingList").children;
	var size = Items.length;
	var itemsDescription = "";
	var selection = document.getElementById("selection");
	var myArray = [];
		for(var i = 0; i<size; i++) {
			//itemsDescription = itemsDescription + Items[i].innerText + ",";
			//selection.innerText = "Your selections are" + itemsDescription;
			myArray.push(Items[i].innerText);
		}
	localStorage.setItem("shoppingStorage", JSON.stringify(myArray));
	showOrders();
}

function showOrders() {
	
	var storedList = JSON.parse(localStorage.getItem("shoppingStorage"));
	var ordersElement = document.getElementById("storedList");
	var size = storedList.length;
	for (var i = 0; i<size; i++) {
		var orderElement = document.createElement("li");
		orderElement.innerText = storedList[i];
		ordersElement.append(orderElement);
	}
}



