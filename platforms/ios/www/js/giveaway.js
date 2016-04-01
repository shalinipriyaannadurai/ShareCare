    $(document).on("pagecreate", "#give_away", function() {

        /** Add all event listeners on page create so it is added only once **/
        $("#giveaway_form").submit(function(event) {
            var data = new FormData(this);
            data.append('typeid', localStorage.type);
            data.append('lat', localStorage.lat);
            data.append('lng', localStorage.lng);
            data.append('address', localStorage.current_full_place_name);

            $.ajax({
                url: baseURL + "addproduct.php", // Url to which the request is send
                type: "POST", // Type of request to be send, called as method
                data: data,
                contentType: false, // The content type used when sending data to the server.
                cache: false, // To unable request pages to be cached
                processData: false, // To send DOMDocument or non processed data file it is set to false
                success: function(data) // A function to be called if request succeeds
                    {
                            var json = $.parseJSON(data);
                            var statusval = json.status_code;

		                      if (statusval == 7347) {
                                  alert("Item Saved Successfuly");
                                  $('#giveaway_form')[0].reset();
                                    $('#yourimage' ).attr('src','images/camericon.png');
                                }
                        
                    },
                error: function(error) {
                    console.log("Error");
                                  alert("Please try after sometime");

                }
            });
            event.preventDefault();
        });
        $(document).on("change", "#uploadBtn", function(event) {
            console.log('gotPic' + event.target.files[0]);

            if (event.target.files.length == 1 &&
                event.target.files[0].type.indexOf("image/") == 0) {
                $("#yourimage").attr("src", URL.createObjectURL(event.target.files[0]));
            }
        });
        desiredWidth = window.innerWidth;

        if (!("url" in window) && ("URL" in window)) {
            window.URL = window.URL;
        }


   


        $(document).on('click', '#resetBtn', function(e) {
                    console.log("reset ");
            $('#giveaway_form')[0].reset();
            $('#yourimage' ).attr('src','images/camericon.png');
            
        });
        
        $("#searchlocation")
		.geocomplete()
		.bind("geocode:result", function (event, result) {						
    
	localStorage.lat = result.geometry.location.lat();
	localStorage.lng = result.geometry.location.lng();
	localStorage.current_full_place_name = result.formatted_address;
	 var place_name_arr = result.formatted_address.split(" ");
	
	if (place_name_arr.length > 0) {
		var place_name = place_name_arr[0];
		var sec =  place_name.replace(',', '');
	localStorage.current_place_name = sec;
                $("#searchlocation").val(localStorage.current_full_place_name);

}
});

    });

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

            localStorage.lat = crd.latitude;
            localStorage.lng = crd.longitude;
            
            var geocoder = new google.maps.Geocoder();
            var latLng = new google.maps.LatLng(localStorage.lat,localStorage.lng);

            if (geocoder) {
                geocoder.geocode({ 'latLng': latLng}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
            localStorage.current_full_place_name = results[0].formatted_address;
	 var place_name_arr = results[0].formatted_address.split(" ");
	
	if (place_name_arr.length > 0) {
		var place_name = place_name_arr[0];
		var sec =  place_name.replace(',', '');
	   localStorage.current_place_name = sec;

        $('input[id=searchlocation]').val(localStorage.current_full_place_name);
    }
            }
         else {
            alert("Failed to get Current Location");
         }
      });
   }    

        }

    function error(err) {
            $.mobile.loading("hide");
            alert("Failed to get Current Location");
        console.warn('ERROR(' + err.code + '): ' + err.message);

}
     $(document).on('click', '#currentLocBtn', function(e) {
         
         $.mobile.loading("show");
            navigator.geolocation.getCurrentPosition(success, error, options);
        });

    $(document).bind('mobileinit', function() {
        $.mobile.changePage.defaults.changeHash = false;
        $.mobile.hashListeningEnabled = false;
        $.mobile.pushStateEnabled = false;
    });

    
    $(document).delegate("#give_away","pagebeforeshow", function() {

    /**** Make server call to fetch JSON from server  ****/
    $.ajax({
        url: baseURL + "fetchproducttype.php",
        //force to handle it as text
        // type: "GET",
        dataType: "text",
        success: function(data) {

            //data downloaded so we call parseJSON function 
            //and pass downloaded data
            var json = $.parseJSON(data);


            var categoriesArray = json.product_type;

            var content = '';

            for (var i = 0; i < categoriesArray.length; i++) {


                var stuffObj = categoriesArray[i];

                var btnID = "btn" + i;
                var imgID = "img" + i;
                var headID = "hh" + i;

                //crossOrigin="anonymous"
console.log(stuffObj.typeid   );
                content += '<option value = ' + stuffObj.typeid + '><a data-rel="back" id =' + btnID + '><img  id ="' + imgID + '" src="' + stuffObj.imageurl + '"  /><h2 id ="' + headID + '">' + stuffObj.type + '</h2></a></option>';

            }

            $('#category').append(content);
            $('#category').select('refresh');
        }
    });
    });
