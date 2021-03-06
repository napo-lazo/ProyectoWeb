let mongoose = require("mongoose");

mongoose.Promise = global.Promise;

let accountSchema = mongoose.Schema({
	username : { type : String },
    password : { type : String },
    city : { type : String },
    type : { type : String },
    votes : [{type : String}],
    description: {type:String,default: ""},
    genre: {type:String,default: ""}
});

let postSchema = mongoose.Schema({
    title : {type : String},
    description : {type : String},
    dateOfPublication : {type : String},
    publishedBy : {type: String},
    time : {type:Date,default: Date.now}
});

let Account = mongoose.model("Account", accountSchema);
let Post = mongoose.model("Artist-Post", postSchema);

let AccountList = {

    //for debuging
    getAll: function(){
        return Account.find({},{password:0})
                        .then(accounts =>{
                            return accounts;
                        })
                        .catch(error =>{
                            throw Error(error);
                        });
    },

    getAllArtists: function(){
        return Account.find({type:"Artist"},{password:0})
                        .then(artists =>{
                            return artists;
                        })
                        .catch(error =>{
                            throw Error(error)
                        });
    },

    getArtistsByCity: function(city){
        return Account.find({type:"Artist",city:city},{password:0})
                        .then(artists =>{
                            return artists;
                        })
                        .catch(error =>{
                            throw Error(error)
                        });
    },

    verifyUserName: function(user){
        return Account.find(user)
                        .then(result =>{
                            return result;
                        })
                        .catch(error =>{
                            throw Error(error)
                        });
    },

    post: function(newAccount){
        return Account.create(newAccount)
                        .then(account =>{
                            return account;
                        })
                        .catch(error =>{
                            throw Error(error);
                        });
    },

    verifyLike: function(band){
        return Account.find({username:band})
                        .then(result=>{
                            return result;
                        })
                        .catch(error =>{
                            return Error(error);
                        });
    },

    addLike: function(band,user){

        return Account.findOneAndUpdate({username:band},{$push: {votes: user}},{new: true})
                        .then(result =>{
                            return result;
                        })
                        .catch(error =>{
                            return Error(error);
                        });
    },

    removeLike: function(band,user){
        return Account.findOneAndUpdate({username:band},{$pull: {votes: user}})
                        .then(result =>{
                            return result;
                        })
                        .catch(error =>{
                            return Error(error);
                        })
    },

    getLikes: function(user){
        return Account.findOne({username:user},{votes:1,_id:0})
                        .then(result =>{
                            return result;
                        })
                        .catch(error =>{
                            return Error(error);
                        })
    },

    getCityOfUser(user){
        return Account.findOne({username:user},{city:1, _id:0})
                        .then(result =>{
                            return result;
                        })
                        .catch(error =>{
                            return Error(error);
                        })
    },
    getCities(){
        return Account.find({},{city:1,_id:0})
                        .then(result =>{
                            return result;
                        })
                        .catch(error =>{
                            return Error(error);
                        })
    }
};

PostList = {
    //for debuging
    getAll: function(){
        return Post.find()
                        .then(posts =>{
                            return posts;
                        })
                        .catch(error =>{
                            throw Error(error);
                        });
    },

    getByArtist: function(artist){
        return Post.find(artist)
                        .then(posts =>{
                            return posts;
                        })
                        .catch(error =>{
                            throw Error(error);
                        });
    },

    post: function(newPost){
        return Post.create(newPost)
                        .then(post =>{
                            return post;
                        })
                        .catch(error =>{
                            throw Error(error);
                        });
    },

    getPostsLiked: function(artistArray){
        return Post.find({publishedBy:{$in:artistArray}})
                        .then(posts =>{
                            return posts;
                        })
                        .catch(error =>{
                            throw Error(error);
                        });
    },
};

module.exports = {AccountList, PostList};