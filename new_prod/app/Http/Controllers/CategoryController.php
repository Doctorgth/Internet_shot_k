<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      $Category= Category::all();
        return response()->json($Category);
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
{
    $fields = [
        'name' => 'text',
        'description' => 'textarea',
        // добавьте другие поля...
    ];

    $form = \Illuminate\Support\Facades\Form::create(['route' => 'categories.store'], 'post', ['class' => 'form-horizontal']);
    $form->fields($fields);

    return view('categories.create', compact('form'));
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
           
        $requestData = $request->all();
    	$fillableData = array_intersect_key($requestData, array_flip((new Category())->getFillable()));
    	$category = Category::create($fillableData);
    	return response()->json($category, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = Category::find($id);
        if ($category) {
        return response()->json($category, 200);
    } else {
        return response()->json(['error' => 'Category not found'], 404);
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
        $category = Category::find($id);

    if ($category) {
        $fillableData = array_filter(
            $request->only((new Category())->getFillable())
        );
        $category->fill($fillableData);
        $category->save();

        return response()->json($category, 200);
    } else {
        return response()->json(['error' => 'Category not found'], 404);
    }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category= Category::find($id);
        if ($category) {
        $category->delete();
        return response()->json(['message' => 'Category deleted'], 200);
    } else {
        return response()->json(['error' => 'Category not found'], 404);
    }
    }
}
