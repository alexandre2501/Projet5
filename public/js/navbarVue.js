/*var loginPopup = {
    props: ['compidpopup', 'VueLoginHtml', 'VueRegisterHtml', 'VueFormTest', 'VuePopupTitle', 'VueButtonValue', 'VueButtonText'],
    data(){
        return {
            idPopup: this.compidpopup,
            loginHtml: this.VueLoginHtml,
            registerHtml: this.VueRegisterHtml,
            formTest: this.VueFormTest,
            popupTitle: this.VuePopupTitle,
            buttonValue: this.VueButtonValue,
            buttonText: this.VueButtonText,
        }
    },
    methods: {
        test(){
            this.loginHtml = 'changed';
            this.formTest = '';
            console.log(this.loginHtml)
            console.log(this.VueLoginHtml)
        }
    },
    template: '<div v-on:click="test" v-bind:id="idPopup" class="popup">' +
    '<div class="popup-div">' +
    '            <div class="popup-form">' +
    '                <h3>{{popupTitle}}</h3>' +
    '                <label for="popup-username"><input type="text" value="" id="popup-username"></label>' +
    '                <label for="popup-password"><input type="text" value="" id="popup-password"></label>' +
    '                <button id="popup-button" v-bind:value="buttonValue">{{buttonText}}</button>' +
    '            </div>' +
    '        </div>' +
    '</div>',
}*/

var navbarComp = {
    props: [],
    methods: {
        login(){
            idPopup = 'clicked login'
            console.log(idPopup)
        },
        register(){
            console.log('register()')
        }
    },
    template: '<nav class="navbar navbar-expand-lg" id="navbar">\n' +
    '        <div class="collapse navbar-collapse">\n' +
    '            <ul class="navbar-nav">\n' +
    '                <li class="nav-item active">Menu1</li>\n' +
    '                <li class="nav-item">Menu2</li>\n' +
    '                <li class="nav-item">Menu3</li>\n' +
    '                <li class="nav-item">Menu4</li>\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '        <div>\n' +
    '            <ul class="navbar-nav">\n' +
    '                <li class="nav-item">\n' +
    '                    <a class="nav-link log-buttons" v-on:click="login">Se connecter</a>\n' +
    '                </li>\n' +
    '                <li class="nav-item log-buttons">\n' +
    '                    <a class="nav-link" v-on:click="register">S\'inscrire</a>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '    </nav>',
}

/*var loginPopup = new Vue({
    el: '#popup',
    data:{
        tabId: '',
        tabTitle: '',
        tabButtonId: '',
        tabButtonText: '',
    },
    methods:{
        login(){
            idPopup = 'clicked login'
            console.log(idPopup)
        },
        register(){
            console.log('register()')
        }
    }
})*/

var logPopup ={
    props:{
        popupText: String,
        testText: {default: 'Coucou', type: String},
        logVal: String,
    },
    data: function(){
        return{
            text: this.testText,
            display: 'display:none',
            logTitle: 'TITLE',
            popupVal: this.logVal,
            submitButtonText: '',
            formAction: '',
            csrfToken: document.head.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        }
    },
    watch:{
        testText(){
            this.text = this.testText;
        },
        logVal(){
            this.popupVal = this.logVal;
            console.log(this);
            this.modifyButtonText();
            this.modifyFormaction();
        }
    },
    methods:{
        modifyText(){
            if(this.text === 'Cliqué'){
                this.text = 'Coucou';
                this.testText = 'Coucou';
            }
            else if(this.text === 'Coucou'){
                this.text = 'Cliqué';
            }
            else{
                this.text = 'Coucou';
            }
        },
        modifyDisplay(){
            if(this.display === 'display:none'){
                this.display = 'display:inline-block';
            }
            else if(this.display === 'display:inline-block'){
                this.display = 'display:none';
            }
        },
        modifyButtonText(){
            if(this.popupVal === 'login'){
                this.submitButtonText = 'Se connecter';
            }
            else if(this.popupVal === 'register'){
                this.submitButtonText = 'S\'inscrire';
            }
        },
        modifyFormaction(){
            if(this.popupVal === 'login'){
                this.formaction = '/login';
            }
            else if(this.popupVal === 'register'){
                this.formaction = '/register';
            }
        }
    },
    template: `<div class="logPopupBackground">
                    <div id="popupWindow">
                        <form method="POST" :action="formaction">
                        <input type="hidden" name="_token" :value="csrfToken">
                            <div class="form-group">
                                <h3 v-if="popupVal === 'login'">Se connecter</h3>
                                <h3 v-else-if="popupVal === 'register'">S'inscrire</h3>
                                <input class="form-control" name="email" type="email" id="email" placeholder="Email">
                                <input class="form-control" type="password" name="password" id="password" value="" placeholder="Mot de passe">
                                <input class="form-control" v-if="popupVal === 'register'" type="text" name="name" id="name" value="" placeholder="Pseudo">
                                <button type="submit" class="btn btn-primary">{{submitButtonText}}</button>
                            </div>
                        </form>
                    </div>
                </div>`,
}

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
