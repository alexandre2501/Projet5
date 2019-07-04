@extends('template')

@section('contenu')

    <div id="app">
        <nav>
            <div class="nav-wrapper">
                <a href="#" class="brand-logo">coucoud</a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    @if(!Auth::check())
                        <li><a v-on:click="openLogin">Se connecter</a></li>
                        <li><a  v-on:click="openRegister">S'inscrire</a></li>
                    @endif
                    @if(Auth::check())
                            <li><a v-on:click="logout">Se déconnecter</a></li>
                            <li><a v-on:click="openApp">Application</a></li>
                        @endif
                </ul>
            </div>
        </nav>
        <div v-if="showPopup === true" class="logPopupBackground">
            <div id="popupWindow">
                <form id="authForm">
                    <input type="hidden" name="_token" v-bind:value="csrfToken">
                    <div class="form-group">
                        <h3>@{{ popupTitle }}</h3>
                        <input class="form-control" name="email" type="email" id="email" placeholder="Email">
                        <input class="form-control" type="password" name="password" id="password" value="" placeholder="Mot de passe">
                        <span id="errorSpan">@{{ formError }}</span>
                        <input v-if="popupState === 'register'" class="form-control"  type="text" name="name" id="name" value="" placeholder="Pseudo">
                        <button v-if="popupState === 'login'" v-on:click="login" type="submit" class="btn btn-primary">@{{ popupTitle }}</button>
                        <button v-else-if="popupState === 'register'" v-on:click="register" class="btn btn-primary">@{{ popupTitle }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    @endsection