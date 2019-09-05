const Home = Vue.component('Home',{
    template: '<div class="row flex" id="home_block">' +
    '   <div class="#fafafa grey lighten-5 z-depth-2 col s12">' +
    '       <div class="col m12 s12">' +
    '           <p>Bonjour {{ this.$store.state.userData.login }},</p>' +
    '           <p>L\'application Slimmy est là pour t\'aider à gérer ton alimentation quel que soit ton objectif. ' +
    '           Pour améliorer ta navigation et ta prise en main de l\'outil, voici quelques conseils :</p>' +
    '           <ul class="collection">' +
    '               <li class="collection-item">L\'onglet "Ma Nourriture" te permet d\ajouter des plats ou des aliments, à toi de choisir les spécificités (calories, nutriments...etc) de ta nourriture.</li>' +
    '               <li class="collection-item">Tu peux également gérer tes aliments à tout moment grace aux boutons "Supprimer" et "Modifier".</li>' +
    '               <li class="collection-item">L\'onglet "Mes Repas" est la partie ou tu va pouvoir composer tes repas en ajoutant la nourriture que tu auras crée.</li>' +
    '               <li class="collection-item">Chaques plats/aliments est directement modifiable lorsque tu les ajoutes à une journée.</li>' +
    '               <li class="collection-item">Une alimentation riche et variée est la clé d\'une bonne santé ! Nos articles seront là pour t\'épauler dans cette voie.</li>' +
    '           </ul>' +
    '           <p>Nous te souhaitons une bonne navigation !</p>' +
    '       </div>' +
    '   </div>' +
    '   <div class="#fafafa grey lighten-5 z-depth-2 col s12 news-block">' +
    '       <div class="col m12 s12">' +
    '           <div class="col l4 m6 s12" v-for="(value, index) in news">' +
    '               <div class="news-blocks">' +
    '                   <h5 class="center-align"><router-link :to="{ name: \'article\', params: { id: value.id }}">{{ value.title }}</router-link></h5><div class="news-content" v-html="value.content"></div>' +
    '               </div>' +
    '           </div>' +
    '       </div>' +
    '   </div>' +
    '</div>',
    mounted(){
        M.AutoInit();
        this.getNews();
    },
    data: function(){
        return {
            news: null,
        }
    },
    methods: {
        getNews(){
            axios.get('/get-news')
                .then(function(response){
                    console.log(response.data);
                    this.news = response.data;
                }.bind(this))
                .catch(function(error){
                    console.log(error);
                })
        },
    },
})