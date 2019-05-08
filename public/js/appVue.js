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
        console.log(axios);
        this.setEnv();
        this.setUserAvatar();
    },
    data: {
        //avatar: null,
        env: '',
        //User Data
        userAvatar: '',
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
            //Erreur formulaire ajout de nourriture
            foodFormError: Object.assign({}, modelFoodError),
            //Erreur formulaire ajout de plat
            dishFormError: Object.assign({}, modelDishError),
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
        setUserAvatar(){
            axios.get('/auth/avatar',{
                headers: {
                    'Content-Type' : 'application/json; charset=UTF-8',
                }
            })
                .then(function(response){
                    console.log(response.data);
                    app.userAvatar = response.data;
                    app.userAvatarLink = 'http://' + app.env + '/avatars/' + app.userAvatar;
                    console.log(app.userAvatarLink)
                })
                .catch(function(error){
                    console.log(error);
                })
        },
        loadAccueilHtml(){
            this.appContent = 'accueil';
        },
        loadProfilHtml(){
            this.appContent = 'profil';
        },
        loadMaNourritureHtml(){
            this.appContent = 'maNourriture';
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
