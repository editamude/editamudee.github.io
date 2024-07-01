<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('layout.home');
});

Route::get('/detweb', function () {
    return view('layout.detweb');
});

Route::get('/detweb2', function () {
    return view('layout.detweb2');
});

Route::get('/net', function () {
    return view('layout.net');
});

Route::get('/net2', function () {
    return view('layout.net2');
});

Route::get('/vr', function () {
    return view('layout.vr');
});

Route::get('/vr1', function () {
    return view('layout.vr1');
});