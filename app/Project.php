<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    //mass assignable and relationship..one to many(one project many tasks)

    protected $fillable = ['name','description'];

    public function tasks(){
        return $this->hasMany(Task::class);
    }

}
