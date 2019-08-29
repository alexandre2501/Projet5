const AddFood = Vue.component('AddFood',{
    props: ['foodFormState', 'foodToUpdate'],
    template: '    <div>\n' +
    '        <form class="form-style" id="add-food-form">\n' +
    '            <label for="food-name">Nom de l\'aliment<input v-model="foodToUpdate.name" id="food-name" type="text" name="foodName"></label>\n' +
    '            <span id="foodNameError">{{ $store.state.foodFormError.foodNameError }}</span>\n' +
    '            <label for="food-cal">Calories (kcal)<input v-model="foodToUpdate.cal" id="food-cal" type="text" name="foodCal"></label>\n' +
    '            <span id="foodCalError">{{ $store.state.foodFormError.foodCalError }}</span>\n' +
    '            <label for="food-quantity">Quantité (g)<input v-model="foodToUpdate.quant" id="food-quantity" type="text" name="foodQuant"></label>\n' +
    '            <span id="foodQuantError">{{ $store.state.foodFormError.foodQuantError }}</span>\n' +
    '            <label for="food-pro">Protéine (g)<input v-model="foodToUpdate.pro" id="food-pro" type="text" name="foodPro"></label>\n' +
    '            <span id="foodProError">{{ $store.state.foodFormError.foodProError }}</span>\n' +
    '            <label for="food-lip">Lipide (g)<input v-model="foodToUpdate.lip" id="food-lip" type="text" name="foodLip"></label>\n' +
    '            <span id="foodLipError">{{ $store.state.foodFormError.foodLipError }}</span>\n' +
    '            <label for="food-glu">Glucide (g)<input v-model="foodToUpdate.glu" id="food-glu" type="text" name="foodGlu"></label>\n' +
    '            <span id="foodGluError">{{ $store.state.foodFormError.foodGluError }}</span>\n' +
    '            <button class="waves-effect waves-light btn-small" v-if="foodFormState === \'update\'" type="button" id="update-food-submit" v-on:click="$emit(\'updateFood\')">Modifier</button>\n' +
    '            <button class="waves-effect waves-light btn-small" v-else type="button" id="add-food-submit" v-on:click="$emit(\'createFood\')">Ajouter</button>\n' +
    '        </form>\n' +
    '    </div>\n',
    data: function(){
        return{

        }
    },
    methods: {

    },
})

