<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script src="https://cdn.tiny.cloud/1/cz88j6zs1gmtom7w08czf112cxcl2m68iwiglxpau94yahcu/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script>
    <link rel="stylesheet" href="/node_modules/materialize-css/dist/css/materialize.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
    <title>Projet 5</title>
</head>
<body class="row">

@section('sidebar')

    <div id="app" class="col s2 pad-zero">
        <div id="menu"class="sidenav col l2 sidenav-fixed #e1f5fe light-blue lighten-5">
            <ul>
                <li><a href="/admin/home"><i class="fas fa-home"></i>Accueil</a></li>
                <li><a href="/admin/news"><i class="fas fa-newspaper"></i>News</a></li>
                <li><a href="/app"><i class="fas fa-backspace"></i>Retour</a></li>
            </ul>
        </div>
    </div>

@show

@yield('contenu')

@include('admin/script')

</body>
</html>
