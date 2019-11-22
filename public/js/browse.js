let base = $("#ul-list");
let searchCity = $("#searchCity");
let cityInput = $("#cityInput");
let vote = $(".voteup");
let cityText = $("#city");
var searching = false;
var searchingBand = false;
var bands = [];
let ciudad = "";
let bandInput = $("#bandInput");
let removeCity = $("#clearCity");
let searchBand = $("#searchBand")
let removeBand = $("#clearBand")
var banda = "";

function sortByProperty(property){  
    return function(a,b){
       if(a[property] < b[property])  
          return 1;
       else if(a[property] > b[property])  
          return -1;
       return 0;  
    }
}

function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          currentFocus++;
          addActive(x);
        } else if (e.keyCode == 38) {
          currentFocus--;
          addActive(x);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

searchCity.on("click",e=>{
    ciudad = cityInput.val();
    console.log(ciudad);
    if(ciudad.trim().length!=0){
        base.html("");
        cityText.html("<h1 class='cityText'>You are looking at artists from:</h1><h1>"+ciudad+"</h1>");
        searching = true;
        init();
    }
})

removeCity.on("click",e=>{
    searching = false;
    cityInput.val('');
    init();
})

searchBand.on("click",e=>{
    banda = bandInput.val();
    if(banda.trim().length!=0){
        searchingBand = true;
        init();
    }
})

removeBand.on("click",e=>{
    searchingBand = false;
    bandInput.val('');
    init();
})

base.on("click",".voteup",function(e){
    event.preventDefault();
    bandName = this.id;
    userName = Cookies.get("username");

    like = {
        band: bandName,
        user: userName
    }

    console.log(like);
    if(typeof userName == "undefined"){
        location.href = "index.html";
    }else{
        $.ajax({
            url: "/likes",
            method: "POST",
            dataType: "JSON",
            contentType: "application/json",
            data: JSON.stringify(like),
            success: (result) =>{
                console.log(result);
                init();
            }
        })
    }
})

function init(){

    base.html("");
    bands = [];
    userName = Cookies.get("username");
    if(!searching){
        cityText.html("<h1 class='cityText'>You are looking at artists from:</h1><h1>everywhere</h1>");
        $.ajax({
            url:"/artist-Accounts",
            method:"POST",
            dataType:"JSON",
            success:(result)=>{
                result.sort(sortByProperty("votes"));
                result.forEach(e=>{
                    bandName = e['username'];
                    if(searchingBand){
                        if(bandName.includes(banda)){
                            bands.push(bandName);
                            found = false;
                            base.append("<li><div class='flat'><div class='hori'> <input type='button' class='voteup' id="+e['username']+" value='+1'></div><div class='hori2'><p><b>Band:</b>"+e['username']+"</p><p><b>Votos:</b>"+e['votes'].length+"</div></div></li>");
                            e['votes'].forEach(vote =>{
                                if(vote == userName){
                                    found = true;
                                }
                            })
                            if(found){
                                $("#"+bandName).addClass("delete");
                                $("#"+bandName).attr("value","-1");
                            }else{
                                $("#"+bandName).attr("value","+1");
                                $("#"+bandName).addClass("vote");
                            }
                            if(typeof userName == "undefined"){
                                $("#"+bandName).addClass("login");
                                $("#"+bandName).attr("value","login");
                            }
                        }
                    }else{
                        bands.push(bandName);
                        found = false;
                        base.append("<li><div class='flat'><div class='hori'> <input type='button' class='voteup' id="+e['username']+" value='+1'></div><div class='hori2'><p><b>Band:</b>"+e['username']+"</p><p><b>Votos:</b>"+e['votes'].length+"</div></div></li>");
                        e['votes'].forEach(vote =>{
                            if(vote == userName){
                                found = true;
                            }
                        })
                        if(found){
                            $("#"+bandName).addClass("delete");
                            $("#"+bandName).attr("value","-1");
                        }else{
                            $("#"+bandName).attr("value","+1");
                            $("#"+bandName).addClass("vote");
                        }
                        if(typeof userName == "undefined"){
                            $("#"+bandName).addClass("login");
                            $("#"+bandName).attr("value","login");
                        }
                    }
                    
                    
                })
                if(bands.length==0){
                    base.append("<h1>It seems like there are not bands on this city</h1><h1>:(</h1>");
                }
                autocomplete(document.getElementById("bandInput"), bands);
            }
        })
    }else{
        base.html("");
        console.log(ciudad);
        let cityJson = {
            city: ciudad
        }
        $.ajax({
            url: "/artists-from-city",
            method: "POST",
            dataType: "JSON",
            contentType: "application/json",
            data: JSON.stringify(cityJson),
            success: (result) =>{
                result.sort(sortByProperty("votes"));
                result.forEach(e =>{
                    bandName = e['username'];
                    if(searchingBand){
                        if(bandName.includes(banda)){
                            bands.push(bandName);
                            found = false;
                            base.append("<li><div class='flat'><div class='hori'> <input type='button' class='voteup' id="+e['username']+" value='+1'></div><div class='hori2'><p><b>Band:</b>"+e['username']+"</p><p><b>Votos:</b>"+e['votes'].length+"</div></div></li>");
                            e['votes'].forEach(vote =>{
                                if(vote == userName){
                                    found = true;
                                }
                            })
                            if(found){
                                $("#"+bandName).addClass("delete");
                                $("#"+bandName).attr("value","-1");
                            }else{
                                $("#"+bandName).attr("value","+1");
                                $("#"+bandName).addClass("vote");
                            }
                            if(typeof userName == "undefined"){
                                $("#"+bandName).addClass("login");
                                $("#"+bandName).attr("value","login");
                            }
                        }
                    }else{
                        bands.push(bandName);
                        found = false;
                        base.append("<li><div class='flat'><div class='hori'> <input type='button' class='voteup' id="+e['username']+" value='+1'></div><div class='hori2'><p><b>Band:</b>"+e['username']+"</p><p><b>Votos:</b>"+e['votes'].length+"</div></div></li>");
                        e['votes'].forEach(vote =>{
                            if(vote == userName){
                                found = true;
                            }
                        })
                        if(found){
                            $("#"+bandName).addClass("delete");
                            $("#"+bandName).attr("value","-1");
                        }else{
                            $("#"+bandName).attr("value","+1");
                            $("#"+bandName).addClass("vote");
                        }
                        if(typeof userName == "undefined"){
                            $("#"+bandName).addClass("login");
                            $("#"+bandName).attr("value","login");
                        }
                    }
                });
                if(bands.length==0){
                    base.append("<h1>It seems like there are not bands on this city</h1><h1>:(</h1>");
                }
                autocomplete(document.getElementById("bandInput"), bands);
            }
        })
    }
}


$.ajax({
    url: "/get-all-cities",
    method: "POST",
    success: (result) =>{
        autocomplete(document.getElementById("cityInput"), result);
    }
})

init();

userName = Cookies.get("connectedUser");

if(Cookies.get("type") == "User"){
    $("#navbarDropdown").text(userName);
}else if(Cookies.get("type") == "Artist"){
    $("#navbarDropdown").text(userName);
}else{
    //$("#navbarDropdown").addClass("d-none");
    $("#loginNavbar").removeClass("d-none");
    $("#navBarFeed").addClass('disabled');
    $("#navBarLog").text("Log In");
}
