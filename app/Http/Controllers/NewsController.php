<?php

namespace App\Http\Controllers;

use App\News;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Requests\AddNewsRequest;

class NewsController extends Controller
{
    public function getNews($id = null){
        $news = News::all();
        if($id === null){
            return view('/admin/news')->with('news', $news);
        }
        else{
            $newsData = News::where('id', $id)->get()->first();
            return view('/admin/news')->with(['news' => $news, 'edit' => $newsData]);
        }
    }

    public function getHomeNews(){
        $news = News::take(3)->orderBy('id', 'desc')->get();

        return response()->json($news);
    }

    public function deleteNews($id){
        News::where('id', $id)->delete();
        return redirect('/admin/news');
    }

    public function editNews($id, Request $request){
        $news = News::find($id);
        $news->title = $request->title;
        $news->content = $request->content;
        $news->usr_upd = Auth::user()->id;

        $news->save();

        return redirect('/admin/news');
    }

    public function addNews(AddNewsRequest $request){
        $news = new News;
        $news->title = $request->title;
        $news->content = $request->content;
        $news->usr_cre = Auth::user()->id;

        $news->save();

        return redirect('/admin/news');
    }
}
