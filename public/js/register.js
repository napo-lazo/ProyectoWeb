let registerBtn = $("#registerAccount");
let formBody = $("#mainForm");

function validateInputs(){
    let username = $("#sign_up_User").val();
    let password = $("#password_User").val();
    let city = $("#user_City").val();
    let type = $("input[name=type]:checked");
    var isValid = true;

    if(username.trim().length == 0){
        let aux = $(".alertSpot")[0];
        $(aux).addClass("alerts");
        $(aux).text("No username given");
        isValid = false;
    }
    else{
        let aux = $(".alertSpot")[0];
        $(aux).removeClass("alerts");
        $(aux).text("");
    }

    if(password.trim().length == 0){
        let aux = $(".alertSpot")[1];
        $(aux).addClass("alerts");
        $(aux).text("No password given");
        isValid = false;
    }
    else{
        let aux = $(".alertSpot")[1];
        $(aux).removeClass("alerts");
        $(aux).text("");
    }
    
    if(city == null){
        let aux = $(".alertSpot")[2];
        $(aux).addClass("alerts");
        $(aux).text("No city selected");
        isValid = false;
    }
    else{
        let aux = $(".alertSpot")[2];
        $(aux).removeClass("alerts");
        $(aux).text("");
    }

    if(type.length == 0){
        let aux = $(".alertSpot")[3];
        $(aux).addClass("alerts");
        $(aux).text("No type selected");
        isValid = false;
    }
    else{
        let aux = $(".alertSpot")[3];
        $(aux).removeClass("alerts");
        $(aux).text("");
    }

    return isValid;
}

function createAccount(){
    let newAccount = {
        username: $("#si    n_up_User").val(),
        password: $("#password_User").val(),
        city: $("#user_City").val(),
    }

    let type = $("input[name=type]");
    if (type[0].checked){
        newAccount["type"] = "User";
    }
    else{
        newAccount["type"] = "Artist";
        newAccount['description'] = $("#artist-description").val();
        newAccount['genre'] = $("#artist-genre").val();
    }
    newAccount["votes"] = 0;
    $.ajax({
        url: "/accounts",
        method: "POST",
        dataType: "JSON",
        contentType: "application/json",
        data: JSON.stringify(newAccount),
        success: (result) =>{
            console.log(result);
            window.location.replace("/index.html");
        }
     });
}

function hideArtist(){
    $("#artist-genre").hide();
    $("#artist-description").hide();
}

function showArtist(){
    $("#artist-genre").show();
    $("#artist-description").show();
}

function verifyIfAccountExists(){

    let value = $("#sign_up_User").val();
    let json = {
            username: value
        }
    

    $.ajax({
        url: "/account",
        method: "POST",
        dataType: "JSON",
        contentType: "application/json",
        data: JSON.stringify(json),
        success: (result) =>{
            if(result.length != 0){
                let aux = $(".alertSpot")[0];
                $(aux).addClass("alerts");
                $(aux).text("Username already exists");
            }
            else{
                let aux = $(".alertSpot")[0];
                $(aux).removeClass("alerts");
                $(aux).text("");
                createAccount();
            }
        }
    });
}

registerBtn.on("click", event =>{
    event.preventDefault();

    let isValid = validateInputs();

    if (isValid){
        verifyIfAccountExists()
    }

    $.ajax({
        url: "/accounts",
        method: "GET",
        success: (result) =>{
            console.log(result)
        }
    });

});

hideArtist();