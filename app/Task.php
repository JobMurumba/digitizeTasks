<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    //mass asignable fields
    protected $fillable = ['title','project_id'];
}
