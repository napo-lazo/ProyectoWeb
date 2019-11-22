let createPost = $("#createPost");

function validateInputs(){
    let title = $("#titlePost").val();
    let desc = $("#descPost").val();
    var isValid = true;

    if(title.trim().length == 0){
        let aux = $(".alertSpot")[0];
        $(aux).addClass("alerts");
        $(aux).text("No title given");
        isValid = false;
    }
    else{
        let aux = $(".alertSpot")[0];
        $(aux).removeClass("alerts");
        $(aux).text("");
    }

    if(desc.trim().length == 0){
        let aux = $(".alertSpot")[1];
        $(aux).addClass("alerts");
        $(aux).text("No description given");
        isValid = false;
    }
    else{
        let aux = $(".alertSpot")[1];
        $(aux).removeClass("alerts");
        $(aux).text("");
    }

    return isValid;
}

function publishPost(){

    let date = new Date();

    let newPost = {
        title: $("#titlePost").val(),
        description: $("#descPost").val(),
        dateOfPublication : date.getDate() + "/" +  date.getMonth() + "/" + date.getFullYear(),
        publishedBy : Cookies.get("username")
    }

    $.ajax({
        url: "/post",
        method: "POST",
        dataType: "JSON",
        contentType: "application/json",
        data: JSON.stringify(newPost),
        success: (result) =>{
            $.ajax({
                url: "/posts",
                method: "GET",
                success: (result) =>{
                    window.location.replace("/user-feed.html");
                }
            });
        }
     });
}

createPost.on("click", event =>{
    event.preventDefault();

    
    let isValid = validateInputs();
    
    if(isValid){
        publishPost()
    }

});

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
