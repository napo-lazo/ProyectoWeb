let city = "Monterrey";
let base = $("#ul-list");
let vote = $(".voteup");

function sortByProperty(property){  
    return function(a,b){  
       if(a[property] < b[property])  
          return 1;  
       else if(a[property] > b[property])  
          return -1;  
   
       return 0;  
    }  
 }

function init(){
    //primero es aggarrar a todas las bandas

    userName = Cookies.get("connectedUser");
    console.log(userName);
    base.html("");
    $.ajax({
        url: "/artist-Accounts",
        method: "POST",
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

base.on("click",".voteup",function(e){
    event.preventDefault();
    bandName = this.id;
    
    userName = Cookies.get("connectedUser");

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

