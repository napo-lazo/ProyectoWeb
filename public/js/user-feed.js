let base = $("#ul-list");

function sortByProperty(property){  
    return function(a,b){
       if(a[property] < b[property])  
          return 1;
       else if(a[property] > b[property])  
          return -1;
       return 0;  
    }
}

//TODO: DECIRLE AL USUARIO SI NO ESTA LOGED IN QUE NO PUEDE VER ESTA PAGINA
function init(){
    base.html("");
    userName = Cookies.get("connectedUser");
    console.log(userName);
    let nameJson={
        username:userName
    }
    $.ajax({
        url: "/get-posts-favorite",
        method: "POST",
        dataType:"JSON",
        contentType: "application/json",
        data: JSON.stringify(nameJson),
        success: (result) =>{
            console.log(result);
            result.sort(sortByProperty("time"));
            result.forEach(e => {
                base.append("<li><div class='posts'><div class='flex'><p>Time: "+e['dateOfPublication']+"</p><p>Artist: "+e['publishedBy']+"</p></div><p class='title'>Title: "+e['title']+"</p><p>Description: "+e['description']+"</p></div></li>");
            });
        }
    })
}


init();