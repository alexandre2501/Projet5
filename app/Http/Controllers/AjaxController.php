<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use App\User;
use Illuminate\Http\Request;
use App\Http\Requests\ChangePassRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Facades\Input;

class AjaxController extends Controller
{

    private function setReturnData($key, $value){
        $returnData = [
            'success' => null,
            'error' => null,
        ];

        $returnData[$key] = $value;

        return $returnData;
    }

    public function changePassword(ChangePassRequest $request){
        if(Hash::check($request->input('oldPass'), Auth::user()->password)){

            $user = User::where('name', Auth::user()->name);

            //$user->password = Hash::make($request->input('newPass'));

            $user->update([
                'password' => Hash::make($request->input('newPass')),
            ]);

            return response()->json($this->setReturnData('success', 'Votre mot de passe a été modifié.'));

        }
        else{
            return response()->json($this->setReturnData('error', 'Votre mot de passe est incorrecte.'));
        }
    }

    public function getAuthAvatar(){
        $avatar = Auth::user()->avatar;

        return response()->json($avatar);
    }

    public function uploadAuthAvatar(Request $request){
        //var_dump($request->file('avatar')->getPathname());
        //dd($_FILES);
        /*Storage::disk('public/avatars')->put($request->avatar, 'Contents');
        $user = User::where('name', Auth::user()->name);
        $user->update([
            'avatar' => $request->avatar,
        ]);
        // open an image file
        $path = '/storage/app/public/avatars/' . $request->avatar;
        var_dump($path);*/
        $img = Image::make($request->file('avatar')->getPathname());
        $img->resize(320, 240);
        $img->save(public_path('avatars/' . Auth::user()->id . '.png'));
        $user = User::where('name', Auth::user()->name);
        $user->update([
            'avatar' => Auth::user()->id . '.png',
        ]);
    }
}
