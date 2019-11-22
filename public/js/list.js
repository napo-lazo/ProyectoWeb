let ciudad = "";
let base = $("#ul-list");
let vote = $(".voteup");
let cityText = $("#city");
let searchCity = $("#searchCity");
let cityInput = $("#cityInput");
var searching = false;


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
  

$.ajax({
    url: "/get-all-cities",
    method: "POST",
    success: (result) =>{
        autocomplete(document.getElementById("cityInput"), result);
    }
})



searchCity.on("click",e=>{
    ciudad = cityInput.val();
    if(ciudad.trim().length!=0){
        base.html("");
        cityText.html("<h1 class='cityText'>You are looking at artists from:</h1><h1>"+ciudad+"</h1>");
        searching = true;
        init();
    }
})


function init(){
    userName = Cookies.get("username");
    let serarch = "";
    let nameJson = {
        username: userName
    }
    if(!searching){
        if(typeof userName == "undefined"){
            search = "/artist-Accounts"
            cityText.html("<h1 class=cityText>You are looking at artist from</h1><h1>Everywhere</h1>");
        }else{
            $.ajax({
                url: "/get-city",
                method: "POST",
                dataType: "JSON",
                contentType: "application/json",
                data: JSON.stringify(nameJson),
                success: (result) =>{
                    cityText.html("<h1 class='cityText'>You are looking at artists from:</h1><h1>"+result['city']+"</h1>");
                }
            })
            search = "/artist-city";
        }
        console.log(userName);
        base.html("");
        $.ajax({
            url: search,
            method: "POST",
            dataType: "JSON",
            contentType: "application/json",
            data: JSON.stringify(nameJson),
            success: (result) =>{
                result.sort(sortByProperty("votes"));
                result.forEach(e =>{
                    console.log(e);
                    bandName = e['username'];
                    found = false;
                    base.append("<li><div class='flat'><div class='hori'> <input type='button' class='voteup' id="+e['username']+" value='+1'></div><div class='hori2'><p class='listPs'><b>Band:</b>"+e['username']+"</p><p class='listPs'><b>Votos:</b>"+e['votes'].length+"</div></div></li>");
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
                });
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
                    console.log(e);
                    bandName = e['username'];
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
                });
            }
        })
    }
}

base.on("click",".voteup",function(e){
    event.preventDefault();
    bandName = this.id;
    
    userName = Cookies.get("username");

    like = {
        band: bandName,
        user: userName
    }
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

init();

userName = Cookies.get("username");

if(Cookies.get("type") == "User"){
    $("#navbarDropdown").text(userName);
}else if(Cookies.get("type") == "Artist"){
    $("#navbarDropdown").text(userName);
}else{
    //???
}
