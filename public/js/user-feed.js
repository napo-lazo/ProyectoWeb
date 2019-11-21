let base = $("#ul-list");

function init(){
    base.html("");

    $.ajax({
        url: "/posts",
        method: "GET",
        dataType:"JSON",
        success: (result) =>{
            console.log(result);
            result.forEach(e => {
                base.append("<li><div class='posts'><div class='flex'><p>Time: "+e['dateOfPublication']+"</p><p>Artist: "+e['publishedBy']+"</p></div><p class='title'>Title: "+e['title']+"</p><p>Description: "+e['description']+"</p></div></li>");
            });
        }
    })
}


init();