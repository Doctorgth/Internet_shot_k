<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\OrderProductsController;
use App\Http\Controllers\UserOrdersController;
use App\Http\Controllers\UserApiController;
//use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('categories', CategoryController::class);
Route::resource('orders', OrdersController::class);
Route::resource('products', ProductsController::class);
Route::resource('order_products', OrderProductsController::class);
Route::resource('user_orders', UserOrdersController::class);
Route::get('userapi/{id}', [UserApiController::class, 'getNameById']);
Route::get('userapi/{id}/balance', [UserApiController::class, 'getBalance']);
Route::get('userapi/balance_user/user', [UserApiController::class, 'getBalanceUser']);
Route::post('userapi/admin_set', [UserApiController::class, 'setAdmin']);
Route::get('userapi/{id}/order/user', [UserApiController::class, 'getUserByIdOrder']);
Route::post('/userapi/{id}/balance', [UserApiController::class, 'updateBalance']);
Route::post('/userapi/balance', [UserApiController::class, 'updateBalanceUser']);
Route::get('/hello', function () {
  return "Hello World!";
});

//Route::get('category', 'CategoryController');
