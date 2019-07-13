<div class="row flex" id="profil_block" v-else-if="appContent === 'profil'">
    <div id="change_avatar_div" class="col s12 m12 l6">
        <div class="#fafafa grey lighten-5 content_blocks z-depth-2">
        <h3 class="center-align">Photo de profil</h3>
            <div class="pad-block">
        <img id="avatar_min" alt="Miniature du profil" :src="userAvatarLink">
        <form id="upload_new_avatar">
            <div class="file-field input-field">
                <div class="btn">
                    <span>File</span>
                    <input v-on:change="avatar($event)" id="upload_avatar_input" type="file" name="avatar" accept="image/*">
                </div>
                <div class="file-path-wrapper">
                    <input class="file-path validate" type="text">
                </div>
            </div>
            <button class="btn" v-on:click="uploadNewAvatar" type="submit" id="submit_new_avatar">Modifier</button>
        </form>
            </div>
        </div>
    </div>
    <div id="change_password_div" class="col s12 m12 l6">
        <div class="#fafafa grey lighten-5 content_blocks z-depth-2">
        <h3 class="center-align">Changer de mot de passe</h3>
        <div class="pad-block">
        <form id="change_password_form">
            <div class="input-field col s12">
                <input id="old_pass_input" type="password" name="oldPass">
                <label for="old_pass_input">Ancien mot de passe :</label>
            </div>
            <div class="input-field col s12">
                <input v-on:keyup="comparePassword" id="new_pass_input" type="password" name="newPass" >
                <label for="new_pass_input">Nouveau mot de passe :</label>
            </div>
            <div class="input-field col s12">
                <input v-on:keyup="comparePassword" id="confirm_pass_input" type="password" name="confirmPass">
                <label for="confirm_pass_input">Confirme le mot de passe :</label>
            </div>
            <button type="submit" id="submit_password_change" v-on:click="submitPasswordChange" :disabled="passChangeBtn === 1 ? true : false">Modifier</button>
        </form>
        <span>@{{passMsg}}</span>
        <div><p><strong>Tips :</strong> Votre mot de passe ne doit pas contenir d'espace et doit faire 8 caractères minimum</p></div>
        </div>
        </div>
    </div>
</div>