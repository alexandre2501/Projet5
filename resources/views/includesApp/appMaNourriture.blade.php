<div class="row flex" id="myFood_block" v-else-if="appContent === 'maNourriture'">
    <div class="#fafafa grey lighten-5 z-depth-2 col s12">
        <div class="col s12 pad-zero">
            <button v-on:click="loadMyFood('myDish')" class="waves-effect waves-light btn-large col s6 m6 l3">Mes plats</button>
            <button v-on:click="loadMyFood('myFood')" class="waves-effect waves-light btn-large col s6 m6 l3">Mes aliments</button>
            <button v-on:click="loadMyFood('addDish')" class="waves-effect waves-light btn-large col s12 m6 l3">Ajouter un plat</button>
            <button v-on:click="loadMyFood('addFood')" class="waves-effect waves-light btn-large col s12 m6 l3">Ajouter un aliment</button>
        </div>
    <div v-if="myFood === 'myDish'">
        <div class="">
            <div class="food-block col s6 m4 l4 xl3" v-for="(value,index) in userDish">
                <div class="food-content col s12 z-depth-2">
                    <h5 class="#26a69a teal lighten-1 col s12 center-align">@{{ value.name }}</h5>
                    <div class="col s12 center-align">Calories : @{{ value.cal }} </div>
                    <div class="col s12 m12 l6 center-align">Quantité : @{{ value.quant }} g</div>
                    <div class="col s12 m12 l6 center-align">Protéines : @{{ value.pro }} g</div>
                    <div class="col s12 m12 l6 center-align">Lipides : @{{ value.lip }} g</div>
                    <div class="col s12 m12 l6 center-align">Glucides : @{{ value.glu }} g</div>
                    <div class="col s12"><button class="col s12 m12 l6 waves-effect waves-light btn-small" v-on:click="deleteDish(index)">Supprimer</button><button class="col s12 m12 l6 waves-effect waves-light btn-small" v-on:click="fillUpdateDish(index)">Modifier</button></div>
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="myFood === 'myFood'">
        <div class="">
            <div class="food-block col s6 m4 l4 xl3" v-for="(value,index) in userFood">
                <div class="food-content col s12 z-depth-2">
                    <h5 class="#26a69a teal lighten-1 col s12 center-align">@{{ value.name }}</h5>
                    <div class="col s12 center-align">Calories : @{{ value.cal }} </div>
                    <div class="col s12 m12 l6 center-align">Quantité : @{{ value.quant }} g</div>
                    <div class="col s12 m12 l6 center-align">Protéines : @{{ value.pro }} g</div>
                    <div class="col s12 m12 l6 center-align">Lipides : @{{ value.lip }} g</div>
                    <div class="col s12 m12 l6 center-align">Glucides : @{{ value.glu }} g</div>
                    <div class="col s12"><button class="col s12 m12 l6 waves-effect waves-light btn-small" v-on:click="deleteFood(index)">Supprimer</button><button class="col s12 m12 l6 waves-effect waves-light btn-small" v-on:click="fillUpdateFood(index)">Modifier</button></div>
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="myFood === 'addDish'">
        <form class="form-style" id="add-dish-form">
            <label for="dish-name">Nom de l'aliment<input v-model="dishToUpdate.name" id="dish-name" type="text" name="dishName"></label>
            <span id="dishNameError">@{{ dishFormError.dishNameError }}</span>
            <label for="dish-cal">Calories (kcal)<input v-model="dishToUpdate.cal" id="dish-cal" type="text" name="dishCal"></label>
            <span id="dishCalError">@{{ dishFormError.dishCalError }}</span>
            <label for="dish-quantity">Quantité (g)<input v-model="dishToUpdate.quant" id="dish-quantity" type="text" name="dishQuant"></label>
            <span id="dishQuantError">@{{ dishFormError.dishQuantError }}</span>
            <label for="dish-pro">Protéine (g)<input v-model="dishToUpdate.pro" id="dish-pro" type="text" name="dishPro"></label>
            <span id="dishProError">@{{ dishFormError.dishProError }}</span>
            <label for="dish-lip">Lipide (g)<input v-model="dishToUpdate.lip" id="dish-lip" type="text" name="dishLip"></label>
            <span id="dishLipError">@{{ dishFormError.dishLipError }}</span>
            <label for="dish-glu">Glucide (g)<input v-model="dishToUpdate.glu" id="dish-glu" type="text" name="dishGlu"></label>
            <span id="dishGluError">@{{ dishFormError.dishGluError }}</span>
            <button class="waves-effect waves-light btn-small" v-if="dishFormState === 'update'" type="submit" id="update-dish-submit" v-on:click="updateDish">Modifier</button>
            <button class="waves-effect waves-light btn-small" v-else type="submit" id="add-dish-submit" v-on:click="createDish">Ajouter</button>
        </form>
    </div>
    <div v-else-if="myFood === 'addFood'">
        <form class="form-style" id="add-food-form">
            <label for="food-name">Nom de l'aliment<input v-model="foodToUpdate.name" id="food-name" type="text" name="foodName"></label>
            <span id="foodNameError">@{{ foodFormError.foodNameError }}</span>
            <label for="food-cal">Calories (kcal)<input v-model="foodToUpdate.cal" id="food-cal" type="text" name="foodCal"></label>
            <span id="foodCalError">@{{ foodFormError.foodCalError }}</span>
            <label for="food-quantity">Quantité (g)<input v-model="foodToUpdate.quant" id="food-quantity" type="text" name="foodQuant"></label>
            <span id="foodQuantError">@{{ foodFormError.foodQuantError }}</span>
            <label for="food-pro">Protéine (g)<input v-model="foodToUpdate.pro" id="food-pro" type="text" name="foodPro"></label>
            <span id="foodProError">@{{ foodFormError.foodProError }}</span>
            <label for="food-lip">Lipide (g)<input v-model="foodToUpdate.lip" id="food-lip" type="text" name="foodLip"></label>
            <span id="foodLipError">@{{ foodFormError.foodLipError }}</span>
            <label for="food-glu">Glucide (g)<input v-model="foodToUpdate.glu" id="food-glu" type="text" name="foodGlu"></label>
            <span id="foodGluError">@{{ foodFormError.foodGluError }}</span>
            <button class="waves-effect waves-light btn-small" v-if="foodFormState === 'update'" type="submit" id="update-food-submit" v-on:click="updateFood">Modifier</button>
            <button class="waves-effect waves-light btn-small" v-else type="submit" id="add-food-submit" v-on:click="createFood">Ajouter</button>
        </form>
    </div>
    </div>
</div>