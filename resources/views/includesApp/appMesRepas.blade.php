<div v-else-if="appContent === 'mesRepas'">
    <h2>Mes Repas</h2>
    <div class="row repas-block">
        <div id="date-block" class="col s12 valign-wrapper">
            <div id="previousDate" class="col s2 center-align" v-on:click="loadPreviousDate"><i class="fas fa-3x fa-chevron-circle-left"></i></div>
            <div id="nameDate" class="col s8 center-align">@{{ mealsData[dateIndex].lisibleDate }}</div>
            <div id="nextDate" class="col s2 center-align" v-on:click="loadNextDate"><i class="fas fa-3x fa-chevron-circle-right"></i></div>
        </div>
        <div id="meal-block" class="col s12">
            <div id="meals-content" class="col s9">Meals</div>
            <div id="foods-content" class="col s3">Foods</div>
        </div>
    </div>
</div>