<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/', function () {
    return redirect('/home');
});

Route::get('/home', function(){
    return view('home');
});

Route::get('/logout', function(){
    Auth::logout();
    return redirect('/home');
});

Route::get('/login', function(){
    return redirect('/home');
});

Route::get('/app', function(){
    if(Auth::check()){
        return view('app');
    }
    else{
        return redirect('/home')->with('accessDenied', 'Vous devez être enregistrer pour accéder à cette page');
    }
});

Route::post('/password/change', 'AjaxController@changePassword');

Route::get('/testAjax', function(){
    echo 'test AJAX';
});

Route::get('/auth/avatar', 'AjaxController@getAuthAvatar');
Route::post('/upload/avatar', 'AjaxController@uploadAuthAvatar');

Route::post('/create-dish', 'AjaxDishController@createDish');

Route::get('/get-user-food', 'AjaxFoodController@getUserFood');
Route::post('/create-food', 'AjaxFoodController@createFood');

//Route::get('', 'HomeController@index')->name('home');
