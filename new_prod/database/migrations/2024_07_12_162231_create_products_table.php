<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Запуск миграции.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('id_category');
            $table->foreign('id_category')->references('id')->on('category');
            $table->float('price')->default(0);
            $table->integer('count')->default(0);
            $table->string('name', 255);
            $table->string('image', 255)->default('default.jpg');
        });
    }

    /**
     * Откат изменений.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
