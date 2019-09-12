const Food = Vue.component('Food',{
    template: '<div class="row flex" id="myFood_block">\n' +
    '    <div class="#fafafa grey lighten-5 z-depth-2 col s12">\n' +
    '        <div class="col s12 pad-zero">\n' +
    '            <router-link to="/food/MyDish"><button class="waves-effect waves-light btn-large col s6 m6 l3">Mes plats</button></router-link>\n' +
    '            <router-link to="/food/MyFood"><button class="waves-effect waves-light btn-large col s6 m6 l3">Mes aliments</button></router-link>\n' +
    '            <router-link to="/food/AddDish"><button class="waves-effect waves-light btn-large col s12 m6 l3">Ajouter un plat</button></router-link>\n' +
    '            <router-link to="/food/AddFood"><button class="waves-effect waves-light btn-large col s12 m6 l3">Ajouter un aliment</button></router-link>\n' +
    '        </div>\n' +
    '<router-view v-on:deleteFood="deleteFood($event)"' +
    '             v-on:fillUpdateFood="fillUpdateFood($event)" ' +
    '             v-on:deleteDish="deleteDish($event)" ' +
    '             v-on:fillUpdateDish="fillUpdateDish($event)" ' +
    '             v-on:updateFood="updateFood" ' +
    '             v-on:createFood="createFood" ' +
    '             v-on:updateDish="updateDish" ' +
    '             v-on:createDish="createDish" ' +
    '             v-bind:foodToUpdate="foodToUpdate" v-bind:foodFormState="foodFormState" v-bind:dishFormState="dishFormState" v-bind:dishToUpdate="dishToUpdate"></router-view>' +
    '    </div>\n' +
    '</div>',
    mounted(){
        M.AutoInit();
    },
    data: function(){
        return{
            myFood: null,
            dishFormState: '',
            dishToUpdate: {
                name: '',
                cal: '',
                quant: '',
                pro: '',
                lip: '',
                glu: '',
            },
            foodFormState: '',
            foodToUpdate: {
                name: '',
                cal: '',
                quant: '',
                pro: '',
                lip: '',
                glu: '',
            },
        }
    },
    methods: {
        loadMyFood(option){
            this.myFood = option;
            this.dishFormState = '';
            this.dishToUpdate = Object.assign({}, modelDishToUpdate);
            this.foodFormState = '';
            this.foodToUpdate = Object.assign({}, modelFoodToUpdate);
            if(option === 'myFood'){
                this.$parent.getUserFood();
            }
            else if(option === 'myDish'){
                this.$parent.getUserDish();
            }
        },
        fillUpdateFood(index){
            this.$router.push('/food/AddFood')
            this.myFood = 'addFood';
            this.foodFormState ='update';
            this.foodToUpdate = this.$store.state.userFood[index];
        },
        fillUpdateDish(index){
            this.$router.push('/food/AddDish')
            this.myFood = 'addDish';
            this.dishFormState ='update';
            this.dishToUpdate = this.$store.state.userDish[index];
        },
        deleteFood(index){
            //console.log(index);
            var self = this;
            var id = this.$store.state.userFood[index].id;
            axios.post('/delete-food',{
                foodId: id,
                userId: self.$store.state.userData.id,
            })
                .then(function(response){
                    //console.log(response.data);
                    self.$store.commit('deleteFood', index);
                })
                .catch(function(error){
                    //console.log(error);
                })
        },
        deleteDish(index){
            var self = this;
            var id = this.$store.state.userDish[index].id;
            //console.log(index);
            axios.post('/delete-dish',{
                dishId: id,
                userId: self.$store.state.userData.id,
            })
                .then(function(response){
                    //console.log(response.data);
                    self.$store.commit('deleteDish', index);
                })
                .catch(function(error){
                    //console.log(error);
                })
            //console.log(this.userDish)
        },
        createFood(){
            var formElt = document.getElementById('add-food-form');
            var formData = new FormData(formElt);
            axios.post('/create-food',
                formData
                ,{
                    headers: {
                        //'content-type': 'multipart/form-data',
                    }
                })
                .then(function(response){
                    this.$router.push('/food/MyFood');
                    this.$parent.getUserFood();
                }.bind(this))
                .catch(function(error){
                    this.cleanseErrorMsg('food');
                    //console.log(error.response.data.errors)
                    for(key in error.response.data.errors){
                        this.showResponseError('food', key, error.response.data.errors[key][0]);
                    }
                }.bind(this))
        },
        createDish(){
            var formElt = document.getElementById('add-dish-form');
            var formData = new FormData(formElt);
            axios.post('/create-dish',
                formData
                ,{
                    headers: {
                        //'content-type': 'multipart/form-data',
                    }
                })
                .then(function(response){
                    this.$router.push('/food/MyDish');
                    this.$parent.getUserDish();
                }.bind(this))
                .catch(function(error){
                    this.cleanseErrorMsg('dish');
                    for(key in error.response.data.errors){
                        this.showResponseError('dish', key, error.response.data.errors[key][0]);
                    }
                }.bind(this))
        },
        updateFood(){
            var self = this;
            axios.post('/update-food',
                self.foodToUpdate
                ,{
                    headers: {
                        //'content-type': 'multipart/form-data',
                    }
                })
                .then((response)=>{
                    this.$router.push('/food/MyFood');
                    this.$parent.getUserFood();
                    this.foodToUpdate = '';
                    this.foodFormState = '';
                })
                .catch(function(error){
                    self.cleanseErrorMsg('food');
                    for(key in error.response.data.errors){
                        var keyUpper = key.charAt(0).toUpperCase() + key.slice(1)
                        var adjustedKey = 'food' + keyUpper;
                        self.showResponseError('food', adjustedKey, error.response.data.errors[key][0]);
                    }
                })
        },
        updateDish(){
            var self = this;
            axios.post('/update-dish',
                self.dishToUpdate
                ,{
                    headers: {
                        //'content-type': 'multipart/form-data',
                    }
                })
                .then(function(response){
                    this.$router.push('/food/MyDish');
                    this.$parent.getUserDish();
                    self.dishToUpdate = '';
                    self.dishFormState = '';
                })
                .catch(function(error){
                    self.cleanseErrorMsg('dish');
                    //console.log(error.response.data.errors)
                    for(key in error.response.data.errors){
                        var keyUpper = key.charAt(0).toUpperCase() + key.slice(1)
                        var adjustedKey = 'dish' + keyUpper;
                        self.showResponseError('dish', adjustedKey, error.response.data.errors[key][0]);
                    }
                })
        },
        cleanseErrorMsg(form){
            if(form === 'food'){
                this.$store.commit('resetFoodFormError');
            }
            else if(form === 'dish'){
                this.$store.commit('resetDishFormError');
            }
        },
        showResponseError(form, key, msg){
            var error = key + 'Error';
            var obj = {
                error: error,
                msg: msg,
            }
            if(form === 'food'){
                this.$store.commit('setFoodFormError', obj);
            }
            else if(form === 'dish'){
                //console.log(error)
                //console.log(msg)
                this.$store.commit('setDishFormError', obj);
            }
        },
    },
})