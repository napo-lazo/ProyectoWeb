let city = "Monterrey";
let base = $("#ul-list");
function init(){
    //primero es aggarrar a todas las bandas

    $.ajax({
        url: "/accounts",
        method: "GET",
        success: (result) =>{
            console.log(result);
            let arr = [];
            result.forEach(element => {
                if(element["type"] == "Artist"){
                    arr.push(element);
                }
            });
            console.log(arr);
            arr.forEach(e =>{
                console.log(e);
                base.append("<li><div class='flat'><div class='hori'> <input type='button' id='voteup' value='+1'></div><div class='hori2'><p><b>Band:</b>"+e['username']+"</p><p><b>Votos:</b>"+e['votos']+"</div></div></li>");
            });
        }
    })
}

init();