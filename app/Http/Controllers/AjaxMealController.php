<?php

namespace App\Http\Controllers;

use App\UserMeal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AjaxMealController extends Controller
{
    public function updateMeal(Request $request){

        $date = $request->year . '-' . $request->month . '-' . $request->day;
        //$userMeal = UserMeal::where(array('id' => $request->userId, 'date' => $date))->exists();
        if(!UserMeal::where(array('id' => $request->userId, 'date' => $date))->exists()){
            //INSERT
            $userMeal = new UserMeal;
            $userMeal->date = $date;
            $userMeal->content = serialize($request->mealsData);
            $userMeal->usr_cre = $request->userId;

            $userMeal->save();
        }
        else{
            //UPDATE
        }
        var_dump($userMeal);
        return response()->json($request);
    }
}
