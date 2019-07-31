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
    '            <button type="submit" class="btn" id="submit_password_change" v-on:click="submitPasswordChange" :disabled="passChangeBtn === 1 ? true : false">Modifier</button>\n' +
    '        </form>\n' +
    '        <span>{{passMsg}}</span>\n' +
    '        <div><p><strong>Tips :</strong> Votre mot de passe ne doit pas contenir d\'espace et doit faire 8 caractères minimum</p></div>\n' +
    '        </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>',
    mounted(){
        M.AutoInit();
    },
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