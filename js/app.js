$(function(){
 $('#ghsubmitbtn1').on('click', function(e){
    e.preventDefault();
      $('#ghapidata1').html('<div id="loader"><img src="css/loader.gif" alt="loading..."></div>');
        var repos = $('#ghrepos').val();
        var reqesturi   = 'https://api.github.com/repositories' ;
        var responsuri  = 'https://api.github.com/repositories?q=' + repos  ;

        requestJSON(reqesturi, function(json) {

          if(json.message == "Not Found" || repos == '') {
            $('#ghapidata1').html("<h2>No repo Found</h2>");
          } else {
            var id = json.id;
            var repoUrl = json.repos_url;
            var full_name = json.full_name;
            var commits = json.git_commits_url;
            var outhtml = '<h2>'+repos +' </h2>';
            outhtml = outhtml + '<div class="repolist ">';

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
                  outhtml = outhtml + '<li><a href="'+repositories[index].repoUrl+'" target="_blank">'+repositories[index].name + '</a></li>';
                  outhtml = outhtml + '<p><strong>Full Name</strong>: '+repositories[index].full_name+'</p></div>';
                  outhtml = outhtml + '<p><strong>Commits</strong>: '+repositories[index].commits+'</p></div>';

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
      $('#ghapidata2').html('<div id="loader"><img src="css/loader.gif" alt="loading..."></div>');

    
    var username = $('#ghusername').val();
    var reqesturi   = 'https://api.github.com/users/'+username;
    var responsuri  = 'https://api.github.com/users/'+username+'/repos';

    requestJSON(reqesturi, function(json) {

           if(json.message == "Not Found" || username == '') {
            $('#ghapidata2').html("<h2>No repo Found</h2>");
          }
          
          else {
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
            outhtml = outhtml + '<p><strong>Followers</strong>: '+followersnum+' - <strong>Following</strong>: '+followingnum+'<br><strong>Repos:</strong> '+reposnum+'</p></div>';
            
            outhtml = outhtml + '<p><strong>id</strong>: '+id+'</p></div>';

            outhtml = outhtml + '<div class="repolist ">';

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