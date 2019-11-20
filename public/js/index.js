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
    var exists = false
    let json = {
            username: userValue,
            password: passwordValue
        }
    console.log(json)

    $.ajax({
        url: "/account",
        method: "POST",
        dataType: "JSON",
        contentType: "application/json",
        data: JSON.stringify(json),
        success: (result) =>{
            console.log(result)
            if(result.length != 0){
                exists = true;
                let aux = $(".alertSpot")[1];
                $(aux).addClass("alerts");
                $(aux).text("Username and password don't match any existing account");
            }
            else{
                let aux = $(".alertSpot")[1];
                $(aux).removeClass("alerts");
                $(aux).text("");
            }
        }
    });

    return exists;
}

loginBtn.on("click", event =>{
    event.preventDefault();
    
    var isValid = validateInputs();
    console.log(isValid)
    if(isValid){
        isValid = verifyIfAccountExists();
    }
    if(isValid){
        console.log("Successful login")
    }
});