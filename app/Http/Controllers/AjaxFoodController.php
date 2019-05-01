<?php

namespace App\Http\Controllers;

use App\UserFood;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CreateFoodRequest;

class AjaxFoodController extends Controller
{
    public function createFood(CreateFoodRequest $request){
        $userFood = new UserFood;
        $userFood->name = $request->foodName;
        $userFood->cal = $request->foodCal;
        $userFood->pro = $request->foodPro;
        $userFood->lip = $request->foodLip;
        $userFood->glu = $request->foodGlu;
        $userFood->usr_cre = Auth::user()->id;

        $userFood->save();

        return response()->json();
    }
}
