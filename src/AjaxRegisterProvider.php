<?php

namespace AjaxRegister\AjaxRegisterProvider;

use Illuminate\Support\ServiceProvider;

class AjaxRegisterProvider extends ServiceProvider
{

    public function boot()
    {
        $path = __DIR__;
        $this->publishes([
            $path.'/assets' => base_path('public/AjaxRegister'),
            $path.'/auth' => base_path('app/Http/Controllers/Auth'),
            $path.'/view' => base_path('resources/views')
        ] , '5dmatweb');
    }
    public function register()
    {



    }

}
