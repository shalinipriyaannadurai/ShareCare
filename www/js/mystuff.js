
// $( document ).on("pagecreate", "#my_stuff", function() {
// });

// $(document).ready(function(){
//  //alert("init");
// })

// $( document ).delegate("#my_stuff", "pageinit", function() {
//  // alert('init');

// });


$( document ).delegate("#my_stuff", "pagebeforeshow", function() {
 
//alert('Init');


  $.ajax({

  
    url: baseURL+"fetchmyproducts.php?address=&email=&typeid=",
   

		dataType: "text",
		//force to handle it as text

		success: function(data) {
		//data downloaded so we call parseJSON function 
		//and pass downloaded data
		var json = $.parseJSON(data);

		var statusval = json.status_code;

		if (statusval == 7347) {

		


		var stuffsArray = json.myproducts;

		var content = '';

		for (var i = 0; i < stuffsArray.length; i++) {


		var stuffObj = stuffsArray[i];

		// var btnID = "btn"+stuffObj.id;
		// var imgID = "img"+stuffObj.id;
		// var pgID = "pg"+stuffObj.id;
		// var headID = "hh"+stuffObj.id;


		var btnID = "btn"+i;
		var imgID = "img"+i;
		var pgID = "pg"+i;
		var headID = "hh"+i;

		//crossOrigin="anonymous"

stuffObj.imageurl = stuffObj.imageurl.length == 0 ? 'images/camericon.png' : baseURL+stuffObj.imageurl ;
            
            content += '<li><a id ='+btnID+' ><img class= "circularThumbnail ui-li-thumb" id ="'+imgID+'" src="' +stuffObj.imageurl+ '" onerror="this.onerror=null;this.src='+errorImage+';" /><h2 id ="'+headID+'">'+stuffObj.productname+'</h2><p id="'+pgID+'">'+stuffObj.uploaddate+'</p></a></li>';



		}


	$('#mystuffContent ul').html(content);
		$('#mystuffContent ul').listview('refresh');

 //alert('beforeshow'+content);



$(document).on('click', '#mystufflistitem li a', function(e){
//     console.log('firing');
// });

// console.log($.mobile.urlHistory.stack);

		// Added click event for a tag in list view 
	//	$("#listItem").on('click', 'li a', function (e) {

var idVal = $(this).attr('id');

var selectedIndexID =idVal.replace("btn", "");
var currentItem = stuffsArray[selectedIndexID];



		

			// alert('init'+selectedIndexID+idVal);

		var imageID =idVal.replace("btn", "img");

		var paragraphID =idVal.replace("btn", "pg");

		var headerID =idVal.replace("btn", "hh");




		//get the image

		img = $('#'+imageID).get(0);

		//alert(imageID);

		window.localStorage.clear();

		// localStorage.removeItem('imageUrl');
		// localStorage.removeItem('itemName');
		// localStorage.removeItem('itemlocation');
		// localStorage.removeItem('itemUploadedDate');

        localStorage.uniqueid = currentItem.uniqueid;
        localStorage.imageUrl = currentItem.imageurl;
		localStorage.itemName = currentItem.productname;
		localStorage.itemlocation = currentItem.address;
		localStorage.itemUploadedDate = currentItem.uploaddate;
		// localStorage.imageUrl = img.src;
		// localStorage.itemName = $('#'+headerID).text();
		// localStorage.itemlocation = $('#'+paragraphID).text();
		// localStorage.itemUploadedDate = $('#'+headerID).text();

//alert("slide");
		// $.mobile.pageContainer.pagecontainer("change", "my_stuff_details.html", { transition: 'slide',
		// reload    : true });
		// });

		
// 		$.mobile.loadPage( "my_stuff_details.html", true, {

// });



	// 	 $.mobile.pageContainer.pagecontainer("change", "my_stuff_details.html", { transition: 'slide',
	// 	 reload    : true 
	// });



 if (e.handled !== true) { 


    e.handled = true;  
	$.mobile.changePage('my_stuff_details.html', {transition: 'slide'});
}




		 });

//$.mobile.navigate( "my_stuff_details.html" );

 // $.mobile.navigate( "my_stuff_details.html", {  });
 


	
		}// if 7347 ended

		else if (statusval == 3477) {
			alert(json.status_message);
		}

	}

		// error: function (xhr, ajaxOptions, thrownError) {
  //     alert(xhr.status);
  //     alert(thrownError);
   // }
		});

});



