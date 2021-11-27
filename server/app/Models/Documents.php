<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Documents extends Model
{
    use HasFactory;
    protected $primaryKey = 'document_no';
    protected $fillable = ['document_subject', 'status', 'remark', 'created_by', 'updated_by'];

    public function user()
    {
        return $this->belongsTo(Users::class, 'created_by');
    }

    public function document_detail()
    {
        return $this->hasMany(DocumentDetails::class, 'document_no');
    }
}
