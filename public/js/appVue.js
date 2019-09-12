var modelFoodError = {
    foodNameError: '',
    foodCalError: '',
    foodQuantError: '',
    foodProError: '',
    foodLipError: '',
    foodGluError: '',
}

var modelDishError = {
    dishNameError: '',
    dishCalError: '',
    dishQuantError: '',
    dishProError: '',
    dishLipError: '',
    dishGluError: '',
}

var modelFoodToUpdate = {
    name: '',
    cal: '',
    quant: '',
    pro: '',
    lip: '',
    glu: '',
};

var modelDishToUpdate = {
    name: '',
    cal: '',
    quant: '',
    pro: '',
    lip: '',
    glu: '',
};

const store = new Vuex.Store({
    state: {
        env: '',
        currentRoute: '/acceuil',
        //User Data
        userData: '',
        userAvatarLink: '',
        userDish: [],
        userFood: [],
        content: '',
        contentHtml: '<p>coucou</p>',
        appContent: 'accueil',
        csrfToken: document.head.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        //Changement de mot de passe
        passRegex: '^((?=\\S*?[a-z]).{7,})\\S$',
        passChangeBtn: 1,
        passMsg: '',
        test: null,
        //Page Ma Nourriture
        myFood: 'myMeal',
        //Format du formulaire nourriture (update or create)
        foodFormState: '',
        //Erreur formulaire ajout de nourriture
        foodFormError: Object.assign({}, modelFoodError),
        //Objet nourriture à update
        foodToUpdate: '',
        //Format du formulaire plat (update or create)
        dishFormState: '',
        //Erreur formulaire ajout de plat
        dishFormError: Object.assign({}, modelDishError),
        //Objet plat à update
        dishToUpdate: '',
        //Page Mes Repas
        //On stock la date du jour pour construire le calendrier des repas
        frenchDayName: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        frenchMonthName: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        actualDate: new Date(),
        dateIndex: 6,
        mealsData: [],
        mealTotal: {
            cal: 0,
            pro: 0,
            lip: 0,
            glu: 0,
        },
    },
    mutations: {
        setEnv(state, env){
            state.env = env;
        },
        setUserData(state, data){
            state.userData = data;
        },
        setUserAvatarLink(state, link){
            state.userAvatarLink = link;
        },
        setUserFood(state, data){
            state.userFood = data;
        },
        setUserDish(state, data){
            state.userDish = data;
        },
        deleteFood(state, index){
            Vue.delete(state.userFood, index);
        },
        deleteDish(state, index){
            Vue.delete(state.userDish, index);
        },
        resetFoodFormError(state){
            state.foodFormError = Object.assign({}, modelFoodError);
        },
        resetDishFormError(state){
            state.dishFormError = Object.assign({}, modelDishError);
        },
        setFoodFormError(state, error){
            state.foodFormError[error.error] = error.msg;
        },
        setDishFormError(state, error){
            state.dishFormError[error.error] = error.msg;
        },
        getUserMeal(){

        },
        setMealsData(state, obj){
          state.mealsData.push(obj);
        },
        setdateIndex(state, index){
            state.dateIndex = index;
        },
        setMealValue(state, index, key){
            state.mealsData[state.dateIndex].meals[index][key] = 0;
        },
        addItemToMeal(state, item){
            state.mealsData[state.dateIndex].meals.push(item);
        },
        deleteItemFromMeal(state, index){
            Vue.delete(state.mealsData[state.dateIndex].meals, index);
        },
        resetTotalMeal(state){
            state.mealTotal.cal = 0;
            state.mealTotal.pro = 0;
            state.mealTotal.lip = 0;
            state.mealTotal.glu = 0;
        },
        calculateTotalMeal(state) {
            for(index in state.mealsData[state.dateIndex].meals){
                var meal = state.mealsData[state.dateIndex].meals[index];
                state.mealTotal.cal += parseInt(meal.cal);
                state.mealTotal.pro += parseInt(meal.pro);
                state.mealTotal.lip += parseInt(meal.lip);
                state.mealTotal.glu += parseInt(meal.glu);
            }
        },
    }
})

const routes = [
    { path: '/', component: Home},
    { path: '/accueil', component: Home},
    { path: '/article/:id', component: Article, name: 'article'},
    { path: '/profil', component: Profil},
    { path: '/food', component: Food,
        children: [
            {
                path: 'MyFood',
                component: MyFood,
            },
            {
                path: 'MyDish',
                component: MyDish,
            },
            {
                path: 'AddFood',
                component: AddFood,
            },
            {
                path: 'AddDish',
                component: AddDish,
            },
        ]
    },
    { path: '/meal', component: Meal},
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    el: '#app',
    router,
    store,
    mounted(){
        window.axios.defaults.headers.common['X-CSRF-TOKEN'] = this.csrfToken;
        M.AutoInit();
        this.setEnv();
        this.setUserData();
        this.getUserFood();
        this.getUserDish();
        this.getUserMeal();
    },
    data: {
        csrfToken: document.head.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        //Page Mes Repas
        //On stock la date du jour pour construire le calendrier des repas
        frenchDayName: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        frenchMonthName: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        actualDate: new Date(),
    },
    methods:{
        findWithAttr(array, attr, value){
            for(var i = 0; i < array.length; i += 1) {
                if(array[i][attr] === value) {
                    return i;
                }
            }
            return -1;
        },
        setEnv(){
          var env = window.location.href;
          env = env.substr(7);
          var id = env.search('/');
          env = env.substr(0,id);
          this.$store.commit('setEnv', env);//.env = env;
        },
        setUserData(){
            axios.get('/auth/data',{
                headers: {
                    'Content-Type' : 'application/json; charset=UTF-8',
                }
            })
                .then(function(response){
                    this.$store.commit('setUserData', response.data)//.userData = response.data;
                    var link = 'http://' + this.$store.state.env + '/avatars/' + this.$store.state.userData.avatar;
                    this.$store.commit('setUserAvatarLink', link)//.userAvatarLink = 'http://' + this.env + '/avatars/' + this.userData.avatar;
                }.bind(this))
                .catch(function(error){
                    //console.log(error);
                })
        },
        setMealsDate(data){
            for(var i = -7; i != 2; i++){
                var obj = {
                    date: this.returnMealsDate(this.actualDate.getDate() + i),
                };
                obj.dayName = this.returnDayName(obj.date.getDay(), 'french');
                obj.monthName = this.returnMonthName(obj.date.getMonth(), 'french');
                obj.lisibleDate = obj.dayName + ' ' + obj.date.getDate() + ' ' + obj.monthName;
                var index = this.findWithAttr(data, 'lisibleDate', obj.lisibleDate);
                if(index != -1){
                    obj.meals = data[index].meals;
                }
                else{
                    obj.meals = [];
                }
                this.$store.commit('setMealsData', obj);
            }
            this.$store.commit('calculateTotalMeal');
        },
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
        getUserDish(){
            axios.get('/get-user-dish')
                .then(function(response){
                    this.$store.commit('setUserDish', response.data);//userDish = response.data;
                }.bind(this))
                .catch(function(error){
                    //console.log(error)
                })
        },
        getUserFood(){
            axios.get('/get-user-food')
                .then(function(response){
                    this.$store.commit('setUserFood', response.data);//userFood = response.data;
                }.bind(this))
                .catch(function(error){
                    //console.log(error)
                })
        },
        getUserMeal(){
            axios.get('/get-user-meal')
                .then(function(response){
                    //console.log('coucou')
                    this.setMealsDate(response.data);
                    //this.calculateTotalMeal();
                }.bind(this))
                .catch(function(error){
                    //console.log(error);
                })

        },
    },
})
