<?php

namespace App\Http\Controllers;

use App\UserMeal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AjaxMealController extends Controller
{
    public function updateMeal(Request $request){

        $date = $request->year . '-' . $request->month . '-' . $request->day;
        if(!UserMeal::where(array('usr_cre' => $request->userId, 'date' => $date))->exists()){
            //INSERT
            $userMeal = new UserMeal;
            $userMeal->date = $date;
            $userMeal->content = serialize($request->mealsData);
            $userMeal->usr_cre = $request->userId;

            $userMeal->save();
        }
        else{
            $userMeal = UserMeal::where(array('usr_cre' => $request->userId, 'date' => $date))->first();
            $userMeal->content = serialize($request->mealsData);
            $userMeal->save();
        }
        return response()->json($request);
    }

    public function getUserMeal(Request $request){
        $userMeals = UserMeal::where('usr_cre', Auth::user()->id)->get();
        //unserialize($userMeals->content);
        $mealsData = [];
        foreach($userMeals as $userMeal) {
            array_push($mealsData, unserialize($userMeal->content));
        }
        return response()->json($mealsData);
    }
}
