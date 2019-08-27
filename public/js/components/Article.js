const Article = Vue.component('Article',{
    template: '<div class="row flex" id="article">' +
    '   <div class="#fafafa grey lighten-5 z-depth-2 col s12 pad-zero">' +
    '       <div class="col m12 s12 article-block">' +
    '           <h4 class="center-align">{{article.title}}</h4>' +
    '           <div v-html="article.content"></div>' +
    '       </div>' +
    '   </div>' +
    '</div>',
    mounted(){
        this.getArticle();
    },
    data: function(){
        return {
            article: '',
        }
    },
    methods: {
        getArticle(){
            axios.post('/get-article',{
                id: this.$route.params.id,
            })
                .then(function(response){
                    console.log(response.data);
                    this.article = response.data[0];
                }.bind(this))
                .catch(function(error){
                    console.log(error);
                })
        },
    },
})