let base = $("#ul-list-posts");
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
    userName = Cookies.get("username");
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
            result.sort(sortByProperty("time"));
            result.forEach(e => {
                base.append("<li>" +
                                "<div class='posts'>" +
                                    "<div class='flex'>" +
                                        "<p>Time: "+e['dateOfPublication']+"</p>" +
                                        "<p>Artist: "+e['publishedBy']+"</p>" +
                                    "</div>" +
                                    "<p class='title'>Title: "+e['title']+"</p>" +
                                    "<p>Description: "+e['description']+"</p>" +
                                "</div>" +
                            "</li>");
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
            result.sort(sortByProperty("time"));
            result.forEach(e => {
                base.append("<li>" +
                                "<div class='posts'>" +
                                    "<div class='flex'>" +
                                        "<p>Time: "+e['dateOfPublication']+"</p>" +
                                        "<p>Artist: "+e['publishedBy']+"</p>" +
                                    "</div>" +
                                    "<p class='title'>Title: "+e['title']+"</p>" +
                                    "<p>Description: "+e['description']+"</p>" +
                                "</div>" +
                            "</li>");
            });
        }
    })

}

function initBand(bandName){
    base.html("");

    let json = {
        publishedBy : bandName
    }

    $.ajax({
        url: "/artist-Posts",
        method: "POST",
        dataType:"JSON",
        contentType: "application/json",
        data: JSON.stringify(json),
        success: (result) =>{
            result.sort(sortByProperty("time"));
            result.forEach(e => {
                base.append("<li>" +
                                "<div class='posts'>" +
                                    "<div class='flex'>" +
                                        "<p>Time: "+e['dateOfPublication']+"</p>" +
                                        "<p>Artist: "+e['publishedBy']+"</p>" +
                                    "</div>" +
                                    "<p class='title'>Title: "+e['title']+"</p>" +
                                    "<p>Description: "+e['description']+"</p>" +
                                "</div>" +
                            "</li>");
            });
        }
    })
}

btnSpace.on("click", ".btn", event =>{
    window.location.href = "/postCreation.html";
});

let url = new URL(window.location.href) 
let bandName = url.searchParams.get("band");
if(bandName){
    $(title).text("Posts from "+ bandName);
    initBand(bandName)
}
else if(Cookies.get("type") == "User"){
    $(title).text("Posts from your favorite bands");
    initUser();
}else if(Cookies.get("type") == "Artist"){
    $(title).text("Your posts");
    $(btnSpace).prepend('<input class="btn btn-primary" type="button" value="Create post"></input>');
    initArtist();
}else{
    $(title).text("Please log in to see posts");
}


userName = Cookies.get("username");

if(Cookies.get("type") == "User"){
    $("#navbarDropdown").text(userName);
}else if(Cookies.get("type") == "Artist"){
    $("#navbarDropdown").text(userName);
    $("#postSpot").removeClass("disabled");
}else{
    $("#loginNavbar").removeClass("d-none");
    $("#navBarFeed").addClass('disabled');
    $("#navBarLog").text("Log In");
}
