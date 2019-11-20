let mongoose = require("mongoose");

mongoose.Promise = global.Promise;

let accountSchema = mongoose.Schema({
	username : { type : String },
    password : { type : String },
    city : { type : String },
    type : { type : String },
    votes : {type : Number}
});

let postSchema = mongoose.Schema({
    title : {type : String},
    description : {type : String},
    dateOfPublication : {type : String},
    publishedBy : {type: String}
});

let Account = mongoose.model("Account", accountSchema);
let Post = mongoose.model("Post", postSchema);

let AccountList = {

    //for debuging
    getAll: function(){
        return Account.find()
                        .then(accounts =>{
                            return accounts;
                        })
                        .catch(error =>{
                            throw Error(error);
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

    post: function(newPost){
        return Post.create(newPost)
                        .then(post =>{
                            console.log(post);
                            return post;
                        })
                        .catch(error =>{
                            throw Error(error);
                        });
    }
};

module.exports = {AccountList, PostList};