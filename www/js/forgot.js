$( document ).on("pagecreate", "#forgot", function() {
                 $('input[id=forgot]').click(function(){
                                            var email = $("#email").val();
                                            // Checking for blank fields.
                                            if( email ==''){
                                            $('input[type="text"]').css("border","2px solid red");
                                            $('input[type="text"]').css("box-shadow","0 0 3px red");
                                            alert("Please fill all fields...!!!!!!");
                                            }else {
                                            $.post("forgot.php",{ email1: email, password1:password},
                                                   function(data) {
                                                   if(data=='Invalid Email.......') {
                                                   $('input[type="text"]').css({"border":"2px solid red","box-shadow":"0 0 3px red"});
                                                   alert(data);
                                                   }else if(data=='Email is wrong...!!!!'){
                                                   $('input[type="text"]').css({"border":"2px solid red","box-shadow":"0 0 3px red"});
                                                   alert(data);
                                                   } else if(data=='Successfully Logged in...'){
                                                   $("form")[0].reset();
                                                   $('input[type="text"]').css({"border":"2px solid #00F5FF","box-shadow":"0 0 5px #00F5FF"});
                                                   alert(data);
                                                   } else{
                                                   alert(data);
                                                   }
                                                   });
                                            }
                                            });
                 });