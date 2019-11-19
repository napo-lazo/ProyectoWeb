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

    if(password.trim().length == 0){
        let aux = $(".alertSpot")[1];
        $(aux).addClass("alerts");
        $(aux).text("No password given");
        isValid = false;
    }
    
    if(city == null){
        let aux = $(".alertSpot")[2];
        $(aux).addClass("alerts");
        $(aux).text("No city selected");
        isValid = false;
    }

    if(type.length == 0){
        let aux = $(".alertSpot")[3];
        $(aux).addClass("alerts");
        $(aux).text("No type selected");
        isValid = false;
    }

    return isValid;
}

function verifyIfAccountExists(){

    let value = $("#sign_up_User").val();
    console.log(value)

    $.ajax({
        url: "/accounts?username=" + value,
        method: "GET",
        success: (result) =>{
            console.log(result)
        }
    });

}

registerBtn.on("click", event =>{
    event.preventDefault();

    let isValid = validateInputs();

    if (isValid){
        verifyIfAccountExists();
    }
    

    //TODO: verify account doesnt already exists

    if(isValid){

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

        // $.ajax({
        //     url: "/accounts",
        //     method: "POST",
        //     dataType: "JSON",
        //     contentType: "application/json",
        //     data: JSON.stringify(newAccount),
        //     success: (result) =>{
        //         console.log(result)
        //     }
        // });

    }
    $.ajax({
        url: "/accounts",
        method: "GET",
        success: (result) =>{
            console.log(result)
        }
    });

});