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
        for($i = 0; $i < 3; $i++){
            $news[$i]->content = $this->makeDesc(200, $news[$i]->content);
        }
        return response()->json($news);
    }

    private function makeDesc($length, $content){
        $totalLength = 0;
        $desc = [];
        $explode = strip_tags($content);
        $array = explode(' ', $explode);
        foreach($array as $key=>$value){
            array_push($desc, $value);
            $totalLength = $totalLength + strlen($value);
            if($totalLength >= $length){
                break;
            }
        }
        array_push($desc, '...');
        $desc = implode(' ', $desc);
        return $desc;
    }

    public function getArticle(Request $request){
        $article = News::where('id', $request->id)->get();

        return response()->json($article);
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
