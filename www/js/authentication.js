$( document ).on("pagecreate", "#find_stuff", function() {
                 
                 $(document).on('click', '#facebook', function(e) {
                                console.log("facebook ");
                                FB.getLoginStatus(function(response) {
                                                  if (response.status === 'connected') {
                                                  console.log('Logged in.');
                                                  }
                                                  else {
                                                  FB.login(function(response) {
                                                           if (response.authResponse) {
                                                           alert('Success!');
                                                           }else{
                                                           alert('Login Failed!');
                                                           }
                                                           }, {scope: 'email'});
                                                  }
                                                  });
                                
                                });
                
                 });