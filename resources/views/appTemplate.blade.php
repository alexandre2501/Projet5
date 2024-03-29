<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="node_modules/materialize-css/dist/css/materialize.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
    <title>Slimmy</title>
</head>
<body class="">

@yield('contenu')

<script src="node_modules/materialize-css/dist/js/materialize.js"></script>
<script src="node_modules/vue/dist/vue.js"></script>
<script src="node_modules/vuex/dist/vuex.js"></script>
<script src="node_modules/vue-router/dist/vue-router.js"></script>
<script src="node_modules/axios/dist/axios.js"></script>
<script src="js/components/Home.js"></script>
<script src="js/components/Article.js"></script>
<script src="js/components/Profil.js"></script>
<script src="js/components/FoodMyFood.js"></script>
<script src="js/components/FoodMyDish.js"></script>
<script src="js/components/FoodAddFood.js"></script>
<script src="js/components/FoodAddDish.js"></script>
<script src="js/components/Food.js"></script>
<script src="js/components/Meal.js"></script>
<script src="js/appVue.js"></script>
<link rel="stylesheet" href="css/appStyle.css">

</body>
</html>
