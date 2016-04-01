



$( document ).on("pagecreate", "#stuffs", function() {

	$(document).on('click', '#backedBtn', function(e){
	
	// e.preventDefault();
	if (e.handled !== true) { 

    e.handled = true;  
	$.mobile.changePage('index.html', {
		transition: 'slide',
		reverse : true
	});
}


 	});

});


$( document ).delegate("#stuffs", "pagebeforeshow", function(e) {

	var selected_item = localStorage.getItem('selected_item_type');
	var selected_place_name = localStorage.getItem('find_place_name');
	if (selected_place_name==null) {
		selected_place_name = "";
	};
    console.log(baseURL+"fetchmyproducts.php?address="+selected_place_name+"&email=&typeid="+selected_item);
 $.ajax({

  
    url: baseURL+"fetchmyproducts.php?address="+selected_place_name+"&email=&typeid="+selected_item,
   


		dataType: "text",
		//force to handle it as text

		success: function(data) {
		//data downloaded so we call parseJSON function 
		//and pass downloaded data
		var json = $.parseJSON(data);


		var statusval = json.status_code;

		if (statusval == 7347) {

		


		var stuffsArray = json.myproducts;

		if (stuffsArray.length==0) {
			var selected_Type = localStorage.getItem('itemtype');
				alert("No items found in "+selected_Type+" category.");

		};

		var content = '';

		for (var i = 0; i < stuffsArray.length; i++) {


		var stuffObj = stuffsArray[i];

		// var btnID = "btn"+stuffObj.id;
		// var imgID = "img"+stuffObj.id;
		// var pgID = "pg"+stuffObj.id;
		// var headID = "hh"+stuffObj.id;


		var btnID = "btni"+i;
		var imgID = "imgi"+i;
		var pgID = "pgi"+i;
		var headID = "hhi"+i;

		//crossOrigin="anonymous"


//        stuffObj.imageurl = stuffObj.imageurl.length == 0 ? localStorage.selected_type_image : baseURL+stuffObj.imageurl ;
                    stuffObj.imageurl = stuffObj.imageurl.length == 0 ? 'images/camericon.png' : baseURL+stuffObj.imageurl ;

            
		content += '<li><a id ='+btnID+' ><img class= "circularThumbnail ui-li-thumb" id ="'+imgID+'" src="' +stuffObj.imageurl+ '"  alt="No Image" onerror="this.onerror=null;this.src='+errorImage+';"/><h2 id ="'+headID+'">'+stuffObj.productname+'</h2><p id="'+pgID+'">'+stuffObj.uploaddate+'</p></a></li>';



		}


	$('#stufflistItem').html(content);
    $('#stufflistItem').listview('refresh');

 //alert('beforeshow'+content);



$(document).on('click', '#stufflistItem li a', function(e){
//     console.log('firing');
// });

// console.log($.mobile.urlHistory.stack);

		// Added click event for a tag in list view 
	//	$("#listItem").on('click', 'li a', function (e) {

var idVal = $(this).attr('id');

var selectedIndexID =idVal.replace("btni", "");
var currentItem = stuffsArray[selectedIndexID];


		var imageID =idVal.replace("btni", "img");

		var paragraphID =idVal.replace("btni", "pg");

		var headerID =idVal.replace("btni", "hh");




		//get the image

		img = $('#'+imageID).get(0);
    
        localStorage.setItem("uniqueid", currentItem.uniqueid);
        localStorage.setItem("imageUrl", currentItem.imageurl);
		localStorage.setItem("itemName", currentItem.productname);
        localStorage.setItem("itemType", currentItem.type);
		localStorage.setItem("itemLocation", currentItem.address);
		localStorage.setItem("itemUploadedDate", currentItem.uploaddate);		
        localStorage.setItem("itemOwner", currentItem.username);
        localStorage.setItem("itemOwner_phonenumber",currentItem.phonenumber);
        localStorage.setItem("itemOwner_email", currentItem.email);
 if (e.handled !== true) { 


    e.handled = true;  
     $.mobile.changePage('itemdetail.html', {transition: 'slide'});
     
}




});

//$.mobile.navigate( "my_stuff_details.html" );

 // $.mobile.navigate( "my_stuff_details.html", {  });
 


	
		}// if 7347 ended

		else if (statusval == 3477) {
			alert(json.status_message);
		}

	}
		});


});

