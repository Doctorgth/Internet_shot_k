<link href="{{ asset('css/create.css') }}" rel="stylesheet"> 
<?php
session_start();
$_SESSION['user_id']=Auth::user()->id ;
        $id=$_SESSION['user_id'];


?>
<div class="panel_cont">

<form class="form_bg" action="/api/categories" method="post">
<div class="form_title">Categories</div>

<div class="from_input_cont">
<div class="form_input_text">Name</div>
<input class="form_input_input" type="text" name="name">
</div>

<div class="from_input_cont">
<div class="form_input_text">Send</div>
<input class="form_input_input" type="submit" value="Submit">
</div>
</form>


<form class="form_bg" action="/api/products" method="post">
<div class="form_title">Products</div>

<div class="from_input_cont">
<div class="form_input_text">Price</div>
<input class="form_input_input" type="text" name="price">
</div>

<div class="from_input_cont">
<div class="form_input_text">Count</div>
<input class="form_input_input" type="text" name="count">
</div>


<div class="from_input_cont">
<div class="form_input_text">Name</div>
<input class="form_input_input" type="text" name="name">
</div>



<div class="from_input_cont">
<div class="form_input_text">Category id</div>
<input class="form_input_input" type="text" name="id_category">
</div>


<div class="from_input_cont">
<div class="form_input_text">Send</div>
<input class="form_input_input" type="submit" value="Submit">
</div>
</form>




<form class="form_bg" action="/api/userapi/admin_set" method="post">
<div class="form_title">Set admin</div>

<div class="from_input_cont">
<div class="form_input_text">User id</div>
<input class="form_input_input" type="text" name="id">
</div>

<div class="from_input_cont">
<div class="form_input_text">Status (1==admin 0==user)</div>
<input class="form_input_input" type="text" name="status">
</div>


<div class="from_input_cont">
<div class="form_input_text">Send</div>
<input class="form_input_input" type="submit" value="Submit">
</div>
</form>


<form class="form_bg" action="api/userapi/balance" method="post">
<div class="form_title">Change balance</div>



<div class="from_input_cont">
<div class="form_input_text">New balance</div>
<input class="form_input_input" type="text" name="balance">
</div>


<div class="from_input_cont">
<div class="form_input_text">Send</div>
<input class="form_input_input" type="submit" value="Submit">
</div>
</form>




</div>
