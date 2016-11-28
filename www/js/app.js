/*
 * Please see the included README.md file for license terms and conditions.
 */
/* global angular */

/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */




var P1 = {"URL":"http://www.google.com","DocName":"abc","Image":"img/1.jpg","Content":"blablabla","Price":"$123","Review":"3.8"};
	var P2={"URL":"http://www.google.com","DocName":"def","Image":"img/1.jpg","Content":"blablabla","Price":"$125","Review":"3.2"};
	var P3={"URL":"http://www.google.com","DocName":"ghi","Image":"img/1.jpg","Content":"blablabla1111111111111111111111111","Price":"$124","Review":"5.0"};
var ProdJ = JSON.stringify(P1)+"\n"+JSON.stringify(P2)+"\n"+JSON.stringify(P3);
//var ProdJ;
 
function start () {
    var app =angular.module('app', []);



	app.controller('appCtrl',function($scope){
		$scope.products =[	];
		$scope.method = 3;
		$scope.reverse = true;
		$scope.setMethod = function(k){
			$scope.reverse = ($scope.method === k) ? !$scope.reverse : false;
			console.log("set to " +k);
			$scope.method=k;
		};
		$scope.isMethod = function(s){
			
			return $scope.method===s;
		};
	
});
	$(function(){
        $('.Plist').hide();
       DropdownChange();
        Search();
		nextPageClick();
});
}

function addItem(){
	var scope = angular.element($("#ProductsContainer")).scope();
	console.log("get scope");
	console.log(ProdJ);
	var strLines =ProdJ.split("\n");
	console.log(strLines);
	for(var i in strLines){
		var obj = JSON.parse(strLines[i]);
		var P={Name:obj.DocName,URL:obj.URL,Img:obj.Image,Detail:obj.Content,Price:obj.Price,Rate:obj.Review};
	scope.$apply(function(){
        scope.products.push(P);
    });
	}
}
function removeItem(){
	 var scope = angular.element($("#ProductsContainer")).scope();
	scope.$apply(function(){
        scope.products=[];
		scope.method = 3;
		scope.reverse =true;
    });
}
function Search(){
    $("#SearchButton").click(function(){
   		$("#HeaderContainer").hide();  
    	$('.Plist').show();
		$('#loading').show();
		console.log("start posting");
		var ServletUrl = "./QueryHandler"; 
		var QueryString = JSON.stringify({Type: $(".dropdown-toggle").text(),Query:$("#searchBox").val(),Next:"NO"});
		console.log(QueryString);
		$.post(ServletUrl,"?JSON="+QueryString,
		function(data) {
     		alert("Data Loaded: " + data);
			//ProdJ=data;
   		});	
		removeItem();
    	$('#loading').hide();
		addItem();
   });
}
function nextPageClick(){
	$("#nextPage").click(function(){
		var ServletUrl = "./QueryHandler"; 
		var QueryString = JSON.stringify({Type: $(".dropdown-toggle").text(),Query:$("#searchBox").val(),Next:"YES"});
		console.log(QueryString);
		$.post(ServletUrl,"?JSON="+QueryString,
   		function(data) {
			alert("Data Loaded: " + data);
			//ProdJ=data;
    		
   		});
		$('#loading').hide();
		addItem();
	});
}
function DropdownChange(){
     $(".dropdown-menu li a").click(function(){   
    $(".dropdown-toggle").text($(this).text());
  });   
}                                               //change the the button by drop down 

start();