@extends('template')

@section('contenu')

    <div id="app">
        <nav>
            <div class="nav-wrapper">
                <a href="#" class="brand-logo">LOGO</a>
                <a href="#" data-target="menu-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
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
                <ul id="menu-mobile" class="sidenav">
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
        <div class="header valign-wrapper">
            <img class="responsive-img full-width" src="image/banner1.jpg" alt="Bannière">
            <div id="header-content" class="center-align">
                <h1 id="main-title">Slimmy</h1>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col m12 center-align"><h2>Gérez votre alimentation au quotidien</h2></div>
                <div class="col m4 s12 valign-wrapper flex-vertical"><i class="icons fas fa-5x fa-carrot"></i><p>Controlez votre alimentation</p></div>
                <div class="col m4 s12 valign-wrapper flex-vertical"><i class="icons fas fa-5x fa-weight"></i><p>Ajustez votre consommation calorique</p></div>
                <div class="col m4 s12 valign-wrapper flex-vertical"><i class="icons fas fa-5x fa-running"></i><p>Restez en pleine forme</p></div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col m6">
                    <div>
                        <h4>100% Simple</h4>
                        <p>Notre application est conçu afin que n'importe qui puisse l'utiliser grâce à une ergonomie étudiée pour une prise en maine rapide</p>
                    </div>
                    <div>
                        <h4>100% Gratuit</h4>
                        <p>Pas besoin d'abonnement pour profiter de toutes les fonctionnalités de l'application. Tout est gratuit !</p>
                    </div>
                    <div>
                        <h4>100% Efficace</h4>
                        <p>Notre gestion dynamique des repas ainsi que les statistiques présentes dans l'interfaces vous aideront à garder le cap</p>
                    </div>
                </div>
                <div class="col m6">IMAGE DE L'APPLI SOON</div>
            </div>
        </div>
        <div class="container">
            <div class="row center-align">
                <div class="col m12"><h2>Plus rien ne vous retient maintenant !</h2></div>
                <div class="col m12 flex-vertical">
                    <p>L'insciption se fait en moins d'une minute. L'essayer c'est l'adopter</p>
                    @if(!Auth::check())
                        <a v-on:click="openRegister" class="waves-effect waves-light btn-large">Je m'inscris !</a>
                    @endif
                    @if(Auth::check())
                        <a v-on:click="openApp" class="waves-effect waves-light btn-large">Accéder à l'application</a>
                    @endif
                </div>
            </div>
        </div>
        <div v-on:click="clickPopup" v-if="showPopup === true" class="logPopupBackground" id="popupBg">
            <div id="popupWindow">
                <form id="authForm">
                    <input type="hidden" name="_token" v-bind:value="csrfToken">
                    <div class="form-group">
                        <div class="#1e88e5 blue darken-1 center-align" id="popup-title">
                            <h3>@{{ popupTitle }}</h3>
                        </div>
                        <div id="inputs-form">
                            <input class="form-control" name="email" type="email" id="email" placeholder="Email">
                            <input class="form-control" type="password" name="password" id="password" placeholder="Mot de passe">
                            <span id="errorSpan">@{{ formError }}</span>
                            <input v-if="popupState === 'register'" class="form-control"  type="text" name="name" id="name" placeholder="Pseudo">
                        </div>
                        <div class="center-align" id="buttons-form">
                            <div v-if="popupState === 'login'">
                                <button v-on:click="login" type="submit" class="btn btn-primary">@{{ popupTitle }}</button>
                                <button v-on:click="openRegister" class="btn">Pas encore inscris ?</button>
                            </div>
                            <div v-else-if="popupState === 'register'">
                                <button v-on:click="register" class="btn btn-primary">@{{ popupTitle }}</button>
                                <button v-on:click="openLogin" class="btn">Déjà inscris ?</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <footer class="page-footer">
            <div class="footer-copyright">
                <div class="container">
                    © 2019 Alexandre Urbanski Copyright
                </div>
            </div>
        </footer>
    </div>
    @endsection