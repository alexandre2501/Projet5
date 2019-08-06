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

Route::post('/login-ajax', 'Auth\LoginController@tryLogin');
Route::post('/register-ajax', 'Auth\RegisterController@register');

Route::get('/app', function(){
    if(Auth::check()){
        return view('app');
    }
    else{
        return redirect('/home')->with('accessDenied', 'Vous devez être enregistrer pour accéder à cette page');
    }
});

Route::middleware(['auth', 'checkAdmin'])->group(function(){
   Route::get('/admin', function(){
      return view('admin/home');
   });
   Route::get('/admin/home', function(){
      return  view('admin/home');
   });
    Route::get('/admin/news', function(){
        return  view('admin/news');
    });
    Route::post('/admin/postNews', 'NewsController@addNews');
});

Route::post('/password/change', 'AjaxController@changePassword');

Route::get('/testAjax', function(){
    echo 'test AJAX';
});

Route::get('/auth/data', 'AjaxController@getAuthData');
Route::post('/upload/avatar', 'AjaxController@uploadAuthAvatar');

Route::get('/get-user-dish', 'AjaxDishController@getUserDish');
Route::post('/create-dish', 'AjaxDishController@createDish');
Route::post('/delete-dish', 'AjaxDishController@deleteDish');
Route::post('/update-dish', 'AjaxDishController@updateDish');

Route::get('/get-user-food', 'AjaxFoodController@getUserFood');
Route::post('/create-food', 'AjaxFoodController@createFood');
Route::post('/delete-food', 'AjaxFoodController@deleteFood');
Route::post('/update-food', 'AjaxFoodController@updateFood');

Route::post('/update-meals', 'AjaxMealController@updateMeal');
Route::get('/get-user-meal', 'AjaxMealController@getUserMeal');

//Route::get('', 'HomeController@index')->name('home');
