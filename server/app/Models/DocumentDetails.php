<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentDetails extends Model
{
    use HasFactory;
    protected $fillable = ['document_no', 'nama_nasabah', 'amount'];

    public function documents()
    {
        return $this->belongsTo(Documents::class, 'document_no');
    }
}
