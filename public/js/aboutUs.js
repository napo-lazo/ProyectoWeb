userName = Cookies.get("connectedUser");

if(Cookies.get("type") == "User"){
    $("#navbarDropdown").text(userName);
}else if(Cookies.get("type") == "Artist"){
    $("#navbarDropdown").text(userName);
}else{
    //???
}
