let base = $("#ul-list");
let title = $('h1')[0];
let btnSpace = $('#user-feed-posts');

function sortByProperty(property){  
    return function(a,b){
       if(a[property] < b[property])  
          return 1;
       else if(a[property] > b[property])  
          return -1;
       return 0;  
    }
}

//TODO: DECIRLE AL USUARIO SI NO ESTA LOGED IN QUE NO PUEDE VER ESTA PAGINA
function initUser(){
    base.html("");
    userName = Cookies.get("connectedUser");
    $("#navbarDropdown").text(userName);
    console.log(userName);
    let nameJson={
        username:userName
    }
    $.ajax({
        url: "/get-posts-favorite",
        method: "POST",
        dataType:"JSON",
        contentType: "application/json",
        data: JSON.stringify(nameJson),
        success: (result) =>{
            console.log(result);
            result.sort(sortByProperty("time"));
            result.forEach(e => {
                base.append("<li><div class='posts'><div class='flex'><p>Time: "+e['dateOfPublication']+"</p><p>Artist: "+e['publishedBy']+"</p></div><p class='title'>Title: "+e['title']+"</p><p>Description: "+e['description']+"</p></div></li>");
            });
        }
    })
}

function initArtist(){
    base.html("");

    let json = {
        publishedBy : Cookies.get("username")
    }
    $.ajax({
        url: "/artist-Posts",
        method: "POST",
        dataType:"JSON",
        contentType: "application/json",
        data: JSON.stringify(json),
        success: (result) =>{
            console.log(result);
            result.sort(sortByProperty("time"));
            result.forEach(e => {
                base.append("<li><div class='posts'><div class='flex'><p>Time: "+e['dateOfPublication']+"</p><p>Artist: "+e['publishedBy']+"</p></div><p class='title'>Title: "+e['title']+"</p><p>Description: "+e['description']+"</p></div></li>");
            });
        }
    })

}

btnSpace.on("click", ".btn", event =>{
    window.location.href = "/postCreation.html";
});

if(Cookies.get("type") == "User"){
    console.log("viendo usuario");
    $(title).text("Posts from your favorite bands");
    initUser();
}else if(Cookies.get("type") == "Artist"){
    console.log("viendo artista");
    $(title).text("Your posts");
    $(btnSpace).prepend('<input class="btn btn-primary" type="button" value="Create post"></input>');
    initArtist();
}else{
    $(title).text("Please log in to see posts");
}


