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
            <div class="food-block col s3" v-for="(value,index) in userDish">
                <div class="food-content col s12">
                    <div class="col s12 center-align">@{{ value.name }}</div>
                    <div class="col s6">Calories : @{{ value.cal }} </div>
                    <div class="col s6">Quantité : @{{ value.quant }} g</div>
                    <div class="col s6">Protéines : @{{ value.pro }} g</div>
                    <div class="col s6">Lipides : @{{ value.lip }} g</div>
                    <div class="col s6">Glucides : @{{ value.glu }} g</div>
                    <div class="col s12"><button class="col s6" v-on:click="deleteDish(index)">Supprimer</button><button class="col s6" v-on:click="fillUpdateDish(index)">Modifier</button></div>
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="myFood === 'myFood'">
        <div class="row">
            <div class="food-block col s3" v-for="(value,index) in userFood">
                <div class="food-content col s12">
                    <div class="col s12 center-align">@{{ value.name }}</div>
                    <div class="col s6">Calories : @{{ value.cal }} </div>
                    <div class="col s6">Quantité : @{{ value.cal }} g</div>
                    <div class="col s6">Protéines : @{{ value.pro }} g</div>
                    <div class="col s6">Lipides : @{{ value.lip }} g</div>
                    <div class="col s6">Glucides : @{{ value.glu }} g</div>
                    <div class="col s12"><button class="col s6" v-on:click="deleteFood(index)">Supprimer</button><button class="col s6" v-on:click="fillUpdateFood(index)">Modifier</button></div>
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="myFood === 'addMeal'">

    </div>
    <div v-else-if="myFood === 'addDish'">
        <form id="add-dish-form">
            <label for="dish-name">Nom de l'aliment<input v-model="dishToUpdate.name" id="dish-name" type="text" name="dishName"></label>
            <span id="dishNameError">@{{ dishFormError.dishNameError }}</span>
            <label for="dish-cal">Calories<input v-model="dishToUpdate.cal" id="dish-cal" type="text" name="dishCal"></label>
            <span id="dishCalError">@{{ dishFormError.dishCalError }}</span>
            <label for="dish-quantity">Quantité<input v-model="dishToUpdate.quant" id="dish-quantity" type="text" name="dishQuant"></label>
            <span id="dishQuantError">@{{ dishFormError.dishQuantError }}</span>
            <label for="dish-pro">Protéine<input v-model="dishToUpdate.pro" id="dish-pro" type="text" name="dishPro"></label>
            <span id="dishProError">@{{ dishFormError.dishProError }}</span>
            <label for="dish-lip">Lipide<input v-model="dishToUpdate.lip" id="dish-lip" type="text" name="dishLip"></label>
            <span id="dishLipError">@{{ dishFormError.dishLipError }}</span>
            <label for="dish-glu">Glucide<input v-model="dishToUpdate.glu" id="dish-glu" type="text" name="dishGlu"></label>
            <span id="dishGluError">@{{ dishFormError.dishGluError }}</span>
            <button v-if="dishFormState === 'update'" type="submit" id="update-dish-submit" v-on:click="updateDish">Modifier</button>
            <button v-else type="submit" id="add-dish-submit" v-on:click="createDish">Ajouter</button>
        </form>
    </div>
    <div v-else-if="myFood === 'addFood'">
        <form id="add-food-form">
            <label for="food-name">Nom de l'aliment<input v-model="foodToUpdate.name" id="food-name" type="text" name="foodName"></label>
            <span id="foodNameError">@{{ foodFormError.foodNameError }}</span>
            <label for="food-cal">Calories<input v-model="foodToUpdate.cal" id="food-cal" type="text" name="foodCal"></label>
            <span id="foodCalError">@{{ foodFormError.foodCalError }}</span>
            <label for="food-quantity">Quantité<input v-model="foodToUpdate.quant" id="food-quantity" type="text" name="foodQuant"></label>
            <span id="foodQuantError">@{{ foodFormError.foodQuantError }}</span>
            <label for="food-pro">Protéine<input v-model="foodToUpdate.pro" id="food-pro" type="text" name="foodPro"></label>
            <span id="foodProError">@{{ foodFormError.foodProError }}</span>
            <label for="food-lip">Lipide<input v-model="foodToUpdate.lip" id="food-lip" type="text" name="foodLip"></label>
            <span id="foodLipError">@{{ foodFormError.foodLipError }}</span>
            <label for="food-glu">Glucide<input v-model="foodToUpdate.glu" id="food-glu" type="text" name="foodGlu"></label>
            <span id="foodGluError">@{{ foodFormError.foodGluError }}</span>
            <button v-if="foodFormState === 'update'" type="submit" id="update-food-submit" v-on:click="updateFood">Modifier</button>
            <button v-else type="submit" id="add-food-submit" v-on:click="createFood">Ajouter</button>
        </form>
    </div>
</div>