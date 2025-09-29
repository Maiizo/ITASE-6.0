<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // return Inertia::render('home');
    // return "hello";
    return view('home'); //kalau ini yg normal, prob tanpa react
})->name('home');

Route::get('/contact', function () {
    return view('contact');
})->name('contact');

Route::get('/project', function () {
    return view('project');
})->name('project');

// Route::redirect('home', '/app'); 

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
// require __DIR__.'/contact.blade.php';
// require __DIR__.'/project.php';