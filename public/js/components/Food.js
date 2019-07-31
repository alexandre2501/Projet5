const Food = Vue.component('Food',{
    template: '<div class="row flex" id="myFood_block">\n' +
    '    <div class="#fafafa grey lighten-5 z-depth-2 col s12">\n' +
    '        <div class="col s12 pad-zero">\n' +
    '            <button v-on:click="loadMyFood(\'myDish\')" class="waves-effect waves-light btn-large col s6 m6 l3">Mes plats</button>\n' +
    '            <button v-on:click="loadMyFood(\'myFood\')" class="waves-effect waves-light btn-large col s6 m6 l3">Mes aliments</button>\n' +
    '            <button v-on:click="loadMyFood(\'addDish\')" class="waves-effect waves-light btn-large col s12 m6 l3">Ajouter un plat</button>\n' +
    '            <button v-on:click="loadMyFood(\'addFood\')" class="waves-effect waves-light btn-large col s12 m6 l3">Ajouter un aliment</button>\n' +
    '        </div>\n' +
    '    <div v-if="myFood === \'myDish\'">\n' +
    '        <div class="">\n' +
    '            <div class="food-block col s6 m4 l4 xl3" v-for="(value,index) in $store.state.userDish">\n' +
    '                <div class="food-content col s12 z-depth-2">\n' +
    '                    <h5 class="#26a69a teal lighten-1 col s12 center-align">{{ value.name }}</h5>\n' +
    '                    <div class="col s12 center-align">Calories : {{ value.cal }} </div>\n' +
    '                    <div class="col s12 m12 l6 center-align">Quantité : {{ value.quant }} g</div>\n' +
    '                    <div class="col s12 m12 l6 center-align">Protéines : {{ value.pro }} g</div>\n' +
    '                    <div class="col s12 m12 l6 center-align">Lipides : {{ value.lip }} g</div>\n' +
    '                    <div class="col s12 m12 l6 center-align">Glucides : {{ value.glu }} g</div>\n' +
    '                    <div class="col s12"><button class="col s12 m12 l6 waves-effect waves-light btn-small" v-on:click="deleteDish(index)">Supprimer</button><button class="col s12 m12 l6 waves-effect waves-light btn-small" v-on:click="fillUpdateDish(index)">Modifier</button></div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div v-else-if="myFood === \'myFood\'">\n' +
    '        <div class="">\n' +
    '            <div class="food-block col s6 m4 l4 xl3" v-for="(value,index) in $store.state.userFood">\n' +
    '                <div class="food-content col s12 z-depth-2">\n' +
    '                    <h5 class="#26a69a teal lighten-1 col s12 center-align">{{ value.name }}</h5>\n' +
    '                    <div class="col s12 center-align">Calories : {{ value.cal }} </div>\n' +
    '                    <div class="col s12 m12 l6 center-align">Quantité : {{ value.quant }} g</div>\n' +
    '                    <div class="col s12 m12 l6 center-align">Protéines : {{ value.pro }} g</div>\n' +
    '                    <div class="col s12 m12 l6 center-align">Lipides : {{ value.lip }} g</div>\n' +
    '                    <div class="col s12 m12 l6 center-align">Glucides : {{ value.glu }} g</div>\n' +
    '                    <div class="col s12"><button class="col s12 m12 l6 waves-effect waves-light btn-small" v-on:click="deleteFood(index)">Supprimer</button><button class="col s12 m12 l6 waves-effect waves-light btn-small" v-on:click="fillUpdateFood(index)">Modifier</button></div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div v-else-if="myFood === \'addDish\'">\n' +
    '        <form class="form-style" id="add-dish-form">\n' +
    '            <label for="dish-name">Nom de l\'aliment<input v-model="dishToUpdate.name" id="dish-name" type="text" name="dishName"></label>\n' +
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
    '            <button class="waves-effect waves-light btn-small" v-if="dishFormState === \'update\'" type="submit" id="update-dish-submit" v-on:click="updateDish">Modifier</button>\n' +
    '            <button class="waves-effect waves-light btn-small" v-else type="submit" id="add-dish-submit" v-on:click="createDish">Ajouter</button>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div v-else-if="myFood === \'addFood\'">\n' +
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
    '            <button class="waves-effect waves-light btn-small" v-if="foodFormState === \'update\'" type="submit" id="update-food-submit" v-on:click="updateFood">Modifier</button>\n' +
    '            <button class="waves-effect waves-light btn-small" v-else type="submit" id="add-food-submit" v-on:click="createFood">Ajouter</button>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    </div>\n' +
    '</div>',
    mounted(){
        M.AutoInit();
    },
    data: function(){
        return{
            myFood: null,
            dishFormState: '',
            dishToUpdate: {
                name: '',
                cal: '',
                quant: '',
                pro: '',
                lip: '',
                glu: '',
            },
            foodFormState: '',
            foodToUpdate: {
                name: '',
                cal: '',
                quant: '',
                pro: '',
                lip: '',
                glu: '',
            },
        }
    },
    methods: {
        loadMyFood(option){
            this.myFood = option;
            this.dishFormState = '';
            this.dishToUpdate = Object.assign({}, modelDishToUpdate);
            this.foodFormState = '';
            this.foodToUpdate = Object.assign({}, modelFoodToUpdate);
            if(option === 'myFood'){
                this.$parent.getUserFood();
            }
            else if(option === 'myDish'){
                this.$parent.getUserDish();
            }
        },
        fillUpdateFood(index){
            this.myFood = 'addFood';
            this.foodFormState ='update';
            this.foodToUpdate = this.$store.state.userFood[index];
        },
        fillUpdateDish(index){
            this.myFood = 'addDish';
            this.dishFormState ='update';
            this.dishToUpdate = this.$store.state.userDish[index];
        },
        deleteFood(index){
            var self = this;
            var id = this.$store.state.userFood[index].id;
            axios.post('/delete-food',{
                foodId: id,
                userId: self.$store.state.userData.id,
            })
                .then(function(response){
                    console.log(response.data);
                    self.$store.commit('deleteFood', index);
                })
                .catch(function(error){
                    console.log(error);
                })
        },
        deleteDish(index){
            var self = this;
            var id = this.$store.state.userDish[index].id;
            console.log(index);
            axios.post('/delete-dish',{
                dishId: id,
                userId: self.$store.state.userData.id,
            })
                .then(function(response){
                    console.log(response.data);
                    self.$store.commit('deleteDish', index);
                })
                .catch(function(error){
                    console.log(error);
                })
            console.log(this.userDish)
        },
        createFood(e){
            e.preventDefault();
            var formElt = document.getElementById('add-food-form');
            var formData = new FormData(formElt);
            axios.post('/create-food',
                formData
                ,{
                    headers: {
                        //'content-type': 'multipart/form-data',
                    }
                })
                .then(function(response){
                    this.loadMyFood('myFood');
                }.bind(this))
                .catch(function(error){
                    this.cleanseErrorMsg('food');
                    console.log(error.response.data.errors)
                    for(key in error.response.data.errors){
                        this.showResponseError('food', key, error.response.data.errors[key][0]);
                    }
                }.bind(this))
        },
        createDish(e){
            e.preventDefault();
            var formElt = document.getElementById('add-dish-form');
            var formData = new FormData(formElt);
            axios.post('/create-dish',
                formData
                ,{
                    headers: {
                        //'content-type': 'multipart/form-data',
                    }
                })
                .then(function(response){
                    this.loadMyFood('myDish');
                }.bind(this))
                .catch(function(error){
                    this.cleanseErrorMsg('dish');
                    for(key in error.response.data.errors){
                        this.showResponseError('dish', key, error.response.data.errors[key][0]);
                    }
                }.bind(this))
        },
        updateFood(e){
            e.preventDefault();
            var self = this;
            axios.post('/update-food',
                self.foodToUpdate
                ,{
                    headers: {
                        //'content-type': 'multipart/form-data',
                    }
                })
                .then((response)=>{
                    this.loadMyFood('myFood');
                    this.foodToUpdate = '';
                    this.foodFormState = '';
                })
                .catch(function(error){
                    self.cleanseErrorMsg('food');
                    for(key in error.response.data.errors){
                        var keyUpper = key.charAt(0).toUpperCase() + key.slice(1)
                        var adjustedKey = 'food' + keyUpper;
                        self.showResponseError('food', adjustedKey, error.response.data.errors[key][0]);
                    }
                })
        },
        updateDish(e){
            e.preventDefault();
            var self = this;
            axios.post('/update-dish',
                self.dishToUpdate
                ,{
                    headers: {
                        //'content-type': 'multipart/form-data',
                    }
                })
                .then(function(response){
                    console.log(response.data);
                    self.loadMyFood('myDish');
                    self.dishToUpdate = '';
                    self.dishFormState = '';
                })
                .catch(function(error){
                    self.cleanseErrorMsg('dish');
                    console.log(error.response.data.errors)
                    for(key in error.response.data.errors){
                        var keyUpper = key.charAt(0).toUpperCase() + key.slice(1)
                        var adjustedKey = 'dish' + keyUpper;
                        self.showResponseError('dish', adjustedKey, error.response.data.errors[key][0]);
                    }
                })
        },
        cleanseErrorMsg(form){
            if(form === 'food'){
                this.$store.commit('resetFoodFormError');
            }
            else if(form === 'dish'){
                this.$store.commit('resetDishFormError');
            }
        },
        showResponseError(form, key, msg){
            var error = key + 'Error';
            if(form === 'food'){
                this.$state.commit('setFoodFormError', error, msg);
            }
            else if(form === 'dish'){
                this.$state.commit('setDishFormError', error, msg);
            }
        },
    },
})