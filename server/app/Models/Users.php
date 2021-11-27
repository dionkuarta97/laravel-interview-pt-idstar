<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    protected $primaryKey = 'user_id';
    protected $hidden = ['password', 'created_at', 'updated_at', 'role_id'];
    public function roles()
    {
        return $this->belongsTo(Roles::class, 'role_id');
    }
    public function documents()
    {
        return $this->hasMany(Documents::class, 'user_id');
    }
}
