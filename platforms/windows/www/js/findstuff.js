

$( document ).on("pagecreate", "#find_stuff", function() {

// var current_place_name_str1 = localStorage.getItem('current_place_name');
// $("#searchlocationBtn").attr('value',current_place_name_str1).button('refresh');
// * Add all event listeners on page create so it is added only once *
// //alert("create");
// $(document).on('click', '#searchlocationBtn', function(e){

// if (e.handled !== true) { 

// e.handled = true;  
// $.mobile.changePage('locationSearch.html', {transition: 'slideup'});
// }

// });
$('input[id=location]').bind("change paste keyup", function() {
    console.log($(this).val()+ " "+ $(this).val().length);
    if($(this).val().length == 0){
    localStorage.find_lat = "";
	localStorage.find_lng = "";
	localStorage.find_full_place_name="";
    localStorage.find_place_name="";
}});

var options = {
enableHighAccuracy: true,
timeout: 5000,
maximumAge: 0
};

function success(pos) {
var crd = pos.coords;
    
$.mobile.loading("hide");

console.log('Your current position is:');
console.log('Latitude : ' + crd.latitude);
console.log('Longitude: ' + crd.longitude);
console.log('More or less ' + crd.accuracy + ' meters.');
    localStorage.find_lat = crd.latitude;
    localStorage.find_lng = crd.longitude;
            
            var geocoder = new google.maps.Geocoder();
            var latLng = new google.maps.LatLng(localStorage.find_lat,localStorage.find_lng);

            if (geocoder) {
                geocoder.geocode({ 'latLng': latLng}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
            localStorage.find_full_place_name = results[0].formatted_address;
	 var place_name_arr = results[0].formatted_address.split(" ");
	
	if (place_name_arr.length > 0) {
		var place_name = place_name_arr[0];
		var sec =  place_name.replace(',', '');
	localStorage.find_place_name = sec;
                $("#location").val(localStorage.find_full_place_name );

    }
                else{
            alert("Failed to get Current Location");
                }
            }
                });
            }
                                 
};
    

function error(err) {
    $.mobile.loading("hide");
            alert("Failed to get Current Location");
console.warn('ERROR(' + err.code + '): ' + err.message);
};


$(document).on('click', '#findCurrentLocBtn', function(e){
$.mobile.loading("show");
navigator.geolocation.getCurrentPosition(success, error, options);
});

});


// $(document).ready(function(){
// //alert("init");
// })


$( document ).delegate("#find_stuff", "pageshow", function() {

var find_full_place_name_str = localStorage.getItem('find_full_place_name');
    
    $('input[id=location]').val(find_full_place_name_str)
        
// if (current_place_name_str == null) {
// 	localStorage.find_place_name = "Search Globally.";
// }
// else {
// 	$("#searchlocationBtn").attr('value',current_place_name_str).button('refresh');

// }

//alert(current_place_name_str);
//alert(current_place_name_str);
// $("#searchlocationBtn").attr('value',current_place_name_str).button('refresh');
// $("#searchlocationBtn").attr('value',current_place_name_str).button('refresh');
// $("#searchlocationBtn").attr('value',current_place_name_str).button('refresh');

//    $("#selectCatBtn").text('value').button('refresh');
//
//    $("#selectCatBtn").val('va').button('refresh');



// alert('init');
  // var current_place_name_str = localStorage.getItem('current_place_name');
  //$('#searchlocationBtn').text('Save').button("refresh");
  // $("#searchlocationBtn").title("current_place_name_str");
 
  
 // $("#searchlocationBtn").val(current_place_name_str);
 // $('#findcontent div').button('refresh');
  // var butn= $("#searchlocationBtn").val("");

  //$("#findcontent div a").value('value');
   //alert(current_place_name_str);
  
  //$("#btnAddProfile").attr('value', 'Save');
//  $("#searchlocationBtn").text("frrffkn");
//$("#searchlocationBtn").attr('value', 'Sattrave');
//$("#searchlocationBtn").prop('value', 'Save');
//$("#searchlocationBtn").val('Save');

//document.getElementById("#searchlocationBtn").value="New Button Text";
 });
 //$("#findcontent").button("refresh");

$( document ).delegate("#find_stuff", "pagebeforeshow", function() {
//alert("befor show");

 $('input[id=location]')
		.geocomplete()
		.bind("geocode:result", function (event, result) {						
    
	localStorage.find_lat = result.geometry.location.lat();
	localStorage.find_lng = result.geometry.location.lng();
	localStorage.find_full_place_name = result.formatted_address;
	 var place_name_arr = result.formatted_address.split(" ");
	
	if (place_name_arr.length > 0) {
		var place_name = place_name_arr[0];
		var sec =  place_name.replace(',', '');
	localStorage.find_place_name = sec;
                $('input[id=location]').val(localStorage.find_full_place_name );

}
});

// var current_place_name_str1 = localStorage.getItem('current_place_name');
// $("#searchlocationBtn").attr('value',current_place_name_str1).button('refresh');

//$("#searchlocationBtn").attr('Save');
/**** Initialize the UI hear ****/

// alert(localStorage.getItem('current_place_name'));


// $('#searchlocationBtn').text('Mark New');
// $('#searchlocationBtn').button('refresh');

// $("#searchlocationBtn").html(localStorage.getItem('current_place_name'));
/**** Make server call to fetch JSON from server  ****/
 // var butn = $('#searchlocationBtn').get();
 // butn.text('bdjfn');



 // $("#searchlocationBtn").html("ddbjebdjdebj");

// alert($("#searchlocationBtn").html() );

$.ajax({
url: baseURL+"fetchproducttype.php",
//force to handle it as text
// type: "GET",
dataType: "text",
success: function(data) {

//data downloaded so we call parseJSON function 
//and pass downloaded data
var json = $.parseJSON(data);


var statusval = json.status_code;

		if (statusval == 7347) {
var categoriesArray = json.product_type;

var content = '';

if (categoriesArray.length==0) {
				alert("No categories available");

		};

for (var i = 0; i < categoriesArray.length; i++) {
	

	var stuffObj = categoriesArray[i];

	var btnID = "btn"+i;
	var imgID = "img"+i;
	var headID = "hh"+i;

//crossOrigin="anonymous"

content += '<li><a href="#" id ='+btnID+'><img class= "circularThumbnail ui-li-thumb" id ="'+imgID+'" src="' +stuffObj.imageurl+ '"  /><h2 id ="'+headID+'">'+stuffObj.type+'</h2></a></li>';

}

$('#findcontent ul').html(content);
$('#findcontent ul').listview('refresh');




/** Here the list items are created only once the server response is got, so add event listeners hers to (li a) ***/

$(document).on('click', '#listItem li a', function(e){

//e.preventDefault();
var idVal = $(this).attr('id');

var imageID =idVal.replace("btn", "img");


var headerID =idVal.replace("btn", "hh");


var idVal = $(this).attr('id');

var selectedIndexID =idVal.replace("btn", "");
var currentItem = categoriesArray[selectedIndexID];

//get the image

img = $('#'+imageID).get(0);


//Store image name and description in local storage
 // localStorage.itemDec = $('#'+paragraphID).text();
 // localStorage.imageUrl = img.src;
 // localStorage.itemName = $('#'+headerID).text();

 // localStorage.itemUploadedDate = $('#'+headerID).text();
 //window.localStorage.clear();

 localStorage.imageUrl = currentItem.imageurl;
 localStorage.itemtype = currentItem.type;

localStorage.selected_item_type = currentItem.typeid;
localStorage.selected_type_image = currentItem.imageurl;

if (e.handled !== true) { 

e.handled = true;  
$.mobile.changePage('stuffs.html', {transition: 'slide'});
}

});
		
		}// if 7347 ended

		else if (statusval == 3477) {
			alert(json.status_message);
		}


}
});


});


