const Meal = Vue.component('Meal',{
    template: '<div>\n' +
    '    <div class="row repas-block #fafafa grey lighten-5 z-depth-2">\n' +
    '        <div id="date-block" class="col s12 valign-wrapper">\n' +
    '            <div id="previousDate" class="col s2 center-align" v-on:click="loadPreviousDate"><i class="fas fa-3x fa-chevron-circle-left"></i></div>\n' +
    '            <div id="nameDate" class="col s8 center-align">{{ $store.state.mealsData[$store.state.dateIndex].lisibleDate }}</div>\n' +
    '            <div id="nextDate" class="col s2 center-align" v-on:click="loadNextDate"><i class="fas fa-3x fa-chevron-circle-right"></i></div>\n' +
    '        </div>\n' +
    '        <div id="meal-block" class="col s12">\n' +
    '            <div id="meals-content" class="col s12 m12 l9">\n' +
    '                <div class="col s12">\n' +
    '                    <h3 class="col s12 center-align">CONSOMMATION DU JOUR</h3>\n' +
    '                    <div class="col s3 center-align">Calories : {{ $store.state.mealTotal.cal }} cal</div>\n' +
    '                    <div class="col s3 center-align">Proteines : {{ $store.state.mealTotal.pro }} g</div>\n' +
    '                    <div class="col s3 center-align">Lipides : {{ $store.state.mealTotal.lip }} g</div>\n' +
    '                    <div class="col s3 center-align">Glucides : {{ $store.state.mealTotal.glu }} g</div>\n' +
    '                </div>\n' +
    '                <div class="col s6 m4 l3 meal-content" v-for="(value, index) in $store.state.mealsData[$store.state.dateIndex].meals">\n' +
    '                    <h6 class="col s12 center-align">{{ value.name }}<i class="far fa-times-circle valign-wrapper" v-on:click="deleteFoodFromMeal(index)"></i></h6>\n' +
    '                    <div class="col s6 pad-zero"><div class="col s12 center-align #d1c4e9 deep-purple lighten-4">Calorie</div><div class="col s10 m8 valign-wrapper"><input class="center-align" type="number" v-model="value.cal" @change="checkNumeric(index, \'cal\')"><span>cal</span></div></div>\n' +
    '                    <div class="col s6 pad-zero"><div class="col s12 center-align #dce775 lime lighten-2">Quantité</div><div class="col s10 m8 valign-wrapper"><input class="center-align" type="number" v-model="value.quant" @change="checkNumeric(index, \'quant\')"><span>g</span></div></div>\n' +
    '                    <div class="col s12 m4 pad-zero"><div class="col s12 center-align #aed581 light-green lighten-2">Protéines</div><div class="col s12 valign-wrapper"><input class="center-align" type="number" v-model="value.pro" @change="checkNumeric(index, \'pro\')"><span>g</span></div></div>\n' +
    '                    <div class="col s12 m4 pad-zero"><div class="col s12 center-align #a1887f brown lighten-2">Lipides</div><div class="col s12 valign-wrapper"><input class="center-align" type="number" v-model="value.lip" @change="checkNumeric(index, \'lip\')"><span>g</span></div></div>\n' +
    '                    <div class="col s12 m4 pad-zero"><div class="col s12 center-align #f06292 pink lighten-2">Glucides</div><div class="col s12 valign-wrapper"><input class="center-align" type="number" v-model="value.glu" @change="checkNumeric(index), \'glu\'"><span>g</span></div></div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div id="foods-content" class="col s12 m12 l3">\n' +
    '                <h3 class="col s12 center-align">Aliment</h3>\n' +
    '                <div class="col s12 valign-wrapper" v-for="(value,index) in $store.state.userFood">\n' +
    '                    <div class="col s2"><i v-on:click="addFoodToMeal(index)" class="fas fa-2x fa-plus-circle"></i></div>\n' +
    '                    <div class="col s10 food-desc">\n' +
    '                        <div class="col s12 center-align">{{ value.name }}</div>\n' +
    '                        <div class="col s6">Calories : {{ value.cal }} cal</div>\n' +
    '                        <div class="col s6">Quantité : {{ value.quant }} g</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <h3 class="col s12 center-align">Plat</h3>\n' +
    '                <div class="col s12 valign-wrapper" v-for="(value,index) in $store.state.userDish">\n' +
    '                    <div class="col s2"><i v-on:click="addDishToMeal(index)" class="fas fa-2x fa-plus-circle"></i></div>\n' +
    '                    <div class="col s10 food-desc">\n' +
    '                        <div class="col s12 center-align">{{ value.name }}</div>\n' +
    '                        <div class="col s6">Calories : {{ value.cal }} cal</div>\n' +
    '                        <div class="col s6">Quantité : {{ value.quant }} g</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>',
    mounted(){
        M.AutoInit();
    },
    data: function(){
        return{
            dateIndex: 6,
        }
    },
    methods: {
        //Renvoie un objet Date par a la date passée en paramètre
        returnMealsDate(date){
            var test = new Date(this.actualDate.getFullYear(), this.actualDate.getMonth(), date + 1);
            return new Date(this.actualDate.getFullYear(), this.actualDate.getMonth(), date + 1);
        },
        returnDayName(day, lang){
            if(lang === 'french'){
                return this.frenchDayName[day];
            }
        },
        returnMonthName(month, lang){
            if(lang === 'french'){
                return this.frenchMonthName[month];
            }
        },
        controlDateIndex(index){
            if(index < 0){
                return 0;
            }
            else if(index > 8){
                return 8;
            }
            else{
                return index;
            }
        },
        loadPreviousDate(){
            var index = this.controlDateIndex(this.$store.state.dateIndex - 1);
            this.$store.commit('setdateIndex', index);//dateIndex
            this.calculateTotalMeal();
        },
        loadNextDate(){
            var index = this.controlDateIndex(this.$store.state.dateIndex + 1);
            this.$store.commit('setdateIndex', index);//dateIndex
            this.calculateTotalMeal();
        },
        addFoodToMeal(index){
            var food = Object.assign({}, this.$store.state.userFood[index]);
            this.$store.commit('addItemToMeal', food);
            this.updateMeals();
        },
        addDishToMeal(index){
            var meal = Object.assign({}, this.$store.state.userDish[index]);
            this.$store.commit('addItemToMeal', meal);
            this.updateMeals();
        },
        updateMeals(){
            var self = this;
            axios.post('/update-meals',{
                mealsData: self.$store.state.mealsData[self.$store.state.dateIndex],
                userId: self.$store.state.userData.id,
                year: self.$store.state.mealsData[self.$store.state.dateIndex].date.getFullYear(),
                month: self.$store.state.mealsData[self.$store.state.dateIndex].date.getMonth() + 1,
                day: self.$store.state.mealsData[self.$store.state.dateIndex].date.getDate(),
            })
                .then(function(response){
                    //console.log(response.data);
                    self.calculateTotalMeal();
                })
                .catch(function(error){
                    //console.log(error);
                })
        },
        deleteFoodFromMeal(index){
            this.$store.commit('deleteItemFromMeal', index);
            this.updateMeals();
        },
        checkNumeric(index, key){
            //console.log(key)
            if(this.$store.state.mealsData[this.$store.state.dateIndex].meals[index][key] === '' || this.$store.state.mealsData[this.$store.state.dateIndex].meals[index][key] === null){
                this.$store.commit('setMealValue',index, key);
            }
            this.updateMeals();
        },
        resetTotalMeal(){
            this.$store.commit('resetTotalMeal');
        },
        calculateTotalMeal(){
            this.resetTotalMeal();
            this.$store.commit('calculateTotalMeal');
        },
    },
})