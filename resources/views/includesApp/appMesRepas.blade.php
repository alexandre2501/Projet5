<div v-else-if="appContent === 'mesRepas'">
    <div class="row repas-block #fafafa grey lighten-5 z-depth-2">
        <div id="date-block" class="col s12 valign-wrapper">
            <div id="previousDate" class="col s2 center-align" v-on:click="loadPreviousDate"><i class="fas fa-3x fa-chevron-circle-left"></i></div>
            <div id="nameDate" class="col s8 center-align">@{{ mealsData[dateIndex].lisibleDate }}</div>
            <div id="nextDate" class="col s2 center-align" v-on:click="loadNextDate"><i class="fas fa-3x fa-chevron-circle-right"></i></div>
        </div>
        <div id="meal-block" class="col s12">
            <div id="meals-content" class="col s12 m12 l9">
                <div class="col s12">
                    <h3 class="col s12 center-align">CONSO DU JOUR</h3>
                    <div class="col s3 center-align">Calories : @{{ totalCal }} cal</div>
                    <div class="col s3 center-align">Proteines : @{{ totalPro }} g</div>
                    <div class="col s3 center-align">Lipides : @{{ totalLip }} g</div>
                    <div class="col s3 center-align">Glucides : @{{ totalGlu }} g</div>
                </div>
                <div class="col s6 m4 l3 meal-content" v-for="(value, index) in mealsData[dateIndex].meals">
                    <h6 class="col s12 center-align">@{{ value.name }}<i class="far fa-times-circle valign-wrapper" v-on:click="deleteFoodFromMeal(index)"></i></h6>
                    <div class="col s6 pad-zero"><div class="col s12 center-align #d1c4e9 deep-purple lighten-4">Calorie</div><div class="col s10 m8 valign-wrapper"><input class="center-align" type="number" v-model="value.cal" @change="checkNumeric(index, 'cal')"><span>cal</span></div></div>
                    <div class="col s6 pad-zero"><div class="col s12 center-align #dce775 lime lighten-2">Quantité</div><div class="col s10 m8 valign-wrapper"><input class="center-align" type="number" v-model="value.quant" @change="checkNumeric(index, 'quant')"><span>g</span></div></div>
                    <div class="col s12 m4 pad-zero"><div class="col s12 center-align #aed581 light-green lighten-2">Protéines</div><div class="col s12 valign-wrapper"><input class="center-align" type="number" v-model="value.pro" @change="checkNumeric(index, 'pro')"><span>g</span></div></div>
                    <div class="col s12 m4 pad-zero"><div class="col s12 center-align #a1887f brown lighten-2">Lipides</div><div class="col s12 valign-wrapper"><input class="center-align" type="number" v-model="value.lip" @change="checkNumeric(index, 'lip')"><span>g</span></div></div>
                    <div class="col s12 m4 pad-zero"><div class="col s12 center-align #f06292 pink lighten-2">Glucides</div><div class="col s12 valign-wrapper"><input class="center-align" type="number" v-model="value.glu" @change="checkNumeric(index), 'glu'"><span>g</span></div></div>
                </div>
            </div>
            <div id="foods-content" class="col s12 m12 l3">
                <h3 class="col s12 center-align">Food</h3>
                <div class="col s12 valign-wrapper" v-for="(value,index) in userFood">
                    <div class="col s2"><i v-on:click="addFoodToMeal(index)" class="fas fa-2x fa-plus-circle"></i></div>
                    <div class="col s10 food-desc">
                        <div class="col s12 center-align">@{{ value.name }}</div>
                        <div class="col s6">Calories : @{{ value.cal }} cal</div>
                        <div class="col s6">Quantité : @{{ value.quant }} g</div>
                    </div>
                </div>
                <h3 class="col s12 center-align">Dish</h3>
                <div class="col s12 valign-wrapper" v-for="(value,index) in userDish">
                    <div class="col s2"><i v-on:click="addDishToMeal(index)" class="fas fa-2x fa-plus-circle"></i></div>
                    <div class="col s10 food-desc">
                        <div class="col s12 center-align">@{{ value.name }}</div>
                        <div class="col s6">Calories : @{{ value.cal }} cal</div>
                        <div class="col s6">Quantité : @{{ value.quant }} g</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>