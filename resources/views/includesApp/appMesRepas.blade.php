<div v-else-if="appContent === 'maNourriture'">
    <h2>Ma nourriture</h2>
    COUCOU
    <button v-on:click="loadMyFood('myMeal')" class="waves-effect waves-light btn-large">Mes repas</button>
    <button v-on:click="loadMyFood('myDish')" class="waves-effect waves-light btn-large">Mes plats</button>
    <button v-on:click="loadMyFood('myFood')" class="waves-effect waves-light btn-large">Mes aliments</button>
    <button v-on:click="loadMyFood('addMeal')" class="waves-effect waves-light btn-large">Ajouter un repas</button>
    <button v-on:click="loadMyFood('addDish')" class="waves-effect waves-light btn-large">Ajouter un plat</button>
    <button v-on:click="loadMyFood('addFood')" class="waves-effect waves-light btn-large">Ajouter un aliment</button>
    <div v-if="myFood === 'myMeal'">

    </div>
    <div v-else-if="myFood === 'myDish'">
        <div class="row">
            <div class="food-block col s3" v-for="(value,name) in userDish">
                <div class="food-content col s12">
                    @{{ value.name }} </br>
                    @{{ value.cal }} </br>
                    @{{ value.pro }} </br>
                    @{{ value.lip }} </br>
                    @{{ value.glu }} </br>
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="myFood === 'myFood'">
        <div class="row">
            <div class="food-block col s3" v-for="(value,name) in userFood">
                <div class="food-content col s12">
                    @{{ value.name }} </br>
                    @{{ value.cal }} </br>
                    @{{ value.pro }} </br>
                    @{{ value.lip }} </br>
                    @{{ value.glu }} </br>
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="myFood === 'addMeal'">

    </div>
    <div v-else-if="myFood === 'addDish'">
        <form id="add-dish-form">
            <label for="dish-name">Nom de l'aliment<input id="dish-name" type="text" name="dishName"></label>
            <span id="dishNameError">@{{ dishFormError.dishNameError }}</span>
            <label for="dish-cal">Calories<input id="dish-cal" type="text" name="dishCal"></label>
            <span id="dishCalError">@{{ dishFormError.dishCalError }}</span>
            <label for="dish-quantity">Quantité<input id="dish-quantity" type="text" name="dishQuant"></label>
            <span id="dishQuantError">@{{ dishFormError.dishQuantError }}</span>
            <label for="dish-pro">Protéine<input id="dish-pro" type="text" name="dishPro"></label>
            <span id="dishProError">@{{ dishFormError.dishProError }}</span>
            <label for="dish-lip">Lipide<input id="dish-lip" type="text" name="dishLip"></label>
            <span id="dishLipError">@{{ dishFormError.dishLipError }}</span>
            <label for="dish-glu">Glucide<input id="dish-glu" type="text" name="dishGlu"></label>
            <span id="dishGluError">@{{ dishFormError.dishGluError }}</span>
            <button type="submit" id="add-dish-submit" v-on:click="createDish">Ajouter</button>
        </form>
    </div>
    <div v-else-if="myFood === 'addFood'">
        <form id="add-food-form">
            <label for="food-name">Nom de l'aliment<input id="food-name" type="text" name="foodName"></label>
            <span id="foodNameError">@{{ foodFormError.foodNameError }}</span>
            <label for="food-cal">Calories<input id="food-cal" type="text" name="foodCal"></label>
            <span id="foodCalError">@{{ foodFormError.foodCalError }}</span>
            <label for="food-quantity">Quantité<input id="food-quantity" type="text" name="foodQuant"></label>
            <span id="foodQuantError">@{{ foodFormError.foodQuantError }}</span>
            <label for="food-pro">Protéine<input id="food-pro" type="text" name="foodPro"></label>
            <span id="foodProError">@{{ foodFormError.foodProError }}</span>
            <label for="food-lip">Lipide<input id="food-lip" type="text" name="foodLip"></label>
            <span id="foodLipError">@{{ foodFormError.foodLipError }}</span>
            <label for="food-glu">Glucide<input id="food-glu" type="text" name="foodGlu"></label>
            <span id="foodGluError">@{{ foodFormError.foodGluError }}</span>
            <button type="submit" id="add-food-submit" v-on:click="createFood">Ajouter</button>
        </form>
    </div>
</div>