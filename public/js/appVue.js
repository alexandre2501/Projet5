var modelFoodError = {
    foodNameError: '',
    foodCalError: '',
    foodQuantError: '',
    foodProError: '',
    foodLipError: '',
    foodGluError: '',
}

var modelDishError = {
    dishNameError: '',
    dishCalError: '',
    dishQuantError: '',
    dishProError: '',
    dishLipError: '',
    dishGluError: '',
}

var modelFoodToUpdate = {
    name: '',
    cal: '',
    quant: '',
    pro: '',
    lip: '',
    glu: '',
};

var modelDishToUpdate = {
    name: '',
    cal: '',
    quant: '',
    pro: '',
    lip: '',
    glu: '',
};

const store = new Vuex.Store({
    state: {
        env: '',
        currentRoute: '/acceuil',
        //User Data
        userData: '',
        userAvatarLink: '',
        userDish: [],
        userFood: [],
        content: '',
        contentHtml: '<p>coucou</p>',
        appContent: 'accueil',
        csrfToken: document.head.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        //Changement de mot de passe
        passRegex: '^((?=\\S*?[a-z]).{7,})\\S$',
        passChangeBtn: 1,
        passMsg: '',
        test: null,
        //Page Ma Nourriture
        myFood: 'myMeal',
        //Format du formulaire nourriture (update or create)
        foodFormState: '',
        //Erreur formulaire ajout de nourriture
        foodFormError: Object.assign({}, modelFoodError),
        //Objet nourriture à update
        foodToUpdate: '',
        //Format du formulaire plat (update or create)
        dishFormState: '',
        //Erreur formulaire ajout de plat
        dishFormError: Object.assign({}, modelDishError),
        //Objet plat à update
        dishToUpdate: '',
        //Page Mes Repas
        //On stock la date du jour pour construire le calendrier des repas
        frenchDayName: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        frenchMonthName: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        actualDate: new Date(),
        dateIndex: 6,
        mealsData: [],
        mealTotal: {
            cal: 0,
            pro: 0,
            lip: 0,
            glu: 0,
        },
    },
    mutations: {
        setEnv(state, env){
            state.env = env;
        },
        setUserData(state, data){
            state.userData = data;
        },
        setUserAvatarLink(state, link){
            state.userAvatarLink = link;
        },
        setUserFood(state, data){
            state.userFood = data;
        },
        setUserDish(state, data){
            state.userDish = data;
        },
        deleteFood(state, index){
            Vue.delete(state.userFood, index);
        },
        deleteDish(state, index){
            Vue.delete(state.userDish, index);
        },
        resetFoodFormError(state){
            state.foodFormError = Object.assign({}, modelFoodError);
        },
        resetDishFormError(state){
            state.dishFormError = Object.assign({}, modelDishError);
        },
        setFoodFormError(state, error, msg){
            state.foodFormError[error] = msg;
        },
        setDishFormError(state, error, msg){
            state.dishFormError[error] = msg;
        },
        getUserMeal(){

        },
        setMealsData(state, obj){
          state.mealsData.push(obj);
        },
        setdateIndex(state, index){
            state.dateIndex = index;
        },
        setMealValue(state, index, key){
            state.mealsData[state.dateIndex].meals[index][key] = 0;
        },
        addItemToMeal(state, item){
            state.mealsData[state.dateIndex].meals.push(item);
        },
        deleteItemFromMeal(state, index){
            Vue.delete(state.mealsData[state.dateIndex].meals, index);
        },
        resetTotalMeal(state){
            state.mealTotal.cal = 0;
            state.mealTotal.pro = 0;
            state.mealTotal.lip = 0;
            state.mealTotal.glu = 0;
        },
        calculateTotalMeal(state) {
            for(index in state.mealsData[state.dateIndex].meals){
                var meal = state.mealsData[state.dateIndex].meals[index];
                state.mealTotal.cal += parseInt(meal.cal);
                state.mealTotal.pro += parseInt(meal.pro);
                state.mealTotal.lip += parseInt(meal.lip);
                state.mealTotal.glu += parseInt(meal.glu);
            }
        },
    }
})

const Profil = Vue.component('Profil', {
    template: '<div class="row flex" id="profil_block">\n' +
    '    <div id="change_avatar_div" class="col s12 m12 l6">\n' +
    '        <div class="#fafafa grey lighten-5 content_blocks z-depth-2">\n' +
    '        <h3 class="center-align">Photo de profil</h3>\n' +
    '            <div class="pad-block">\n' +
    '        <img id="avatar_min" alt="Miniature du profil" :src="$store.state.userAvatarLink">\n' +
    '        <form id="upload_new_avatar">\n' +
    '            <div class="file-field input-field">\n' +
    '                <div class="btn">\n' +
    '                    <span>File</span>\n' +
    '                    <input id="upload_avatar_input" type="file" name="avatar" accept="image/*">\n' +
    '                </div>\n' +
    '                <div class="file-path-wrapper">\n' +
    '                    <input class="file-path validate" type="text">\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <button class="btn" v-on:click="uploadNewAvatar" type="submit" id="submit_new_avatar">Modifier</button>\n' +
    '        </form>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div id="change_password_div" class="col s12 m12 l6">\n' +
    '        <div class="#fafafa grey lighten-5 content_blocks z-depth-2">\n' +
    '        <h3 class="center-align">Changer de mot de passe</h3>\n' +
    '        <div class="pad-block">\n' +
    '        <form id="change_password_form">\n' +
    '            <div class="input-field col s12">\n' +
    '                <input v-model="oldPass" id="old_pass_input" type="password" name="oldPass">\n' +
    '                <label for="old_pass_input">Ancien mot de passe :</label>\n' +
    '            </div>\n' +
    '            <div class="input-field col s12">\n' +
    '                <input v-model="newPass" v-on:keyup="comparePassword" id="new_pass_input" type="password" name="newPass" >\n' +
    '                <label for="new_pass_input">Nouveau mot de passe :</label>\n' +
    '            </div>\n' +
    '            <div class="input-field col s12">\n' +
    '                <input v-model="confirmPass" v-on:keyup="comparePassword" id="confirm_pass_input" type="password" name="confirmPass">\n' +
    '                <label for="confirm_pass_input">Confirme le mot de passe :</label>\n' +
    '            </div>\n' +
    '            <button type="submit" id="submit_password_change" v-on:click="submitPasswordChange" :disabled="passChangeBtn === 1 ? true : false">Modifier</button>\n' +
    '        </form>\n' +
    '        <span>{{passMsg}}</span>\n' +
    '        <div><p><strong>Tips :</strong> Votre mot de passe ne doit pas contenir d\'espace et doit faire 8 caractères minimum</p></div>\n' +
    '        </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>',
    data: function(){
        return{
            passRegex: '^((?=\\S*?[a-z]).{7,})\\S$',
            userAvatarLink: '',
            passChangeBtn: '',
            passMsg: '',
            oldPass: null,
            newPass: null,
            confirmPass: null,
        }
    },
    methods: {
        uploadNewAvatar(e){
            e.preventDefault();
            var formData = new FormData();
            var file = document.getElementById('upload_avatar_input').files[0];
            formData.append('avatar', file);
            axios.post('/upload/avatar',
                formData
                ,{
                    headers: {
                        //'content-type': 'multipart/form-data',
                    }
                })
                .then(function(response){
                    this.$parent.setUserData();
                    console.log(response.data);
                }.bind(this))
                .catch(function(error){
                    console.log(error);
                })
        },
        checkPassword(){
            if(this.newPass === null || this.newPass === '' ||
                this.oldPass === null || this.oldPass === '' ||
                this.confirmPass === null || this.confirmPass === ''){
                return false;
            }
            if(!this.newPass.match(this.passRegex) || !this.confirmPass.match(this.passRegex)){
                return false;
            }
            else{
                return true;
            }
        },
        comparePassword(){
            if(!this.checkPassword()){
                this.passChangeBtn = 1;
                this.passMsg = 'Le mot de passe n\'est pas conforme';
            }
            else{
                if(this.newPass != this.confirmPass){
                    this.passChangeBtn = 1;
                    this.passMsg = 'Les mots de passe ne sont pas identique';
                }
                else{
                    this.passChangeBtn = 0;
                    this.passMsg = '';
                }
            }
        },
        submitPasswordChange(e){
            e.preventDefault();
            axios.post('/password/change',{
                oldPass: this.oldPass,
                newPass: this.newPass,
            },{
                headers: {
                    'Content-Type' : 'application/json; charset=UTF-8',
                }
            })
                .then(function(response){
                    if(response.data.success != null){
                        this.passMsg = response.data.success;
                    }
                    else {
                        this.passMsg = response.data.error;
                    }
                }.bind(this))
                .catch(function(error){
                    console.log(error);
                })
        },
    },
})
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
const Meal = Vue.component('Meal',{
    template: '<div>\n' +
    '    <div class="row repas-block #fafafa grey lighten-5 z-depth-2">\n' +
    '        <div id="date-block" class="col s12 valign-wrapper">\n' +
    '            <div id="previousDate" class="col s2 center-align" v-on:click="loadPreviousDate"><i class="fas fa-3x fa-chevron-circle-left"></i></div>\n' +
    '            <div id="nameDate" class="col s8 center-align">{{ $store.state.mealsData[$store.state.dateIndex].lisibleDate }}</div>\n' +
    '            <div id="nextDate" class="col s2 center-align" v-on:click="loadNextDate"><i class="fas fa-3x fa-chevron-circle-right"></i></div>\n' +
    '        </div>\n' +
    '        <div id="meal-block" class="col s12">\n' +
    '            <div id="meals-content" class="col s12 m12 l9">\n' +
    '                <div class="col s12">\n' +
    '                    <h3 class="col s12 center-align">CONSO DU JOUR</h3>\n' +
    '                    <div class="col s3 center-align">Calories : {{ $store.state.mealTotal.cal }} cal</div>\n' +
    '                    <div class="col s3 center-align">Proteines : {{ $store.state.mealTotal.pro }} g</div>\n' +
    '                    <div class="col s3 center-align">Lipides : {{ $store.state.mealTotal.lip }} g</div>\n' +
    '                    <div class="col s3 center-align">Glucides : {{ $store.state.mealTotal.glu }} g</div>\n' +
    '                </div>\n' +
    '                <div class="col s6 m4 l3 meal-content" v-for="(value, index) in $store.state.mealsData[$store.state.dateIndex].meals">\n' +
    '                    <h6 class="col s12 center-align">{{ value.name }}<i class="far fa-times-circle valign-wrapper" v-on:click="deleteFoodFromMeal(index)"></i></h6>\n' +
    '                    <div class="col s6 pad-zero"><div class="col s12 center-align #d1c4e9 deep-purple lighten-4">Calorie</div><div class="col s10 m8 valign-wrapper"><input class="center-align" type="number" v-model="value.cal" @change="checkNumeric(index, \'cal\')"><span>cal</span></div></div>\n' +
    '                    <div class="col s6 pad-zero"><div class="col s12 center-align #dce775 lime lighten-2">Quantité</div><div class="col s10 m8 valign-wrapper"><input class="center-align" type="number" v-model="value.quant" @change="checkNumeric(index, \'quant\')"><span>g</span></div></div>\n' +
    '                    <div class="col s12 m4 pad-zero"><div class="col s12 center-align #aed581 light-green lighten-2">Protéines</div><div class="col s12 valign-wrapper"><input class="center-align" type="number" v-model="value.pro" @change="checkNumeric(index, \'pro\')"><span>g</span></div></div>\n' +
    '                    <div class="col s12 m4 pad-zero"><div class="col s12 center-align #a1887f brown lighten-2">Lipides</div><div class="col s12 valign-wrapper"><input class="center-align" type="number" v-model="value.lip" @change="checkNumeric(index, \'lip\')"><span>g</span></div></div>\n' +
    '                    <div class="col s12 m4 pad-zero"><div class="col s12 center-align #f06292 pink lighten-2">Glucides</div><div class="col s12 valign-wrapper"><input class="center-align" type="number" v-model="value.glu" @change="checkNumeric(index), \'glu\'"><span>g</span></div></div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div id="foods-content" class="col s12 m12 l3">\n' +
    '                <h3 class="col s12 center-align">Food</h3>\n' +
    '                <div class="col s12 valign-wrapper" v-for="(value,index) in $store.state.userFood">\n' +
    '                    <div class="col s2"><i v-on:click="addFoodToMeal(index)" class="fas fa-2x fa-plus-circle"></i></div>\n' +
    '                    <div class="col s10 food-desc">\n' +
    '                        <div class="col s12 center-align">{{ value.name }}</div>\n' +
    '                        <div class="col s6">Calories : {{ value.cal }} cal</div>\n' +
    '                        <div class="col s6">Quantité : {{ value.quant }} g</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <h3 class="col s12 center-align">Dish</h3>\n' +
    '                <div class="col s12 valign-wrapper" v-for="(value,index) in $store.state.userDish">\n' +
    '                    <div class="col s2"><i v-on:click="addDishToMeal(index)" class="fas fa-2x fa-plus-circle"></i></div>\n' +
    '                    <div class="col s10 food-desc">\n' +
    '                        <div class="col s12 center-align">{{ value.name }}</div>\n' +
    '                        <div class="col s6">Calories : {{ value.cal }} cal</div>\n' +
    '                        <div class="col s6">Quantité : {{ value.quant }} g</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>',
    data: function(){
        return{
            dateIndex: 6,
        }
    },
    methods: {
        //Renvoie un objet Date par a la date passée en paramètre
        returnMealsDate(date){
            var test = new Date(this.actualDate.getFullYear(), this.actualDate.getMonth(), date + 1);
            return new Date(this.actualDate.getFullYear(), this.actualDate.getMonth(), date + 1);
        },
        returnDayName(day, lang){
            if(lang === 'french'){
                return this.frenchDayName[day];
            }
        },
        returnMonthName(month, lang){
            if(lang === 'french'){
                return this.frenchMonthName[month];
            }
        },
        controlDateIndex(index){
            if(index < 0){
                return 0;
            }
            else if(index > 8){
                return 8;
            }
            else{
                return index;
            }
        },
        loadPreviousDate(){
            var index = this.controlDateIndex(this.$store.state.dateIndex - 1);
            this.$store.commit('setdateIndex', index);//dateIndex
            this.calculateTotalMeal();
        },
        loadNextDate(){
            var index = this.controlDateIndex(this.$store.state.dateIndex + 1);
            this.$store.commit('setdateIndex', index);//dateIndex
            this.calculateTotalMeal();
        },
        addFoodToMeal(index){
            var food = Object.assign({}, this.$store.state.userFood[index]);
            this.$store.commit('addItemToMeal', food);
            this.updateMeals();
        },
        addDishToMeal(index){
            var meal = Object.assign({}, this.$store.state.userDish[index]);
            this.$store.commit('addItemToMeal', meal);
            this.updateMeals();
        },
        updateMeals(){
            var self = this;
            axios.post('/update-meals',{
                mealsData: self.$store.state.mealsData[self.$store.state.dateIndex],
                userId: self.$store.state.userData.id,
                year: self.$store.state.mealsData[self.$store.state.dateIndex].date.getFullYear(),
                month: self.$store.state.mealsData[self.$store.state.dateIndex].date.getMonth() + 1,
                day: self.$store.state.mealsData[self.$store.state.dateIndex].date.getDate(),
            })
                .then(function(response){
                    console.log(response.data);
                    self.calculateTotalMeal();
                })
                .catch(function(error){
                    console.log(error);
                })
        },
        deleteFoodFromMeal(index){
            this.$store.commit('deleteItemFromMeal', index);
            this.updateMeals();
        },
        checkNumeric(index, key){
            console.log(key)
            if(this.$store.state.mealsData[this.$store.state.dateIndex].meals[index][key] === '' || this.$store.state.mealsData[this.$store.state.dateIndex].meals[index][key] === null){
                this.$store.commit('setMealValue',index, key);
            }
            this.updateMeals();
        },
        resetTotalMeal(){
            this.$store.commit('resetTotalMeal');
        },
        calculateTotalMeal(){
            this.resetTotalMeal();
            this.$store.commit('calculateTotalMeal');
        },
    },
})

const routes = [
    { path: '/accueil'},
    { path: '/profil', component: Profil},
    { path: '/food', component: Food},
    { path: '/meal', component: Meal},
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    el: '#app',
    components: {'Profil': Profil, 'Food': Food, 'Meal': Meal},
    router,
    store,
    mounted(){
        window.axios.defaults.headers.common['X-CSRF-TOKEN'] = this.csrfToken;
        M.AutoInit();
        this.setEnv();
        this.setUserData();
        this.getUserFood();
        this.getUserDish();
        this.getUserMeal();
    },
    data: {
        csrfToken: document.head.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        //Page Mes Repas
        //On stock la date du jour pour construire le calendrier des repas
        frenchDayName: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        frenchMonthName: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        actualDate: new Date(),
    },
    methods:{
        findWithAttr(array, attr, value){
            for(var i = 0; i < array.length; i += 1) {
                if(array[i][attr] === value) {
                    return i;
                }
            }
            return -1;
        },
        setEnv(){
          var env = window.location.href;
          env = env.substr(7);
          var id = env.search('/');
          env = env.substr(0,id);
          this.$store.commit('setEnv', env);//.env = env;
        },
        setUserData(){
            axios.get('/auth/data',{
                headers: {
                    'Content-Type' : 'application/json; charset=UTF-8',
                }
            })
                .then(function(response){
                    this.$store.commit('setUserData', response.data)//.userData = response.data;
                    var link = 'http://' + this.$store.state.env + '/avatars/' + this.$store.state.userData.avatar;
                    this.$store.commit('setUserAvatarLink', link)//.userAvatarLink = 'http://' + this.env + '/avatars/' + this.userData.avatar;
                }.bind(this))
                .catch(function(error){
                    console.log(error);
                })
        },
        setMealsDate(data){
            for(var i = -7; i != 2; i++){
                var obj = {
                    date: this.returnMealsDate(this.actualDate.getDate() + i),
                };
                obj.dayName = this.returnDayName(obj.date.getDay(), 'french');
                obj.monthName = this.returnMonthName(obj.date.getMonth(), 'french');
                obj.lisibleDate = obj.dayName + ' ' + obj.date.getDate() + ' ' + obj.monthName;
                var index = this.findWithAttr(data, 'lisibleDate', obj.lisibleDate);
                if(index != -1){
                    obj.meals = data[index].meals;
                }
                else{
                    obj.meals = [];
                }
                this.$store.commit('setMealsData', obj);
            }
            this.$store.commit('calculateTotalMeal');
        },
        //Renvoie un objet Date par a la date passée en paramètre
        returnMealsDate(date){
            var test = new Date(this.actualDate.getFullYear(), this.actualDate.getMonth(), date + 1);
          return new Date(this.actualDate.getFullYear(), this.actualDate.getMonth(), date + 1);
        },
        returnDayName(day, lang){
          if(lang === 'french'){
            return this.frenchDayName[day];
          }
        },
        returnMonthName(month, lang){
            if(lang === 'french'){
                return this.frenchMonthName[month];
            }
        }
        ,
        loadAccueilHtml(){
            this.appContent = 'accueil';
            M.AutoInit();
        },
        loadProfilHtml(){
            this.appContent = 'profil';
            M.AutoInit();
        },
        loadMaNourritureHtml(){
            this.appContent = 'maNourriture',
            M.AutoInit();
        },
        loadMesRepasHtml(){
            this.appContent = 'mesRepas';
            this.getUserFood();
            this.getUserDish();
            this.getUserMeal();
            M.AutoInit();
        },
        //Vérifie que le mot de passe est conforme
        //return true si le mdp est conforme
        checkPassword(){
            if(!this.newPass.match(this.passRegex) || !this.confirmPass.match(this.passRegex)){
                return false;
            }
            else{
                return true;
            }
        },
        refreshPassValues(){
            this.oldPass = document.getElementById('old_pass_input').value;
            this.newPass = document.getElementById('new_pass_input').value;
            this.confirmPass = document.getElementById('confirm_pass_input').value;
        },
        comparePassword(){
            this.refreshPassValues();
            if(!this.checkPassword()){
                this.passChangeBtn = 1;
                this.passMsg = 'Le mot de passe n\'est pas conforme';
            }
            else{
                if(this.newPass != this.confirmPass){
                    this.passChangeBtn = 1;
                    this.passMsg = 'Les mots de passe ne sont pas identique';
                }
                else{
                    this.passChangeBtn = 0;
                    this.passMsg = '';
                }
            }
        },
        submitPasswordChange(e){
            this.refreshPassValues();
            e.preventDefault();
            axios.post('/password/change',{
                oldPass: this.oldPass,
                newPass: this.newPass,
            },{
                headers: {
                    'Content-Type' : 'application/json; charset=UTF-8',
                }
            })
                .then(function(response){
                    if(response.data.success != null){
                        this.passMsg = response.data.success;
                    }
                    else {
                        this.passMsg = response.data.error;
                    }
                }.bind(this))
                .catch(function(error){
                    console.log(error);
                })
        },
        uploadNewAvatar(e){
            e.preventDefault();
            console.log(this.avatar);
            //return;
            var formData = new FormData();
            var file = document.getElementById('upload_avatar_input').files[0];
            formData.append('avatar', file);
            console.log(formData);
            axios.post('/upload/avatar',
                //avatar: document.getElementById('upload_avatar_input').files[0].name
                formData
            ,{
                headers: {
                    //'content-type': 'multipart/form-data',
                }
            })
                .then(function(response){
                    this.setUserData();
                    console.log(response.data);
                }.bind(this))
                .catch(function(error){
                    console.log(error);
                })
        },
        loadMyFood(option){
          this.myFood = option;
          this.dishFormState = '';
          this.dishToUpdate = '';
          this.foodFormState = '';
          this.foodToUpdate = '';
          if(option === 'myFood'){
              this.getUserFood();
          }
          else if(option === 'myDish'){
              this.getUserDish();
          }
        },
        getUserDish(){
            axios.get('/get-user-dish')
                .then(function(response){
                    this.$store.commit('setUserDish', response.data);//userDish = response.data;
                }.bind(this))
                .catch(function(error){
                    console.log(error)
                })
        },
        getUserFood(){
            axios.get('/get-user-food')
                .then(function(response){
                    this.$store.commit('setUserFood', response.data);//userFood = response.data;
                }.bind(this))
                .catch(function(error){
                    console.log(error)
                })
        },
        getUserMeal(){
            axios.get('/get-user-meal')
                .then(function(response){
                    console.log('coucou')
                    this.setMealsDate(response.data);
                    //this.calculateTotalMeal();
                }.bind(this))
                .catch(function(error){
                    console.log(error);
                })

        },
        createDish(e){
            e.preventDefault();
            var formElt = document.getElementById('add-dish-form');
            var formData = new FormData(formElt);
            axios.post('/create-dish',
                //avatar: document.getElementById('upload_avatar_input').files[0].name
                formData
                ,{
                    headers: {
                        //'content-type': 'multipart/form-data',
                    }
                })
                .then(function(response){
                    console.log(response.data);
                    this.loadMyFood('myDish');
                }.bind(this))
                .catch(function(error){
                    this.cleanseErrorMsg('dish');
                    console.log(error.response.data.errors)
                    for(key in error.response.data.errors){
                        this.showResponseError('dish', key, error.response.data.errors[key][0]);
                    }
                }.bind(this))
        },
        createFood(e){
            e.preventDefault();
            var formElt = document.getElementById('add-food-form');
            var formData = new FormData(formElt);
            axios.post('/create-food',
                //avatar: document.getElementById('upload_avatar_input').files[0].name
                formData
                ,{
                    headers: {
                        //'content-type': 'multipart/form-data',
                    }
                })
                .then(function(response){
                    console.log(response.data);
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
        fillUpdateFood(index){
            this.myFood = 'addFood';
            this.foodFormState ='update';
            this.foodToUpdate = this.userFood[index];
        },
        fillUpdateDish(index){
            this.myFood = 'addDish';
            this.dishFormState ='update';
            this.dishToUpdate = this.userDish[index];
        },
        updateFood(e){
            e.preventDefault();
            var self = this;
            console.log(this.foodToUpdate);
            axios.post('/update-food',
                //avatar: document.getElementById('upload_avatar_input').files[0].name
                self.foodToUpdate
                ,{
                    headers: {
                        //'content-type': 'multipart/form-data',
                    }
                })
                .then((response)=>{
                    console.log(response.data);
                    this.loadMyFood('myFood');
                    this.foodToUpdate = '';
                    this.foodFormState = '';
                })
                .catch(function(error){
                    self.cleanseErrorMsg('food');
                    console.log(error.response.data.errors)
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
            console.log(this.dishToUpdate);
            axios.post('/update-dish',
                //avatar: document.getElementById('upload_avatar_input').files[0].name
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
        deleteFood(index){
            var self = this;
            var id = this.userFood[index].id;
            console.log(index);
            axios.post('/delete-food',{
                foodId: id,
                userId: self.userData.id,
            })
                .then(function(response){
                    console.log(response.data);
                    self.$delete(self.userFood, index);
                })
                .catch(function(error){
                    console.log(error);
                })
            console.log(this.userFood)
        },
        deleteDish(index){
            var self = this;
            var id = this.userDish[index].id;
            console.log(index);
            axios.post('/delete-dish',{
                dishId: id,
                userId: self.userData.id,
                })
                .then(function(response){
                    console.log(response.data);
                    self.$delete(self.userDish, index);
                })
                .catch(function(error){
                    console.log(error);
                })
            console.log(this.userDish)
        },
        showResponseError(form, key, msg){
            var error = key + 'Error';
            if(form === 'food'){
                this.foodFormError[error] = msg;
            }
            else if(form === 'dish'){
                this.dishFormError[error] = msg;
            }
        },
        cleanseErrorMsg(form){
            if(form === 'food'){
                this.foodFormError = Object.assign({}, modelFoodError);
            }
            else if(form === 'dish'){
                this.dishFormError = Object.assign({}, modelDishError);
            }
        },
        //Mes Repas
        controlDateIndex(index){
            if(index < 0){
                return 0;
            }
            else if(index > 8){
                return 8;
            }
            else{
                return index;
            }
        },
        loadPreviousDate(){
            this.dateIndex = this.controlDateIndex(this.dateIndex - 1);
            this.calculateTotalMeal();
        },
        loadNextDate(){
            this.dateIndex = this.controlDateIndex(this.dateIndex + 1);
            this.calculateTotalMeal();
        },
        addFoodToMeal(index){
            this.mealsData[this.dateIndex].meals.push(Object.assign({}, this.userFood[index]));
            this.updateMeals();
        },
        addDishToMeal(index){
            this.mealsData[this.dateIndex].meals.push(Object.assign({}, this.userDish[index]));
            this.updateMeals();
        },
        updateMeals(){
            var self = this;
            axios.post('/update-meals',{
                mealsData: self.mealsData[self.dateIndex],
                userId: self.userData.id,
                year: self.mealsData[self.dateIndex].date.getFullYear(),
                month: self.mealsData[self.dateIndex].date.getMonth() + 1,
                day: self.mealsData[self.dateIndex].date.getDate(),
            })
                .then(function(response){
                    console.log(response.data);
                    self.calculateTotalMeal();
                })
                .catch(function(error){
                    console.log(error);
                })
        },
        deleteFoodFromMeal(index){
            this.$delete(this.mealsData[this.dateIndex].meals, index);
            this.updateMeals();
        },
        checkNumeric(index, key){
            console.log(key)
            if(this.mealsData[this.dateIndex].meals[index][key] === '' || this.mealsData[this.dateIndex].meals[index][key] === null){
                this.mealsData[this.dateIndex].meals[index][key] = 0;
            }
            this.updateMeals();
            console.log(this.mealsData[this.dateIndex].meals[index][key]);
        },
        resetTotalMeal(){
            this.totalCal = 0;
            this.totalPro = 0;
            this.totalLip = 0;
            this.totalGlu = 0;
        },
        calculateTotalMeal(){
            this.resetTotalMeal();
            for(index in this.mealsData[this.dateIndex].meals){
                var meal = this.mealsData[this.dateIndex].meals[index];
                this.totalCal += parseInt(meal.cal);
                this.totalPro += parseInt(meal.pro);
                this.totalLip += parseInt(meal.lip);
                this.totalGlu += parseInt(meal.glu);
            }
        },
        testAjax(){
          axios.get('/testAjax')
              .then(function(response){
                  console.log(response.data);
              })
              .catch(function(error){
                  console.log(error)
              });
        },
    },
})
