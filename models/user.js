var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
	building: {
		type: String
	},
	score: {
		type: Number
	},
	quizzes: {
		type: {}
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

// module.exports.updateScore = function(newUser, callback){
// 	// bcrypt.genSalt(10, function(err, salt) {
// 	//     bcrypt.hash(newUser.password, salt, function(err, hash) {
// 	        newUser.score = 1;
// 	        newUser.save(callback);
// 	//     });
// 	// });
// }
// module.exports.updateScoreByUsername = function(username, callback){
// 	var id = req.body.id;
// 	var query = {username: username};
// 	User.findOne(query, callback);
// 	User.score = 1;
// }

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}