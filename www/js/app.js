/*
 * Please see the included README.md file for license terms and conditions.
 */
/* global angular */

/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */



  


function start () {
    var app =angular.module('app', []);



	app.controller('appCtrl',function($scope){
		$scope.products =[
		{name:'123',Url:'www.google.com'},
		{name:'234',Url:'www.baidu.com'},
		{name:'234',Url:'www.baidu.com'},
		{name:'234',Url:'www.baidu.com'},
		{name:'234',Url:'www.baidu.com'}
	];
		$scope.addProduct = function(){
			var P={name:'567',Url:'www.google.com'};
			$scope.products.push(P);
		};
	
});
	$(function(){
        $('.Plist').hide();
       DropdownChange();
        Search();
});
}

function addItem(){
	 var scope = angular.element($("#ProductsContainer")).scope();
	var P={name:'567',Url:'www.google.com'};
    scope.$apply(function(){
        scope.products.push(P);
    });
}
function Search(){
    $("#SearchButton").click(function(){
     $("#HeaderContainer").hide();  
        $('.Plist').show();
    });
}
function DropdownChange(){
     $(".dropdown-menu li a").click(function(){   
    $(".dropdown-toggle").text($(this).text());
  });   
}                                               //change the the button by drop down 

start();