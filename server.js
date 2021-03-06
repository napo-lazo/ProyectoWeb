let express = require("express");
let morgan = require("morgan");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let {AccountList, PostList} = require("./model");
let {DATABASE_URL, PORT} = require("./config");

let app = express();
let jsonParser = bodyParser.json();
mongoose.Promise = global.Promise;

app.use(express.static("public"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//for debugging
app.get("/accounts", (req, res) =>{
    AccountList.getAll()
                .then(accounts =>{
                    return res.status(200).json(accounts);
                })
                .catch(error =>{
                    res.statusMessage = "Something went wrong with the DB";
                    return res.status(500).json({
                        code: 500,
                        message: "Something went wrong with the DB"
                    })
                });
});

app.post("/artist-Accounts", (req, res) => {

    AccountList.getAllArtists()
                .then(artists =>{
                    return res.status(200).json(artists);
                })
                .catch(error =>{
                    res.statusMessage = "Something went wrong with the DB";
                    return res.status(500).json({
                        code: 500,
                        message: "Something went wrong with the DB"
                    })
                }); 
});

app.post("/get-city",(req,res) =>{
    let query = req.body;
    AccountList.getCityOfUser(query['username'])
                .then(city =>{
                    return res.status(200).json(city);
                })
                .catch(error =>{
                    res.statusMessage = "Something went wrong with the DB";
                    return res.status(500).json({
                        code: 500,
                        message: "Something went wrong with the DB"
                    })
                }); 
})

app.post("/get-all-cities",(req,res) =>{
    AccountList.getCities()
                .then(cities =>{
                    let arr = [];
                    cities.forEach(e=>{
                        if(!arr.includes(e['city'])){
                            arr.push(e['city']);
                        }
                    })
                    return res.status(200).json(arr);
                })
                .catch(error =>{
                    res.statusMessage = "Something went wrong with the DB";
                    return res.status(500).json({
                        code: 500,
                        message: "Something went wrong with the DB"
                    })
                });
});

app.post("/artist-city", (req, res) => {

    let query = req.body;
    //recibe el usuario y busca su ciudad
    AccountList.getCityOfUser(query['username'])
                .then(city =>{
                    AccountList.getArtistsByCity(city['city'])
                                .then(artists =>{
                                    return res.status(200).json(artists);
                                })
                                .catch(error =>{
                                    res.statusMessage = "Something went wrong with the DB";
                                    return res.status(500).json({
                                        code: 500,
                                        message: "Something went wrong with the DB"
                                    })
                                }); 
                })
                .catch(error =>{
                    res.statusMessage = "Something went wrong with the DB";
                    return res.status(500).json({
                        code: 500,
                        message: "Something went wrong with the DB"
                    })
                }); 

    
});

app.post("/artists-from-city",(req,res)=>{
    let query = req.body;
    AccountList.getArtistsByCity(query['city'])
                                .then(artists =>{
                                    return res.status(200).json(artists);
                                })
                                .catch(error =>{
                                    res.statusMessage = "Something went wrong with the DB";
                                    return res.status(500).json({
                                        code: 500,
                                        message: "Something went wrong with the DB"
                                    })
                                }); 
})

app.post("/account", jsonParser, (req, res) =>{
    let query = req.body

    AccountList.verifyUserName(query)
                .then(account =>{
                    return res.status(200).json(account);
                })
                .catch(error =>{
                    res.statusMessage(500) = "Something went wrong with the DB";
                    return res.status(500).json({
                        code: 500,
                        message: "Something went wrong with the DB"
                    }) 
                });

});

app.post("/likes",jsonParser,(req,res)=>{
    let json = req.body;
    let band = json["band"];
    let user = json["user"];
    let found = false;
    AccountList.verifyLike(band)
                    .then(likes =>{
                        likes = likes[0]['votes'];
                        likes.forEach(e =>{
                            if(user == e){
                               found=true;    
                            }
                        })
                        if(!found){
                            AccountList.addLike(band,user)
                                        .then(like => {
                                            return res.status(200).json(like);
                                        })
                                        .catch(error =>{
                                            res.statusMessage(500) = "Something went wrong with the DB";
                                            return res.status(500).json({
                                                code: 500,
                                                message: "Something went wrong with the DB"
                                            }) 
                                        });
                            AccountList.addLike(user,band)
                            .then(like => {

                                //return res.status(200).json(like);
                            })
                            .catch(error =>{
                                res.statusMessage(500) = "Something went wrong with the DB";
                                return res.status(500).json({
                                    code: 500,
                                    message: "Something went wrong with the DB"
                                }) 
                            });
                        }else{
                            AccountList.removeLike(band,user)
                                        .then(like=>{
                                            return res.status(200).json(like);
                                        })
                                        .catch(error =>{
                                            res.statusMessage(500) = "Something went wrong with the DB";
                                            return res.status(500).json({
                                                code: 500,
                                                message: "Something went wrong with the DB"
                                            })  
                                        });
                            AccountList.removeLike(user,band)
                            .then(like=>{
                                //
                            })
                            .catch(error =>{
                                res.statusMessage(500) = "Something went wrong with the DB";
                                return res.status(500).json({
                                    code: 500,
                                    message: "Something went wrong with the DB"
                                })  
                            });
                        }
                    })
                    .catch(error =>{
                        res.statusMessage(500) = "Something went wrong with the DB";
                        return res.status(500).json({
                            code: 500,
                            message: "Something went wrong with the DB"
                        }) 
                    });
    
});

app.post("/accounts", jsonParser, (req, res) => {

    let json = req.body;

    AccountList.post(json)
                    .then(post =>{
                        return res.status(201).json(post);
                    })
                    .catch(err =>{
                        res.statusMessage = "Something went wrong with the DB";
                        return res.status(500).json({
                            code: 500,
                            message: "Something went wrong with the DB"
                        })
                    });
});

//for debugging
app.get("/posts", (req, res) =>{
    PostList.getAll()
                .then(posts =>{
                    return res.status(200).json(posts);
                })
                .catch(error =>{
                    res.statusMessage = "Something went wrong with the DB";
                    return res.status(500).json({
                        code: 500,
                        message: "Something went wrong with the DB"
                    })
                });
});

app.post("/artist-Posts", jsonParser, (req, res) =>{
    let json = req.body;

    PostList.getByArtist(json)
                .then(posts =>{
                    return res.status(200).json(posts);
                })
                .catch(err =>{
                    res.statusMessage = "Something went wrong with the DB";
                    return res.status(500).json({
                        code: 500,
                        message: "Something went wrong with the DB"
                    })
                });
});

app.post("/get-posts-favorite",(req,res)=>{
    let user = req.body['username'];
    AccountList.getLikes(user)
                .then(likes=>{
                    arr = likes['votes'];

                    PostList.getPostsLiked(arr)
                                .then(posts=>{
                                    return res.status(200).json(posts);
                                })
                                .catch(error =>{
                                    res.statusMessage = "Something went wrong with the DB";
                                    return res.status(500).json({
                                        code: 500,
                                        message: "Something went wrong with the DB"
                                    })
                                });
                    
                    
                })
                .catch(error =>{
                    res.statusMessage = "Something went wrong with the DB";
                    return res.status(500).json({
                        code: 500,
                        message: "Something went wrong with the DB"
                    })
                });
});

app.post("/post", jsonParser, (req, res) =>{

    let json = req.body;

    PostList.post(json)
                .then(post =>{
                    return res.status(201).json(post);
                })
                .catch(err =>{
                    res.statusMessage = "Something went wrong with the DB";
                    return res.status(500).json({
                        code: 500,
                        message: "Something went wrong with the DB"
                    })
                });

});

let server;

function runServer(port, databaseUrl){
    return new Promise( (resolve, reject) => {
        mongoose.connect(databaseUrl, response =>{
            if(response){
                return reject(response);
            }
            else{
                server = app.listen(port, () =>{
                    console.log("App is running on port " + port);
                    resolve();
                })
                .on("error", err =>{
                    mongoose.disconnect();
                    return reject(err);
                });
            }
        });
    });
}

function closeServer(){
    return mongoose.disconnect()
            .then(() => {
                return new Promise((resolve, reject) =>{
                    console.log("Closing the server");
                    server.close(err =>{
                        if (err){
                            return reject(err);
                        }
                        else{
                            resolve();
                        }
                    });
                });
            });
}

runServer(PORT, DATABASE_URL)
        .catch(err => {
            console.log(err);
        });

module.exports = {app, runServer, closeServer};