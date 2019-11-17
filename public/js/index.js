let registerBtn = $("#registerAccount");

registerBtn.on("click", event =>{
    event.preventDefault();

    //TODO: validate inputs

    let newAccount = {
        username: $("#sign_up_User").val(),
        password: $("#password_User").val(),
        city: $("#user_City").val(),
    }

    let type = $("input[name=type]");
    if (type[0].checked){
        newAccount["type"] = "User";
    }
    else{
        newAccount["type"] = "Artist";
    }

    //make call to insert in DB

});