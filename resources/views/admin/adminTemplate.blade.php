<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script>
    <link rel="stylesheet" href="../node_modules/materialize-css/dist/css/materialize.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
    <title>Projet 5</title>
</head>
<body class="row">

@section('sidebar')

    <div id="app" class="col s2 pad-zero">
        <div id="menu"class="sidenav col l2 sidenav-fixed #e1f5fe light-blue lighten-5">
            <ul>
                <li><a href="../admin/home"><i class="fas fa-home"></i>Accueil</a></li>
                <li><a href="../admin/news"><i class="fas fa-user"></i>News</a></li>
                <li><a><i class="fas fa-apple-alt"></i>Ma Nourriture</a></li>
                <li><a><i class="fas fa-utensils"></i>Mes Repas</a></li>
            </ul>
        </div>
    </div>

@show

@yield('contenu')

<script src="../node_modules/materialize-css/dist/js/materialize.js"></script>
<script src="../node_modules/vue/dist/vue.js"></script>
<script src="../node_modules/vuex/dist/vuex.js"></script>
<script src="../node_modules/vue-router/dist/vue-router.js"></script>
<script src="../node_modules/axios/dist/axios.js"></script>
<script>
    M.AutoInit();
</script>
<link rel="stylesheet" href="../css/adminStyle.css">

</body>
</html>
