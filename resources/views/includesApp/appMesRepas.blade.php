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
                <div class="col s12">
                    <h3 class="col s12">CONSO DU JOUR</h3>
                    <div class="col s3">Calories : @{{ totalCal }} cal</div>
                    <div class="col s3">Proteines : @{{ totalPro }} g</div>
                    <div class="col s3">Lipides : @{{ totalLip }} g</div>
                    <div class="col s3">Glucides : @{{ totalGlu }} g</div>
                </div>
                <div class="col s3" v-for="(value, index) in mealsData[dateIndex].meals">
                    <div class="col s12">@{{ value.name }}<i class="far fa-times-circle valign-wrapper" v-on:click="deleteFoodFromMeal(index)"></i></div>
                    <div class="col s6 valign-wrapper"><input type="number" class="col s8" v-model="value.cal" @keyup="checkNumeric(index, 'cal')"><span>cal</span></div>
                    <div class="col s6 valign-wrapper"><input type="number" class="col s8" v-model="value.quant" @keyup="checkNumeric(index, 'quant')"><span>g</span></div>
                    <div class="col s4 valign-wrapper"><input type="number" class="col s8" v-model="value.pro" @keyup="checkNumeric(index, 'pro')"><span>g</span></div>
                    <div class="col s4 valign-wrapper"><input type="number" class="col s8" v-model="value.lip" @keyup="checkNumeric(index, 'lip')"><span>g</span></div>
                    <div class="col s4 valign-wrapper"><input type="number" class="col s8" v-model="value.glu" @keyup="checkNumeric(index), 'glu'"><span>g</span></div>
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