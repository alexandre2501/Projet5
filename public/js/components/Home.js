const Home = Vue.component('Home',{
    template: '<div class="row flex" id="home_block">' +
    '   <div class="#fafafa grey lighten-5 z-depth-2 col s12">' +
    '       <div class="col m9 s12">NEWS</div>' +
    '       <div class="col m3 s12">LOGS</div>' +
    '   </div>' +
    '</div>',
    mounted(){
        M.AutoInit();
    },
    data: function(){
        return {

        }
    },
    methods: {},
})