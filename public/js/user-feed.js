let base = $("#ul-list");
let title = $('h1')[0];
let btnSpace = $('#user-feed-posts');

function initUser(){
    base.html("");

    $.ajax({
        url: "/posts",
        method: "GET",
        dataType:"JSON",
        success: (result) =>{
            console.log(result);
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
    $(title).text("Posts from your favorite bands");
    initUser();
}
else{
    $(title).text("Your posts");
    $(btnSpace).prepend('<input class="btn btn-primary" type="button" value="Create post"></input>');
}


