/**!
 * ajax - v2.1.2
 * Ajax module in Vanilla JS
 * https://github.com/fdaciuk/ajax

 * Sun May 15 2016 12:45:49 GMT-0300 (BRT)
 * MIT (c) Fernando Daciuk
 */
!function(e,t){"use strict";"function"==typeof define&&define.amd?define("ajax",t):"object"==typeof exports?exports=module.exports=t():e.ajax=t()}(this,function(){"use strict";function e(e){var r=["get","post","put","delete"];return e=e||{},e.baseUrl=e.baseUrl||"",e.method&&e.url?n(e.method,e.baseUrl+e.url,t(e.data),e):r.reduce(function(r,u){return r[u]=function(r,o){return n(u,e.baseUrl+r,t(o),e)},r},{})}function t(e){return e||null}function n(e,t,n,u){var c=["then","catch","always"],s=c.reduce(function(e,t){return e[t]=function(n){return e[t]=n,e},e},{}),i=new XMLHttpRequest;return i.open(e,t,!0),r(i,u.headers),i.addEventListener("readystatechange",o(s,i),!1),i.send(a(n)),s.abort=function(){return i.abort()},s}function r(e,t){t=t||{},u(t)||(t["Content-Type"]="application/x-www-form-urlencoded"),Object.keys(t).forEach(function(n){t[n]&&e.setRequestHeader(n,t[n])})}function u(e){return Object.keys(e).some(function(e){return"content-type"===e.toLowerCase()})}function o(e,t){return function n(){t.readyState===t.DONE&&(t.removeEventListener("readystatechange",n,!1),e.always.apply(e,c(t)),t.status>=200&&t.status<300?e.then.apply(e,c(t)):e["catch"].apply(e,c(t)))}}function c(e){var t;try{t=JSON.parse(e.responseText)}catch(n){t=e.responseText}return[t,e]}function a(e){return s(e)?i(e):e}function s(e){return"[object Object]"===Object.prototype.toString.call(e)}function i(e){return Object.keys(e).reduce(function(t,n){var r=t?t+"&":"";return r+f(n)+"="+f(e[n])},"")}function f(e){return encodeURIComponent(e)}return e});

/**
 * Created by Abdel Aziz Hassan on 2/24/17.
 * https://5dmat-web.com/
 * https://www.facebook.com/AbdelAzizHasssan
 */

var AjaxRegister = (function(){

    function AjaxRegister(info){
        this.formId  = info.form;
        this.inputArray = info.input;
        this.succUrl = info.doneUrl;
        this.errorsHandel = info.error;
        this.userRegister(this);
    }

    AjaxRegister.prototype.input = [
        ['name' , 'required']
        ,['email','required' ] ,
        ['password','required' ],
        ['password_confirmation','required' ],
        ['_token','required' ]
    ];

    AjaxRegister.prototype.done = "/home";

    AjaxRegister.prototype.checkAfterDone = function () {
        return this.succUrl === undefined ?  this.done : this.succUrl;
    };


    AjaxRegister.prototype.userRegister = function(thisClass){
        this.addEvent(this.formId , 'submit' , function(){
            var info = thisClass.GetInfo();
            if(info !== false){
                thisClass.sendRequest(info , thisClass);
            }else{
                console.log("Fill All Inputs");
            }
        });
    };


    AjaxRegister.prototype.sendRequest = function (info , thisClass) {
        var url = this.getUrl();
        ajax().post(url , info).then(function(response){
               if(response == true){
                   thisClass.doneRegister();
               }else{
                   thisClass.errorRegister(response);
               }
        });
    };

    AjaxRegister.prototype.doneRegister = function () {
        this.redirectTo(this.checkAfterDone());
    };

    AjaxRegister.prototype.errorRegister = function (response) {
        var out = '';
        var property ="";
        for(var i = 0 ; i  < this.checkInput().length ; i++){
            if(typeof this.checkInput()[i] == "object"){
                property = this.checkInput()[i][0];
            }else{
                property = this.checkInput()[i];
            }
            if(response.hasOwnProperty(property)){
                for(var k = 0 ; k < response[property].length ; k++){
                    out += response[property][k]+'<br>';
                }
            }
        }
        this.showError(out);
    };

    AjaxRegister.prototype.showError = function (error) {
        if(this.errorsHandel !== undefined)
            this.getById(this.errorsHandel).innerHTML = error;
        else
            alert('please add error id');
    };

    AjaxRegister.prototype.redirectTo = function (url) {
        window.location = url;
    };


    AjaxRegister.prototype.getUrl = function () {
        return this.getById(this.formId).action;
    };


    AjaxRegister.prototype.checkInput = function () {
        return this.inputArray === undefined ? this.input : this.inputArray;
    };

    AjaxRegister.prototype.GetInfo = function(){
        var object = {};
        for(var i = 0 ; i < this.checkInput().length ;i++){
            if(typeof this.checkInput()[i] == "object"){
                if(this.checkInput()[i][1] == 'required' && this.getValByName(this.checkInput()[i][0]) == ""){
                    return false;
                }
                object[this.checkInput()[i][0]] =  this.getValByName(this.checkInput()[i][0]);
            }else{
                object[this.checkInput()[i]] =  this.getValByName(this.checkInput()[i]);
            }
        }
        return object;
    };

    AjaxRegister.prototype.addEvent = function(id , action , callback){
        this.getById(id).addEventListener(action , function(event){
            event.preventDefault();
            callback();
        })
    };

    AjaxRegister.prototype.getById = function(id){
        return document.getElementById(id);
    };

    AjaxRegister.prototype.getByName = function(name){
        return document.getElementsByName(name)[0];
    };

    AjaxRegister.prototype.getValByName = function(name){
        return this.getByName(name).value;
    };

   return AjaxRegister ;
})();