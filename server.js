let express = require("express");
let morgan = require("morgan");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

let app = express();
let jsonParser = bodyParser.json();
mongoose.Promise = global.Promise;

app.use(express.static("public"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

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