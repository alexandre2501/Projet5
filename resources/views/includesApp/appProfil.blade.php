<div v-else-if="appContent === 'profil'">
    <h2>Profil</h2>
    <div id="change_avatar_div">
        <h3>Photo de profil</h3>
        <img id="avatar_min" alt="Miniature du profil" :src="userAvatarLink">
        <form id="upload_new_avatar">
            <label for="upload_avatar_input">Modifier votre avatar<input v-on:change="avatar($event)" type="file" id="upload_avatar_input" name="avatar"></label>
            <button v-on:click="uploadNewAvatar" type="submit" id="submit_new_avatar">Modifier</button>
        </form>
    </div>
    <div id="change_password_div">
        <h3>Changer de mot de passe</h3>
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