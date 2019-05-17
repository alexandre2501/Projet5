<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UserDish;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CreateDishRequest;
use App\Http\Requests\UpdateDishRequest;

class AjaxDishController extends Controller
{

    public function getUserDish(Request $request){
        $userDish = UserDish::where('usr_cre', Auth::user()->id)->get();

        return response()->json($userDish);
    }
    
    public function createDish(CreateDishRequest $request){
        $userDish = new UserDish;
        $userDish->name = $request->dishName;
        $userDish->cal = $request->dishCal;
        $userDish->pro = $request->dishPro;
        $userDish->lip = $request->dishLip;
        $userDish->glu = $request->dishGlu;
        $userDish->quant = $request->dishQuant;
        $userDish->usr_cre = Auth::user()->id;

        $userDish->save();

        return response()->json();
    }

    public function deleteDish(Request $request){
        UserDish::where(array('usr_cre' => $request->userId, 'id' => $request->dishId))->delete();

        return response()->json();
    }

    public function updateDish(UpdateDishRequest $request){
        $userDish = UserDish::find($request->id);
        $userDish->name = $request->name;
        $userDish->cal = $request->cal;
        $userDish->pro= $request->pro;
        $userDish->lip = $request->lip;
        $userDish->glu= $request->glu;
        $userDish->quant = $request->quant;
        $userDish->save();

        return response()->json();
    }

}
