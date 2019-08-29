const AddDish = Vue.component('AddDish',{
    props: ['dishFormState', 'dishToUpdate'],
    template: '    <div>\n' +
    '        <form class="form-style" id="add-dish-form">\n' +
    '            <label for="dish-name">Nom du plat<input v-model="dishToUpdate.name" id="dish-name" type="text" name="dishName"></label>\n' +
    '            <span id="dishNameError">{{ $store.state.dishFormError.dishNameError }}</span>\n' +
    '            <label for="dish-cal">Calories (kcal)<input v-model="dishToUpdate.cal" id="dish-cal" type="text" name="dishCal"></label>\n' +
    '            <span id="dishCalError">{{ $store.state.dishFormError.dishCalError }}</span>\n' +
    '            <label for="dish-quantity">Quantité (g)<input v-model="dishToUpdate.quant" id="dish-quantity" type="text" name="dishQuant"></label>\n' +
    '            <span id="dishQuantError">{{ $store.state.dishFormError.dishQuantError }}</span>\n' +
    '            <label for="dish-pro">Protéine (g)<input v-model="dishToUpdate.pro" id="dish-pro" type="text" name="dishPro"></label>\n' +
    '            <span id="dishProError">{{ $store.state.dishFormError.dishProError }}</span>\n' +
    '            <label for="dish-lip">Lipide (g)<input v-model="dishToUpdate.lip" id="dish-lip" type="text" name="dishLip"></label>\n' +
    '            <span id="dishLipError">{{ $store.state.dishFormError.dishLipError }}</span>\n' +
    '            <label for="dish-glu">Glucide (g)<input v-model="dishToUpdate.glu" id="dish-glu" type="text" name="dishGlu"></label>\n' +
    '            <span id="dishGluError">{{ $store.state.dishFormError.dishGluError }}</span>\n' +
    '            <button class="waves-effect waves-light btn-small" v-if="dishFormState === \'update\'" type="button" id="update-dish-submit" v-on:click="$emit(\'updateDish\')">Modifier</button>\n' +
    '            <button class="waves-effect waves-light btn-small" v-else type="button" id="add-dish-submit" v-on:click="$emit(\'createDish\')">Ajouter</button>\n' +
    '        </form>\n' +
    '    </div>\n',
    data: function(){
        return{

        }
    },
    methods: {

    },
})

