var navbarVue = new Vue({
    el: '#app',
    mounted(){
        this.csrfToken = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content');
        M.AutoInit();
    },
    data:{
        showPopup: false,
        popupState: 'login',
        popupTitle: 'Se connecter',
        formAction: '/login',
        csrfToken: null,
        formError: null,
        errors: {},
    },
    methods: {
        openLogin(e){
            e.preventDefault();
            this.showPopup = true;
            this.popupState = 'login';
            this.popupTitle = 'Se connecter';
            this.formAction = '/login';
            M.AutoInit();
        },
        openRegister(e){
            e.preventDefault();
            this.showPopup = true;
            this.popupState = 'register';
            this.popupTitle = 'S\'inscire';
            this.formAction = '/register';
            M.AutoInit();
        },
        register(e){
            e.preventDefault();
            var formElt = document.getElementById('authForm');
            var formData = new FormData(formElt);
            axios.post('/register-ajax',
                //avatar: document.getElementById('upload_avatar_input').files[0].name
                formData
                ,{
                    headers: {
                        //'content-type': 'multipart/form-data',
                    }
                })
                .then(function(response){
                    console.log(response.data);
                    window.location.href = '/home';
                }.bind(this))
                .catch(function(error){
                    console.log(error.response.data)
                    this.errors = error.response.data.errors;
                }.bind(this))
        },
        login(e){
            e.preventDefault();
            var formElt = document.getElementById('authForm');
            var formData = new FormData(formElt);
            axios.post('/login-ajax',
                //avatar: document.getElementById('upload_avatar_input').files[0].name
                formData
                ,{
                    headers: {
                        //'content-type': 'multipart/form-data',
                    }
                })
                .then(function(response){
                    console.log(response.data);
                    window.location.href = '/home';
                }.bind(this))
                .catch(function(error){
                    console.log(error.response.data)
                    this.errors = error.response.data.errors;
                }.bind(this))
        },
        logout(){
            window.location.href = '/logout';
        },
        openApp(){
            window.location.href = '/app';
        },
        clickPopup(e){
            if(e.target.id === 'popupBg'){
                this.showPopup = false;
            }
        },
    },
})
var html = '<div class="popup-div"><div class="popup-form"><h3>{{popupTitle}}</h3><label for="popup-username"><input type="text" value="" id="popup-username"></label></div></div>'
