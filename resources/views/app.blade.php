@extends('appTemplate')

@section('contenu')

    <div id="app" class="row">
        <div id="menu"class="sidenav col l2 sidenav-fixed">

            <ul>
                <div id="profil_window" class="#e1f5fe light-blue lighten-5 center-align">
                    <div>
                        <img id="avatar" :src="userAvatarLink">
                    </div>
                </div>
                <li v-on:click="loadAccueilHtml"><a><i class="fas fa-home"></i>Accueil</a></li>
                <li v-on:click="loadProfilHtml"><a><i class="fas fa-user"></i>Mon Profil</a></li>
                <li v-on:click="loadMaNourritureHtml"><a><i class="fas fa-apple-alt"></i>Ma Nourriture</a></li>
                <li v-on:click="loadMesRepasHtml"><a><i class="fas fa-utensils"></i>Mes Repas</a></li>
            </ul>
        </div>
        <div id="app_content" class="col s12 l10 offset-l2 #eeeeee grey lighten-3">
            <div class="app-box z-depth-2 #e3f2fd blue lighten-5">
                @include('includesApp.appAccueil')
                @include('includesApp.appProfil')
                @include('includesApp.appMaNourriture')
                @include('includesApp.appMesRepas')
            </div>
        </div>
    </div>

@endsection