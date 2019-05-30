<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="node_modules/materialize-css/dist/css/materialize.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
    <title>Projet 5</title>
</head>
<body class="">

@yield('contenu')

<script src="node_modules/materialize-css/dist/js/materialize.js"></script>
<script src="node_modules/vue/dist/vue.js"></script>
<script src="node_modules/axios/dist/axios.js"></script>
<script src="js/appVue.js"></script>
<link rel="stylesheet" href="css/appStyle.css">

</body>
</html>
