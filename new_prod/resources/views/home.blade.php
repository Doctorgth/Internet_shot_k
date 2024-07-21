<!-- resources/views/other-page.blade.php -->

@extends('layouts.homelayout')

@section('content')
<link href="{{ asset('css/base.css') }}" rel="stylesheet">    
<div id="info_baner">

</div>

<div class="main_content">
<div class="categories_panel">
<div class="categories_button" id=0> all</div>
<?php

$response= app()->make('App\Http\Controllers\CategoryController')->index();

$content = $response->getContent();

// Преобразование JSON-строки в массив PHP
//$data = json_decode($content, true);
//echo($content);
$content = json_decode($content, true);
foreach ($content as $element) {
    echo '<div class="categories_button" id="' . $element['id'] . '">' . $element['name'] . '</div>';
}

?>
</div>


<div class="filter_panel">
<div class="filter_button" > 
<input type="text" id="filter_by">
<div class="filter_button" id="filter_button" >Filter </div>
</div>


</div>

<div class="sort_panel">
<div class="sort_button">
Sort by
<select name="selectOption" id="sort_select">

  <option value="None" selected>None</option>
  <option value="Price">Price</option>
  <option value="Name">Name</option>
</select>

<div class="sort_button" id="sort_button" >Sort </div>
</div>

</div>






<div class="tovar_panel" id="tovar_panel">







</div>
<div class="page_panel">
<div class="page_button" id="prev">&lt;</div>
<div id="page_button" class="page_button_numbers"></div>
<div class="page_button" id="next">&gt;</div>

</div>
<div class="test"></div>




</div>
    
 <script src="{{ asset('js/home.js') }}" defer></script>   
 @auth 
 <script src="{{ asset('js/home_avt.js') }}" defer></script> 
 @endauth 
@endsection
