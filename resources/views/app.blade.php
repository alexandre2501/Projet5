@extends('appTemplate')

@section('contenu')

    <div id="app" class="row">
        <div id="menu"class="sidenav col s2 sidenav-fixed">

            <ul>
                <div id="profil_window">
                    <div>
                        <img id="avatar" :src="userAvatarLink">
                        <p>{{Auth::user()->name}}</p>
                    </div>
                </div>
                <li v-on:click="loadAccueilHtml"><a>Accueil</a></li>
                <li v-on:click="loadProfilHtml"><a>Mon Profil</a></li>
                <li v-on:click="loadMaNourritureHtml"><a>Ma Nourriture</a></li>
                <li v-on:click="loadMesRepasHtml"><a>Mes Repas</a></li>
                <li><a>Calculer un repas</a></li>
            </ul>
        </div>
        <div id="app_content" class="col s10 offset-s2 #eeeeee grey lighten-3">
            <div class="app-box z-depth-2 #fafafa grey lighten-5">
                @include('includesApp.appAccueil')
                @include('includesApp.appProfil')
                @include('includesApp.appMaNourriture')
                @include('includesApp.appMesRepas')
            </div>
        </div>
    </div>

@endsection