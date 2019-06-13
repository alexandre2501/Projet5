<div v-else-if="appContent === 'mesRepas'">
    <h2>Mes Repas</h2>
    <div class="row repas-block">
        <div id="date-block" class="col s12 valign-wrapper">
            <div id="previousDate" class="col s2 center-align" v-on:click="loadPreviousDate"><i class="fas fa-3x fa-chevron-circle-left"></i></div>
            <div id="nameDate" class="col s8 center-align">@{{ mealsData[dateIndex].lisibleDate }}</div>
            <div id="nextDate" class="col s2 center-align" v-on:click="loadNextDate"><i class="fas fa-3x fa-chevron-circle-right"></i></div>
        </div>
        <div id="meal-block" class="col s12">
            <div id="meals-content" class="col s9">
                <div class="col s3" v-for="(value, index) in mealsData[dateIndex].meals">
                    <div class="col s12">@{{ value.name }}<i class="far fa-times-circle valign-wrapper" v-on:click="deleteFoodFromMeal(index)"></i></div>
                    <div class="col s6">@{{ value.cal }} cal</div>
                    <div class="col s6"><input type="number" class="col s6" v-model="value.quant" @keyup="checkNumeric(index)"><span>g</span></div>
                    <div class="col s4">@{{ value.pro }} g</div>
                    <div class="col s4">@{{ value.lip }} g</div>
                    <div class="col s4">@{{ value.glu }} g</div>
                </div>
                <div class="col s12 center-align">
                    <button v-on:click="updateMeals">Confirmer</button>
                </div>
            </div>
            <div id="foods-content" class="col s3">
                <h6>Food</h6>
                <div class="col s12 valign-wrapper" v-for="(value,index) in userFood">
                    <div class="col s2"><i v-on:click="addFoodToMeal(index)" class="fas fa-2x fa-plus-circle"></i></div>
                    <div class="col s10">
                        <p></p>
                        <div class="col s12 center-align">@{{ value.name }}</div>
                        <div class="col s6">Calories : @{{ value.cal }} cal</div>
                        <div class="col s6">Quantité : @{{ value.quant }} g</div>
                    </div>
                </div>
                <h6>Dish</h6>
                <div class="col s12 valign-wrapper" v-for="(value,index) in userDish">
                    <div class="col s2"><i v-on:click="addDishToMeal(index)" class="fas fa-2x fa-plus-circle"></i></div>
                    <div class="col s10">
                        <div class="col s12 center-align">@{{ value.name }}</div>
                        <div class="col s6">Calories : @{{ value.cal }} cal</div>
                        <div class="col s6">Quantité : @{{ value.quant }} g</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>