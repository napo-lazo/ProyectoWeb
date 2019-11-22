let loginBtn = $("#userLogin");

function validateInputs(){
    let username = $("#login_User").val();
    let password = $("#password_login").val();
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
    return isValid;
};

function verifyIfAccountExists(){

    let userValue = $("#login_User").val();
    let passwordValue = $("#password_login").val();
    let json = {
            username: userValue,
            password: passwordValue
        }

    $.ajax({
        url: "/account",
        method: "POST",
        dataType: "JSON",
        contentType: "application/json",
        data: JSON.stringify(json),
        success: (result) =>{
            if(result.length != 0){
                let aux = $(".alertSpot")[1];
                $(aux).removeClass("alerts");
                $(aux).text("");
                Cookies.set("username", result[0]["username"]);
                Cookies.set("type", result[0]["type"]);
                window.location.replace("/list.html");
            }
            else{
                let aux = $(".alertSpot")[1];
                $(aux).addClass("alerts");
                $(aux).text("Username and password don't match any existing account");
            }
        }
    });
}


$("#password_login").on('keypress',function(e){
    if(e.which === 13){
        loginBtn.click();
    }
})

$("#guestLog").on("click",e=>{
    window.location.replace("/list.html");
})

loginBtn.on("click", event =>{
    event.preventDefault();
    var isValid = validateInputs();
    if(isValid){
        verifyIfAccountExists()
    }
});