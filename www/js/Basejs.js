// $(document).on("pagecreate","#SearchPage",function(){ // When entering pagetwo
//   //alert("pagetwo is about to be shown");
//   //$.mobile.loadPage( "my_stuff.html", { showLoadMsg: false } );
// });
// $(document).on("pageshow","#LocationSearchPage",function(){ // When entering pagetwo
//   alert("pagetwo is now shown");
// });
// $(document).on("pagebeforehide","#SearchPage",function(){ // When leaving pagetwo
//   alert("pagetwo is about to be hidden");
// });
// $(document).on("pagehide","#SearchPage",function(){ // When leaving pagetwo
//   alert("pagetwo is now hidden");
// });

// var baseURL = "http://localhost:8888/ShareCareServer/Php/";
//var baseURL = "http://localhost:8888/jqueryMobileApps/SharencareLatest/ShareCareServer/Php/";
var baseURL = "http://sharencare.16mb.com/sharencare/";
var errorImage = 'images/camericon.png';

//$(document).on("pagebeforeshow", "#find_stuff", function(){
//	$.mobile.loadPage( "index.html" );
//	$.mobile.loadPage( "give_away.html" );
//	$.mobile.loadPage( "my_stuff.html" );
//});
//
//$(document).on("pagebeforeshow", "#my_stuff", function(){
//	$.mobile.loadPage( "index.html" );
//	$.mobile.loadPage( "give_away.html" );
//	$.mobile.loadPage( "my_stuff.html" );
//});
//
//$(document).on("pagebeforeshow", "#give_away", function(){
//	$.mobile.loadPage( "index.html" );
//	$.mobile.loadPage( "give_away.html" );
//	$.mobile.loadPage( "my_stuff.html" );
//});

$(document).ajaxStart(function(){
                      $.mobile.loading("show");
                      });
$(document).ajaxComplete(function(){
                         $.mobile.loading("hide");
                         });

$(document).on("pagebeforeshow", "#find_stuff", function(){
               if(!localStorage.login_userID){
               $.mobile.changePage('login.html', {transition: 'slide'});
               }

});
$(document).ready(function(){
                  
                  window.fbAsyncInit = function() {
                  FB.init({
                          appId      : '1716442435260319',
                          xfbml      : true,
                          version    : 'v2.5'
                          });
                  };
                  
                  (function(d, s, id){
                   var js, fjs = d.getElementsByTagName(s)[0];
                   if (d.getElementById(id)) {return;}
                   js = d.createElement(s); js.id = id;
                   js.src = "//connect.facebook.net/en_US/sdk.js";
                   fjs.parentNode.insertBefore(js, fjs);
                   }(document, 'script', 'facebook-jssdk'));
                  
                  
                  });
