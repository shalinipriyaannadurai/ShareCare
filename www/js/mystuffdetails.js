
$( document ).on("pagecreate", "#my_stuff_details", function() {

	function onSuccess(data)
	{

// alert(data.status_message);
}  
function  onError(request, status, error) {
// alert(request.responseText);
}


$(document).on('click', '#doneBtn', function(e){

	if (e.handled !== true) { 

		e.handled = true;  
		$.mobile.changePage('my_stuff.html', {
			transition: 'slide',
			reverse : true
		});
	}
});//onclick ended

$(document).on('click', '#takenaway', function(e){


// Update the server saying  item is taken
var unqID = localStorage.getItem('uniqueid');

$.ajax({
	type: "POST",
	url: baseURL+"giveaway.php",
	data: (
	{
		istaken: 1,
		uniqueid: unqID
	}),
	cache: false,
	dataType: "text",
	success: onSuccess,
	error: onError
});

});//onclick ended
//if ended


//var theName = $.trim($("#theName").val());




//   $("#resultLog").ajaxError(function(event, request, settings, exception) {
//$("#resultLog").html("Error Calling: " + settings.url + "<br />HTTP Code: " + request.status);








});



$( document ).delegate("#my_stuff_details", "pagebeforeshow", function(e) {


	bannerImg = $('#fullImage').get(0);
// titleH = $('#uploadedDate').get(0);
// paragraghP = $('#location').get(0);




bannerImg.src = localStorage.getItem('imageUrl');

$('#headertitle').append(localStorage.getItem('itemName'));
$('#mystufflocation').append(localStorage.getItem('itemlocation'));
$('#uploadedDate').append(localStorage.getItem('itemUploadedDate'));



});
