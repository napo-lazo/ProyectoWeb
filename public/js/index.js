let registerBtn = $("#registerAccount");
let formBody = $("#mainForm");

registerBtn.on("click", event =>{
    event.preventDefault();

    //TODO: validate inputs
    //TODO: verify account doesnt already exists

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

    $.ajax({
        url: "/accounts",
        method: "POST",
        dataType: "JSON",
        contentType: "application/json",
        data: JSON.stringify(newAccount),
        success: (result) =>{
            console.log(result)
        }
    });

    $.ajax({
        url: "/accounts",
        method: "GET",
        success: (result) =>{
            console.log(result)
        }
    });

});