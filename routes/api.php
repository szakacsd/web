<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CommentController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostController;

Route::apiResource('posts', PostController::class);
Route::apiResource('categories', CategoryController::class);
Route::apiResource('comments', CommentController::class);