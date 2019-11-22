userName = Cookies.get("connectedUser");

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
