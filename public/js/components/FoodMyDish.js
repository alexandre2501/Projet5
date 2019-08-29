const MyDish = Vue.component('MyDish',{
    template: '    <div>\n' +
    '        <div class="">\n' +
    '            <div class="food-block col s6 m4 l4 xl3" v-for="(value,index) in $store.state.userDish">\n' +
    '                <div class="food-content col s12 z-depth-2">\n' +
    '                    <h5 class="#26a69a teal lighten-1 col s12 center-align">{{ value.name }}</h5>\n' +
    '                    <div class="col s12 center-align">Calories : {{ value.cal }} </div>\n' +
    '                    <div class="col s12 m12 l6 center-align">Quantité : {{ value.quant }} g</div>\n' +
    '                    <div class="col s12 m12 l6 center-align">Protéines : {{ value.pro }} g</div>\n' +
    '                    <div class="col s12 m12 l6 center-align">Lipides : {{ value.lip }} g</div>\n' +
    '                    <div class="col s12 m12 l6 center-align">Glucides : {{ value.glu }} g</div>\n' +
    '                    <div class="col s12"><button class="col s12 m12 l6 waves-effect waves-light btn-small" v-on:click="$emit(\'deleteDish\', index)">Supprimer</button><button class="col s12 m12 l6 waves-effect waves-light btn-small" v-on:click="$emit(\'fillUpdateDish\', index)">Modifier</button></div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n',
    data: function(){
        return{

        }
    },
    methods: {

    },
})

