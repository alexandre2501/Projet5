<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UserDish;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CreateDishRequest;

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
        $userDish->usr_cre = Auth::user()->id;

        $userDish->save();

        return response()->json();
    }
}
