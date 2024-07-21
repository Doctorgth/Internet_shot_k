<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\user_orders as orders;


namespace App\Http\Controllers;

use App\Models\User;
use App\Models\user_orders as orders;
use Illuminate\Http\Request;

class UserApiController extends Controller
{
    public function getNameById($id)
    {
        $user = User::find($id);
        if ($user) {
            $dictionary = array();
            $dictionary['name']=$user->name;
            return $dictionary;
        } else {
            return 'User not found';
        }
    }
   public function getBalance($id)
   {
   $user = User::find($id);
        if ($user) {
            $dictionary = array();
            $dictionary['balance']=$user->balance;
            return $dictionary;
        } else {
            return 'User not found';
        }
   
   }
   
   
   public function getBalanceUser()
   {
   	session_start();
        $id=$_SESSION['user_id'];
   $user = User::find($id);
        if ($user) {
            $dictionary = array();
            $dictionary['balance']=$user->balance;
            return $dictionary;
        } else {
            return 'User not foun'+$id+"123";
        }
   
   }
   
   
   
   public function updateBalance(Request $request,$id)
    {
        try {
        $user = User::find($id);
        $user->balance = $request->input('balance');
        $user->save();
        $dictionary = array();
        $dictionary["test"]="ok";
        return $dictionary;
    } catch (ModelNotFoundException $e) {
        // handle the case where the user is not found
        return response()->json(['error' => 'User not found'], 404);
    } catch (Exception $e) {
        // handle any other unexpected errors
        return response()->json(['error' => 'An error occurred'], 500);
    }
    }
    
    
    public function updateBalanceUser(Request $request)
    {
        try {
        session_start();
        $id=$_SESSION['user_id'];
        $user = User::find($id);
        $user->balance = $request->input('balance');
        $user->save();
        $dictionary = array();
        $dictionary["test"]="ok";
        return $dictionary;
    } catch (ModelNotFoundException $e) {
        // handle the case where the user is not found
        return response()->json(['error' => 'User not found'], 404);
    } catch (Exception $e) {
        // handle any other unexpected errors
        return response()->json(['error' => 'An error occurred'], 500);
    }
    }
    
    public function getUserByIdOrder($id)
    {
    
        $category = orders::where('id_order', $id)->get();
        if ($category) {
        return response()->json($category, 200);
    } else {
        return response()->json(['error' => 'product not found'], 404);
    }
   }
   
   
   
   public function setAdmin(Request $request)
    {   $id=$request->input('id');
    	
    	
        $user = User::find($id);
        $user->admin = $request->input('status');
        $user->save();
        if ($user) {
        return response()->json($user, 200);
    } else {
        return response()->json(['error' => 'product not found'], 404);
    }
   }
   
}
?>
