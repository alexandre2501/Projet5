@extends('admin/adminTemplate')

@section('contenu')
    <script>
        tinymce.init({
            selector: '#add_news'
        });
    </script>
    <div id="app_content" class="col s12 l10 offset-l2 #eeeeee grey lighten-3">
        <div class="app-box z-depth-2 #e3f2fd blue lighten-5">
            <div class="row flex" id="">
                <div id="" class="col s12 m12 l12">
                    <div class="#fafafa grey lighten-5 content_blocks z-depth-2">
                        <h3>Créer un nouvelle article</h3>
                        {{ Form::open(array('url' => '/admin/postNews')) }}
                        <div class="input-field">
                        {{ Form::text('title') }}
                        {{ Form::label('title', 'Titre') }}
                        </div>
                        {{ Form::textarea('content', null,['id' => 'add_news']) }}
                        {{ Form::submit('Envoyer', ['class' => 'btn']) }}
                        {{ Form::close() }}
                        <!--<form method="post" action="">
                            <div class="input-field col s12">
                                <input id="news_title" type="text" name="title">
                                <label for="news_title">Titre</label>
                            </div>
                            <textarea id="add_news">Hello, World!</textarea>
                            <button class="btn" type="submit">Envoyer</button>
                        </form>-->
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection