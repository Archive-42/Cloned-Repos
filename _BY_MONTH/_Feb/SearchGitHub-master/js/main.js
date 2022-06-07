$(document).ready(()=>{
   $('#SearchUsers').on('keyup',(keys)=>{
    let userName=keys.target.value;
    //Make a request to Github api users
    $.ajax({
        url:'https://api.github.com/users/'+userName,
        data:{
            client_id:'f8584e484459d556c540',
            client_secret:'15a1f4e81a3d32a50e22c963ffd8dabbdff4d4fd'
        }
    }).done((user)=>{
        console.log(user);
        $.ajax({
            url:'https://api.github.com/users/'+userName+'/repos',
            data:{
                client_id:'f8584e484459d556c540',
                client_secret:'15a1f4e81a3d32a50e22c963ffd8dabbdff4d4fd',
                sort:'created: asc',
                per_page:5
            }
        }).done(function(repos){
            $.each(repos,(index,repo)=>{
                $('#repos').append(`
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <strong> ${repo.name}:</strong>${repo.description}
                        </div>
                        <div class="col-md-4">
                            <span  class="label label-primary">Forks: ${user.forks_count}</span>
                            <span  class="label label-secondary">Watchers:${user.watchers_count}</span>
                            <span  class="label label-success">Stars:${user.startgazers_count}</span>                        
                        </div>
                        <div class="col-md-2">
                            <a href="${repo.html_url}" class="btn btn-primary" target="_blank">View Repo Page</a>
                        </div>

                    </div>
                </div>
            </div>
                `);
            });

        });

        $('#profile').html(`
        <div class="card profileBody" >
           
            <h4 class="card-title">${user.name}</h4>
                <div class="card-body">
                   <div class="row">
                        <div class="col-md-3">
                            <img class="card-img-top avatar" src="${user.avatar_url}" alt="User Img Not Available">
                            <br/><br/>
                            <a href="${user.html_url}" class="btn btn-primary" target="_blank">View Profile</a>
                        </div>

                        <div class="col-md-9">
                            <span  class="label label-primary">Public Repos: ${user.public_repos}</span>
                            <span  class="label label-secondary">Public Gists:${user.public_gists}</span>
                            <span  class="label label-success">Followers:${user.followers}</span>
                            <span  class="label label-info">Following:${user.following}</span>
                            <br/><br/>
                            <ul class="list-group">
                                <li class="list-group-item">Company:${user.company}</li>
                                <li class="list-group-item">Website/Blog:<a href="${user.blog}" target="_blank">${user.blog}</a></li>
                                <li class="list-group-item">Location:${user.location}</li>
                                <li class="list-group-item">Member Since:${user.created_at}</li>
                            </ul>
                        </div>                  
                    </div>
                </div>
        </div>

         <h3 class="page-header"> Latest repo</h3>
         <div id="repos" class="profileBody"></div>
        
        `);
    });

   });
});