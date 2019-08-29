@extends('appTemplate')

@section('contenu')

    <div id="app" class="row">
        <div id="menu"class="sidenav col l2 sidenav-fixed #e1f5fe light-blue lighten-5">
            <ul>
                <div id="profil_window" class="center-align">
                    <div>
                        <img id="avatar" :src="$store.state.userAvatarLink">
                    </div>
                </div>
                <router-link to="/accueil">
                    <li><a><i class="fas fa-home"></i>Accueil</a></li>
                </router-link>
                <router-link to="/profil">
                    <li><a><i class="fas fa-user"></i>Mon Profil</a></li>
                </router-link>
                <router-link to="/food">
                    <li><a><i class="fas fa-apple-alt"></i>Ma Nourriture</a></li>
                </router-link>
                <router-link to="/meal">
                    <li><a><i class="fas fa-utensils"></i>Mes Repas</a></li>
                </router-link>
                @if(Auth::user()->isAdmin())
                    <li><a href="/admin"><i class="fas fa-utensils"></i>Admin Panel</a></li>
                @endif
            </ul>
        </div>
        <div id="app_content" class="col s12 l10 offset-l2 #eeeeee grey lighten-3">
            <div class="app-box z-depth-2 #e3f2fd blue lighten-5">
                <router-view></router-view>
            </div>
        </div>
    </div>

@endsection