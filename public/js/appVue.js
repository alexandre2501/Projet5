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
        totalCal: 0,
        totalPro: 0,
        totalLip: 0,
        totalGlu: 0,
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
        getUserMeal(){

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

const routes = [
    { path: '/accueil'},
    { path: '/profil', component: Profil},
    { path: '/food'},
    { path: '/meal'},
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    el: '#app',
    components: {'Profil': Profil},
    router,
    store,
    mounted(){
        window.axios.defaults.headers.common['X-CSRF-TOKEN'] = this.csrfToken;
        M.AutoInit();
        this.setEnv();
        this.setUserData();
        this.getUserMeal();
        //this.checkRoute();
    },
    watch: {
        /*'$route' (to, from){
            if(to.path === '/acceuil'){
                this.loadAccueilHtml();
            }
            else if(to.path === '/profil'){
                this.loadProfilHtml();
            }
            else if(to.path === '/food'){
                this.loadMaNourritureHtml();
            }
            else if(to.path === '/meal'){
                this.loadMesRepasHtml();
            }
            else{
                this.loadAccueilHtml();
            }
        }*/
    },
    data: {
        //avatar: null,
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
        totalCal: 0,
        totalPro: 0,
        totalLip: 0,
        totalGlu: 0,
        /*aliments: JSON.parse({!!$aliments!!}),*/
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
        checkRoute(){
          if(this.$route.path != this.currentRoute){
              if(this.$route.path === '/acceuil'){
                  this.loadAccueilHtml();
              }
              else if(this.$route.path === '/profil'){
                  this.loadProfilHtml();
              }
              else if(this.$route.path === '/food'){
                  this.loadMaNourritureHtml();
              }
              else if(this.$route.path === '/meal'){
                  this.loadMesRepasHtml();
              }
              else{
                  this.loadAccueilHtml();
              }
          }
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
                this.mealsData.push(obj);
            }
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
                    this.userDish = response.data;
                }.bind(this))
                .catch(function(error){
                    console.log(error)
                })
        },
        getUserFood(){
            axios.get('/get-user-food')
                .then(function(response){
                    this.userFood = response.data;
                }.bind(this))
                .catch(function(error){
                    console.log(error)
                })
        },
        getUserMeal(){
            axios.get('/get-user-meal')
                .then(function(response){
                    this.setMealsDate(response.data);
                    this.calculateTotalMeal();
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
