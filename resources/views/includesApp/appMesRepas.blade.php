<div v-else-if="appContent === 'maNourriture'">
    <h2>Ma nourriture</h2>
    COUCOU
    <button class="waves-effect waves-light btn-large">Mes repas</button>
    <button class="waves-effect waves-light btn-large">Mes aliments</button>
    <button class="waves-effect waves-light btn-large">Ajouter un repas</button>
    <button class="waves-effect waves-light btn-large">Ajouter un aliment</button>
    <div>
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