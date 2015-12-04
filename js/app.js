// https://api.github.com/repositories?since=500  
// https://api.github.com/repositories

$(function(){
  $('#ghsubmitbtn1').on('click', function(e){
    e.preventDefault();
    
    var username = $('#ghusername').val();
    var reqesturi   = 'https://api.github.com/users/'+username;
    var responsuri  = 'https://api.github.com/users/'+username+'/repos';

    requestJSON(reqesturi, function(json) {

    	     if(json.message == "Not Found" || username == '') {
		        $('#ghapidata1').html("<h2>No repo Found</h2>");
		      }
		      
		      else {
		        // else we have a repo and we display their info
		        var fullname   = json.name;
		        var username   = json.login;
		        var aviurl     = json.avatar_url;
		        var profileurl = json.html_url;
		        var location   = json.location;
		        var followersnum = json.followers;
		        var followingnum = json.following;
		        var reposnum     = json.public_repos;
            var id = json.id;
		        
		        
		        if(fullname == undefined) { fullname = username; }

        var outhtml = '<h2>'+fullname+' (@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</h2>';
        outhtml = outhtml + '<a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username+'"></a>';
        outhtml = outhtml + '<p>Followers: '+followersnum+' - Following: '+followingnum+'<br>Repos: '+reposnum+'</p></div>';
        
        outhtml = outhtml + '<p>id: '+id+'</p></div>';

        outhtml = outhtml + '<div class="repolist clearfix">';

        var repositories;
        $.getJSON(responsuri, function(json){
          repositories = json;   
          outputPageContent();                
        });          
        
        function outputPageContent() {
          if(repositories.length == 0) { outhtml = outhtml + '<p>No repos!</p></div>'; }
          else {
            outhtml = outhtml + '<p><strong>Repos List:</strong></p> <ul>';
            $.each(repositories, function(index) {
              outhtml = outhtml + '<li><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '</a></li>';
            });
            outhtml = outhtml + '</ul></div>'; 
          }
          $('#ghapidata1').html(outhtml);
        } // end outputPageContent()
      } // end else statement
    }); // end requestJSON Ajax call
  }); // end click event handler


  $('#ghsubmitbtn2').on('click', function(e){
    e.preventDefault();
    
    var repos = $('#ghrepos').val();
    var reqesturi   = 'https://api.github.com/repositories' ;
    // var responsuri  = 'https://api.github.com/search/repositories?q=' + repos  ;
    var responsuri  = 'https://api.github.com/repositories?q=' + repos  ;

    requestJSON(reqesturi, function(json) {

           if(json.message == "Not Found" || repos == '') {
            $('#ghapidata2').html("<h2>No repo Found</h2>");
          }
          
          else {
            // else we have a repo and we display their info
 
            
            
        var id = json.id;
        var repoUrl = json.repos_url
        var outhtml = '<h2>'+repos +' </h2>';

        var repositories;
        $.getJSON(responsuri, function(json){
          repositories = json;   
          outputPageContent();                
        });          
        
        function outputPageContent() {
          if(repositories.length == 0) { outhtml = outhtml + '<p>No repos!</p></div>'; }
          else {
            outhtml = outhtml + '<p><strong>Repos List:</strong></p> <ul>';
            $.each(repositories, function(index) {
              // outhtml = outhtml + '<li><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '</a></li>';
outhtml = outhtml + '<li><a href="'+repositories[index].repoUrl+'" target="_blank">'+repositories[index].name + '</a></li>';

            });
            outhtml = outhtml + '</ul></div>'; 
          }
          $('#ghapidata2').html(outhtml);
        } // end outputPageContent()
      } // end else statement
    }); // end requestJSON Ajax call
  }); // end click event handler






  function requestJSON(url, callback) {
    $.ajax({
      url: url,
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
  }
  });