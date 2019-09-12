@extends('admin/adminTemplate')

@section('contenu')
    <script>
    @if(isset($edit))
            var data = <?php echo json_encode($edit) ?>;
    tinymce.init({
        selector: '#add_news',
        setup: function(editor){
            editor.on('init', function(){
                editor.setContent(data.content);
            })
        }
    });
    @else
        tinymce.init({
            selector: '#add_news',
        });
    @endif
    </script>
    <div id="app_content" class="col s12 l10 offset-l2 #eeeeee grey lighten-3">
        <div class="app-box z-depth-2 #e3f2fd blue lighten-5">
            <div class="row flex" id="">
                <div id="" class="col s12 m12 l12">
                    <div class="#fafafa grey lighten-5 content_blocks z-depth-2">
                        <h3>Créer un nouvelle article</h3>
                        @if(isset($edit))
                            {{ Form::open(array('url' => '/admin/editNews/'.$edit->id)) }}
                            <div class="input-field">
                                {{ Form::text('title', $edit->title) }}
                        @else
                            {{ Form::open(array('url' => '/admin/postNews')) }}
                            <div class="input-field">
                                {{ Form::text('title') }}
                        @endif
                        {{ Form::label('title', 'Titre') }}
                        </div>
                        {{ Form::textarea('content', null,['id' => 'add_news']) }}
                        {{ Form::submit('Envoyer', ['class' => 'btn']) }}
                        {{ Form::close() }}
                    </div>
                    <div>
                        @foreach ($news as $new)
                            <div class="col m4 s12 news-block">
                                <div class="news-block-content">
                                    <h6>{{ $new->title }}</h6>
                                    <div class="news-desc">
                                        <div>{!! $new->content !!}</div>
                                        <div>{{ $new->created_at }}</div>
                                    </div>
                                    <div class="center-align">
                                        <button class="btn crud-btn"><a href="/admin/deleteNews/{{ $new->id }}">Supprimer</a></button>
                                        <button class="btn crud-btn"><a href="/admin/news/{{ $new->id }}">Modifier</a></button>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection