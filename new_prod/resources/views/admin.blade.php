<x-app-layout>
@if (Auth::user()->admin == 1)



<?php
session_start();

// Установите значение user_id в сессионную переменную
$_SESSION['user_id'] =Auth::user()->id ;
?>


    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Admin panel') }} 
        </h2>
    </x-slot>
<link href="{{ asset('css/dashboard.css') }}" rel="stylesheet">  
    <div class="py-12">
<div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    .
                </div>
            </div>
        </div>
        
        
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                	<div class="cart_tovar_contanier">
                		
                		
<div style="margin-right:10px;">
<div class="filter_button" > 
<input type="text" id="filter_by" style="margin-bottom:5px;">
<div class="cart_del_button" id="filter_button" >Filter </div>
</div>




</div>

<div class="sort_panel" >
<div class="sort_button">
Sort by
<select name="selectOption" id="sort_select" style="margin-bottom:5px;">

  <option value="None" selected>None</option>
  <option value="Status">Status</option>
  <option value="Date">Date</option>
    <option value="Price">Order price</option>
</select>

<div class="cart_del_button" id="sort_button" >Sort </div>
</div>

</div>


                	</div>
                </div>
            </div>
        </div>
        
        
        
      
        
    </div>
    

    <div class="py-12" id="order_list">

    
    	
        
    </div>
    
    
    
    
    
    <div class="py-12">
        
        
    </div>
    
    
    
    
<script src="{{ asset('js/admin_panel.js') }}"></script> 











@else
    <div class="py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    You are not admin 
                </div>
            </div>
        </div>
    
    
    </div>
@endif


</x-app-layout>
