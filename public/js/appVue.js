//const axios = require('axios');

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

var app = new Vue({
    el: '#app',
    mounted(){
        window.axios.defaults.headers.common['X-CSRF-TOKEN'] = this.csrfToken;
        M.AutoInit();
        this.setEnv();
        this.setUserData();
    },
    data: {
        //avatar: null,
        env: '',
        //User Data
        userData: '',
        userAvatarLink: '',
        userDish: '',
        userFood: '',
        content: '',
        contentHtml: '<p>coucou</p>',
        appContent: 'accueil',
        csrfToken: document.head.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        //Changement de mot de passe
        passRegex: '^((?=\\S*?[a-z]).{7,})\\S$',
        oldPass: document.getElementById('old_pass_input').value,
        newPass: document.getElementById('new_pass_input').value,
        confirmPass: document.getElementById('confirm_pass_input').value,
        passChangeBtn: 1,
        passMsg: '',
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
        /*aliments: JSON.parse({!!$aliments!!}),*/
    },
    methods:{
        avatar(e){
            console.log(this,e);
        },
        setEnv(){
          var env = window.location.href;
          env = env.substr(7);
          var id = env.search('/');
          env = env.substr(0,id);
          this.env = env;
        },
        setUserData(){
            var self = this;
            axios.get('/auth/data',{
                headers: {
                    'Content-Type' : 'application/json; charset=UTF-8',
                }
            })
                .then(function(response){
                    console.log(response.data);
                    self.userData = response.data;
                    self.userAvatarLink = 'http://' + self.env + '/avatars/' + self.userData.avatar;
                    console.log(self.userAvatarLink)
                })
                .catch(function(error){
                    console.log(error);
                })
        },
        loadAccueilHtml(){
            this.appContent = 'accueil';
            M.AutoInit();
        },
        loadProfilHtml(){
            this.appContent = 'profil';
            M.AutoInit();
        },
        loadMaNourritureHtml(){
            this.appContent = 'maNourriture';
            M.AutoInit();
        },
        loadMesRepasHtml(){
            this.appContent = 'mesRepas';
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
            var self = this;
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
                        self.passMsg = response.data.success;
                    }
                    else {
                        self.passMsg = response.data.error;
                    }
                })
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
                    console.log(response.data);
                })
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
            var self = this;
            axios.get('/get-user-dish')
                .then(function(response){
                    self.userDish = response.data;
                    console.log(self.userDish)
                })
                .catch(function(error){
                    console.log(error)
                })
        },
        getUserFood(){
            var self = this;
            axios.get('/get-user-food')
                .then(function(response){
                    self.userFood = response.data;
                })
                .catch(function(error){
                    console.log(error)
                })
        },
        createDish(e){
            e.preventDefault();
            var self = this;
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
                    self.loadMyFood('myDish');
                })
                .catch(function(error){
                    self.cleanseErrorMsg('dish');
                    console.log(error.response.data.errors)
                    for(key in error.response.data.errors){
                        self.showResponseError('dish', key, error.response.data.errors[key][0]);
                    }
                })
        },
        createFood(e){
            e.preventDefault();
            var self = this;
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
                    self.loadMyFood('myFood');
                })
                .catch(function(error){
                    self.cleanseErrorMsg('food');
                    console.log(error.response.data.errors)
                    for(key in error.response.data.errors){
                        self.showResponseError('food', key, error.response.data.errors[key][0]);
                    }
                })
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
                .then(function(response){
                    console.log(response.data);
                    self.loadMyFood('myFood');
                    self.foodToUpdate = '';
                    self.foodFormState = '';
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
