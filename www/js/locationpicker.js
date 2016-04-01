
$( document ).on("pagecreate", "#locationSearchPage", function() {

$(document).on('click', '#backbtn', function(e){

		if (e.handled !== true) { 
			e.handled = true;  
			$.mobile.changePage('index.html', {transition: 'slidedown'});
		}

	    });

});

$( document ).on("pageshow", "#locationSearchPage", function() {

	$(function () {	
		$("#location")
		.geocomplete()
		.bind("geocode:result", function (event, result) {						
	// $("#latitude").val(result.geometry.location.lat());
	// $("#longitude").val(result.geometry.location.lng());
	//console.log(result);

window.localStorage.clear();


	localStorage.current_lat = result.geometry.location.lat();
	localStorage.current_lng = result.geometry.location.lng();
	localStorage.current_full_place_name = result.formatted_address;
	 var place_name_arr = result.formatted_address.split(" ");
	
	if (place_name_arr.length > 0) {
		var place_name = place_name_arr[0];
		var sec =  place_name.replace(',', '');
	localStorage.current_place_name = sec;
}
	
	//Go to previous screen




	$.mobile.changePage('index.html', {transition: 'slidedown'});
	
});
	});

	

});
