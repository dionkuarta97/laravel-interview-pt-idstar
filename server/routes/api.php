<?php

use App\Http\Controllers\DocumentsController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;



Route::post('/login', [UsersController::class, 'login']);
Route::get('/user', [UsersController::class, 'getUsers'])->middleware('jwtAuth');
Route::post('/documents', [DocumentsController::class, 'addDocument'])->middleware('jwtAuth');
Route::get('/documents', [DocumentsController::class, 'getDocuments'])->middleware('jwtAuth');
Route::delete('/documents/{id}', [DocumentsController::class, 'deleteDocument'])->middleware('jwtAuth');
Route::put('/documents/{id}', [DocumentsController::class, 'updateDocument'])->middleware('jwtAuth');
