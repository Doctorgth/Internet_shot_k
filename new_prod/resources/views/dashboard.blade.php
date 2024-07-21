<x-app-layout>
<div class="info_plate" id="info_plate">

</div>
<?php
session_start();

// Установите значение user_id в сессионную переменную
$_SESSION['user_id'] =Auth::user()->id ;
?>
<script>
const urlParams = new URLSearchParams(window.location.search);
const view = urlParams.get('view');

// Проверяем, существует ли параметр view
if (!view) {
    // Если параметр не существует, устанавливаем его в значение "cart"
    window.location.search = urlParams.toString() + (urlParams.toString() ? '&' : '?') + 'view=cart';
}
</script>

    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Personal account') }}
        </h2>
    </x-slot>
<link href="{{ asset('css/dashboard.css') }}" rel="stylesheet">  
    <div class="py-12">
    <?php
if (isset($_GET['view']) && $_GET['view'] === 'cart') {
    // Выводим "test"
    echo '<div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    If the cart is empty, go to it from the tab where you added the items. 
                </div>
            </div>
        </div>
        
        
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                	<div class="cart_tovar_contanier">
                		
                		<div class="tovar_text_contanier">Order amount: <div id="amount_sum" style="margin-left:5px;"> 5$ </div></div>
                		<div class="order_button" id="pos" onclick="createOrderByCart()">Make an order </div>
                	</div>
                </div>
            </div>
        </div>
        
        
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                	<div class="cart_tovar_contanier">
                		
                		
                		<a href="?view=order" class="order_button">Go to orders</a>
                	</div>
                </div>
            </div>
        </div>
        
        ';
    
    
}
?>  

@if(request()->has('view') && request('view') === 'order')
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    sort by placeholder 
                </div>
            </div>
        </div>
        
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                	<div class="cart_tovar_contanier">
                		
                		
                		<a href="?view=cart" class="order_button">Go to cart</a>
                	</div>
                </div>
            </div>
        </div>
@endif
       
       
@if(request()->has('view') && request('view') === 'orderN')
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    
                    
                    <div class="cart_tovar_contanier">
                		
                		<div class="tovar_text_contanier">Order № {{request('pos')}} </div>
                		@if(request()->has('adm') && request('adm') === '1')
                		<a href="admin" class="order_button">back to orders</a>
                		@else
                		<a href="?view=order" class="order_button">back to orders</a>
                		@endif
                		
                	</div>
                	
                	
                </div>
            </div>
        </div>
@endif
        
      
        
    </div>
    
@if(request()->has('view') && request('view') === 'cart')
    <div class="py-12" id="cart_list">
@endif
@if(request()->has('view') && request('view') === 'order')
    <div class="py-12" id="order_list">
@endif

@if(request()->has('view') && request('view') === 'orderN')
    <div class="py-12" id="order_list">
@endif
    
    	
        
    </div>
    
    
    
    
    
    <div class="py-12">
        
        
    </div>
    
    
    
    
    
@if(request()->has('view') && request('view') === 'cart')
    <script src="{{ asset('js/dashboard.js') }}"></script>
@endif

@if(request()->has('view') && request('view') === 'order')
    <script src="{{ asset('js/dashboard_order.js') }}">

    </script>
    
    <?php
    echo "<script >fillOrders(";
    echo $_SESSION['user_id'];
    echo");</script>";
    ?>
@endif
@if(request()->has('view') && request('view') === 'orderN')
    <script src="{{ asset('js/dashboard_orderN.js') }}"></script>
@endif

</x-app-layout>
