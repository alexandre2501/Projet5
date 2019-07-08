<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Projet 5</title>
    <link rel="stylesheet" href="node_modules/materialize-css/dist/css/materialize.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
</head>
<body>

@yield('contenu')

<link rel="stylesheet" href="css/style.css">
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="js/navbarVue.js"></script>
<script src="node_modules/materialize-css/dist/js/materialize.js"></script>
<script src="node_modules/axios/dist/axios.js"></script>
<script>M.AutoInit();</script>
</body>
</html>