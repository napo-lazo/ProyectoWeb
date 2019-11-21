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
    base.html("");
    $.ajax({
        url: "/artist-Accounts",
        method: "POST",
        success: (result) =>{
            result.sort(sortByProperty("votes"));
            result.forEach(e =>{
                console.log(e);
                base.append("<li><div class='flat'><div class='hori'> <input type='button' class='voteup' id="+e['username']+" value='+1'></div><div class='hori2'><p><b>Band:</b>"+e['username']+"</p><p><b>Votos:</b>"+e['votes'].length+"</div></div></li>");
            });
        }
    })
}

base.on("click",".voteup",function(e){
    event.preventDefault();
    bandName = this.id;
    
    //TODO GET COOKIES SO THAT I CAN GET THE USERNAME
    //get name of user
    let userName = "pepeadame";
    //check if he is not on the list
    like = {
        band: bandName,
        user: userName
    }
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
})

init();

