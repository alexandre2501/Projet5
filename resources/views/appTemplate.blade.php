<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="node_modules/materialize-css/dist/css/materialize.css">
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
