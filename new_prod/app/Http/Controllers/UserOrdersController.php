<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\user_orders as orders;
class UserOrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    $Category= orders::all();
        return response()->json($Category);
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $requestData = $request->all();
    	$fillableData = array_intersect_key($requestData, array_flip((new orders())->getFillable()));
    	session_start();
    	if (isset($_SESSION['user_id'])) {
    $userId = $_SESSION['user_id'];
    }
    else{
    $userId=null;
    }
    	
    	$fillableData['id_user'] = $userId;
    	$category = orders::create($fillableData);
    	return response()->json($category, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = orders::where('id_user', $id)->get();
        if ($category) {
        return response()->json($category, 200);
    } else {
        return response()->json(['error' => 'product not found'], 404);
    }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = orders::where('id_user', $id)->first();

    if ($category) {
        $fillableData = array_filter(
            $request->only((new orders())->getFillable())
        );
        $category->fill($fillableData);
        $category->save();

        return response()->json($category, 200);
    } else {
        return response()->json(['error' => 'product not found'], 404);
    }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category= orders::where('id_order', $id)->first();
        if ($category) {
        $category->delete();
        return response()->json(['message' => 'product deleted'], 200);
    } else {
        return response()->json(['error' => 'product not found'], 404);
    }
    }
}
