let mongoose = require("mongoose");

mongoose.Promise = global.Promise;

let accountSchema = mongoose.Schema({
	username : { type : String },
    password : { type : String },
    city : { type : String },
    type : { type : String }
});

let Account = mongoose.model("Account", accountSchema);

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
        return Account.findOne({username: user})
                        .then(user =>{
                            return user;
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

module.exports = {AccountList};