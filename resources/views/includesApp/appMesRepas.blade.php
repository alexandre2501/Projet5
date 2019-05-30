<div v-else-if="appContent === 'mesRepas'">
    <h2>Mes Repas</h2>
    <div class="row">
        <div id="dateBlock" class="col s12">
            <div id="previousDate" class="col s2" v-on:click="loadPreviousDate">Previous</div>
            <div id="nameDate" class="col s8">@{{ mealsData[dateIndex].lisibleDate }}</div>
            <div id="nextDate" class="col s2" v-on:click="loadNextDate">Next</div>
        </div>
        <div id="mealBlock" class="col s12">
            <div id="mealsContent" class="col s9">Meals</div>
            <div id="foodsContent" class="col s3">Foods</div>
        </div>
    </div>
</div>