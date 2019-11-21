let createPost = $("#createPost");

createPost.on("click", event =>{
    event.preventDefault();

    let date = new Date();
    let title = $("#titlePost").val();
    let desc = $("#descPost").val();

    let json = {
        title: title,
        description : desc,
        dateOfPublication : date.getDate() + "/" +  date.getMonth() + "/" + date.getFullYear(),
        publishedBy : "dummy"
    }
    console.log(json)

});