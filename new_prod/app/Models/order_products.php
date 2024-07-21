<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class order_products extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_order',
        'id_product',
        'count',
        'amount'
    ];
    public $timestamps = false;
}
