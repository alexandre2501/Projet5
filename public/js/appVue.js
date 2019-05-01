//const axios = require('axios');

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
        userAvatar: '',
        userAvatarLink: '',
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
                })
                .catch(function(error){
                    console.log(error);
                })
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
