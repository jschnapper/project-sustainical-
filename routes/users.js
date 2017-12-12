var express = require('express');
var router = express.Router();
var passport = require('passport');
//var username = // ("#username").html()
var LocalStrategy = require('passport-local').Strategy;
// var objectID = require('mongodb://admin:sustainical2017!@ds031681.mlab.com:31681/sustainical_db').ObjectID;
// mongoose.connect('mongodb://admin:sustainical2017!@ds031681.mlab.com:31681/sustainical_db');

var User = require('../models/user');

// About
router.get('/about', function(req, res){
	res.render('about');
});


// Resources
router.get('/resources', function(req, res){
	res.render('resources');
});

// Resources for logged-in users
router.get('/resourceslogin', function(req, res){
	res.render('resourceslogin');
});

// Quizzes
router.get('/quizzes', function(req, res){
	res.render('quizzes');
});


// Quiz 1
router.get('/quiz1', function(req, res){
	res.render('quiz1');
});

// Quiz 2
router.get('/quiz2', function(req, res){
	res.render('quiz2');
});

// Trends
router.get('/trends', function(req, res){
	res.render('trends');
});

// What can I do?
router.get('/whatcanido', function(req, res){
	res.render('whatcanido');
});

// Register
router.get('/register', function(req, res){
	res.render('register');
});

// Login
router.get('/login', function(req, res){
	res.render('login');
});

// not logged in dash
router.get('/nologin', function(req, res){
	res.render('nologin');
});

// Register User
router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
	var building = req.body.building;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
	req.checkBody('building', 'Building is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			name: name,
			email:email,
			username: username,
			password: password,
			building: building,
			score: 0
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

module.exports = router;