# laravel-ajax-register
Ajax Register with laravel

#install
```
composer require 5dmatwebregister/ajaxregister:dev-master
```

#add provider
 ```
 AjaxRegister\AjaxRegisterProvider\AjaxRegisterProvider::class,
 ```
 
#Authentication scaffolding

add this line to terminal

```
php artisan make:auth
```
 
 #vendor publish
 ```
 php artisan vendor:publish --tag=5dmatweb --force
 ```
 
 
#Start Now

now start your project and enjoy login with ajax

```
php artisan serve
```

#How to use
```javascript
   var AR = new AjaxRegister({
            form:'form',
            error:"error",
            input:[ [name , required] , email  ],
            doneUrl:"/home"
        });
```      
form =  the form id you must set id to the register form
erorr = the id of div we will show errors on it
input = array of input that we will take values if this input required just put in sub array like this ['name' , 'required']
if input optional just put his name like this 'email' do not worry about this point we set the input for you 
doneUrl = the url we will redirect user after register

example
```javascript
   var AR = new AjaxRegister({
            form:'form',
            error:"error",
            input:[
                ['name' ,'required'] , ///required
                ['email','required'] ,///required
                ['password','required'] ,///required
                ['password-confirm','required'] ,///required
                ['_token','required'],///required
                'age' ///optional
            ],
            doneUrl:"/home"
        });

```
