<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Roles extends Model
{
    protected $primaryKey = 'role_id';

    protected $hidden = ['created_at', 'updated_at', 'role_id'];

    public function users()
    {
        return $this->hasMany(Users::class, 'role_id');
    }
}
