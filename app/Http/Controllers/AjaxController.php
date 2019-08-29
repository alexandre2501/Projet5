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
use Illuminate\Support\Facades\File;

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

    public function getAuthData(){
        $avatar = Auth::user()->avatar;
        $id = Auth::user()->id;
        $login = Auth::user()->name;
        $data = array('avatar' => $avatar, 'id' => $id, 'login' => $login);

        return response()->json($data);
    }

    public function uploadAuthAvatar(Request $request){
        $oldPath = 'avatars/' . Auth::user()->avatar;
        $img = Image::make($request->file('avatar')->getPathname());
        $img->resize(200, 200);
        $path = 'avatars/' . Auth::user()->id . date('YmdHis') . '.png';
        $img->save(public_path($path));
        File::delete($oldPath);
        $user = User::where('name', Auth::user()->name);
        $user->update([
            'avatar' => Auth::user()->id . date('YmdHis') . '.png',
        ]);
    }
}
