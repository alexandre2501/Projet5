<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersDish extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_dish', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('cal');
            $table->integer('pro');
            $table->integer('lip');
            $table->integer('glu');
            $table->string('usr_cre');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users_dish');
    }
}
