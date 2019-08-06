<?php

namespace App\Http\Controllers;

use App\News;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Requests\AddNewsRequest;

class NewsController extends Controller
{
    public function addNews(AddNewsRequest $request){
        $news = new News;
        $news->title = $request->title;
        $news->content = $request->content;
        $news->usr_cre = Auth::user()->id;

        $news->save();

        return view('/admin/news');
    }
}
