@extends('template')

@section('contenu')

    <div id="app">
        @if(isset($accesDenied))
                <div>Accés refusé</div>
            @endif
        <nav class="navbar navbar-expand-lg" id="navbar">
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav">
                </ul>
            </div>
            <div>
                <ul class="navbar-nav">
                    @if(!Auth::check())
                    <li class="nav-item">
                        <a class="nav-link log-buttons" v-on:click="openLogin">Se connecter</a>
                    </li>
                    <li class="nav-item log-buttons">
                        <a class="nav-link" v-on:click="openRegister">S'inscrire</a>
                    </li>
                    @endif
                    <li class="nav-item log-buttons">
                        <a class="nav-link" v-on:click="logout">Se déconnecter</a>
                    </li>
                    @if(Auth::check())
                            <li class="nav-item log-buttons">
                                <a class="nav-link" v-on:click="openApp">App</a>
                            </li>
                        @endif
                </ul>
            </div>
        </nav>
        <log-popup :style="display" :popup-text="popupText" :test-text="testText" :log-val="logVal"></log-popup>
    </div>
    <!--<div id="popup">
        <div v-bind:id="tabId">
        <form>
            <h3>@{{tabTitle}}</h3>
            <label for="username-input"><input type="text" id="username-input"></label>
            <label for="password-input"><input type="password" id="password-input"></label>
            <button type="submit" v-bind:id="tabButtonId">@{{tabButtonText}}</button>
        </form>
        </div>
    </div>-->

    <header>

    </header>

    <section>
        <div class="container">
            <div class="row">
                <div class="col-md-6">TEST</div>
                <div class="col-md-6">TEST</div>
                <div class="col-md-6">TEST</div>
                <div class="col-md-6">TEST</div>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <img class="img-fluid" src="https://via.placeholder.com/150x150" id="brand-footer">
                </div>
            </div>
        </div>
    </footer>

@endsection