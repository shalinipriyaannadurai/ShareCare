$( document ).on("pagecreate", "#itemdetail", function(){
//    $( document ).on("#itemdetail","pagebeforeshow",function(event) {

        console.log("here" +localStorage.itemName);
    
            
        $("#itemimage").attr('src',localStorage.imageUrl);
            
        $("#productname").html(localStorage.itemName);
        $("#itemlocation").html(localStorage.itemLocation);
        $("#itemcategory").html(localStorage.itemType);
        $("#itemowner").html(localStorage.itemOwner);
        $("#itemownerphone").html(localStorage.itemOwner_phonenumber);
        $("#itemowneremail").html(localStorage.itemOwner_email);
            
        $('#mylist').listview('refresh');

        $("#itemdetail h3").html(localStorage.itemName);
//    });
});