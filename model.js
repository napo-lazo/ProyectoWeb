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

};

module.exports = {AccountList};