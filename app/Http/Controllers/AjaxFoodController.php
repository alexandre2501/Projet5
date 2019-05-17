<?php

namespace App\Http\Controllers;

use App\UserFood;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CreateFoodRequest;
use App\Http\Requests\UpdateFoodRequest;

class AjaxFoodController extends Controller
{

    public function getUserFood(Request $request){
        $userFood = UserFood::where('usr_cre', Auth::user()->id)->get();

        return response()->json($userFood);
    }

    public function createFood(CreateFoodRequest $request){
        $userFood = new UserFood;
        $userFood->name = $request->foodName;
        $userFood->cal = $request->foodCal;
        $userFood->pro = $request->foodPro;
        $userFood->lip = $request->foodLip;
        $userFood->glu = $request->foodGlu;
        $userFood->quant = $request->foodQuant;
        $userFood->usr_cre = Auth::user()->id;

        $userFood->save();

        return response()->json();
    }

    public function deleteFood(Request $request){
        UserFood::where(array('id' => $request->foodId, 'usr_cre' => $request->userId))->delete();

        return response()->json();
    }

    public function updateFood(UpdateFoodRequest $request){
        $userFood = UserFood::find($request->id);
        $userFood->name = $request->name;
        $userFood->cal = $request->cal;
        $userFood->pro= $request->pro;
        $userFood->lip = $request->lip;
        $userFood->glu= $request->glu;
        $userFood->quant = $request->quant;
        $userFood->save();

        return response()->json();
    }

}
