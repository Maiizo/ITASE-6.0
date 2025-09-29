<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ForumController;

Route::get('/', function () {
    return Inertia::render('welcome');
    // return "Hello world";
})->name('home');

Route::get('/project', function () {
    return view('project');
})->name('project');

Route::get('/contact', function () {
    return view('contact');
})->name('contact');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::get('/forum', [ForumController::class, 'index'])->name('forum.index');
Route::get('/forum/create', [ForumController::class, 'create'])->name('forum.create');
Route::get('/forum/{topic:slug}', [ForumController::class, 'show'])->name('forum.show');
Route::post('/forum', [ForumController::class, 'store'])->name('forum.store');
Route::post('/forum/{topic:slug}/posts', [ForumController::class, 'storePost'])->name('forum.posts.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
