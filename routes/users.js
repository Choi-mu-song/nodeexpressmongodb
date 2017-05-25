var express = require('express');
var router = express.Router();

var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var async = require('async');
var User = require('../models/usersSchema');

/* GET users listing. */
router.get('/new', function (req, res, next) {
	res.render('new', {
		formData: req.flash('formData')[0],
		emailError: req.flash('emailError')[0],
		nicknameError: req.flash('nicknameError')[0],
		passwordError: req.flash('passwordError')[0]
	});
});

router.post('/', checkUserRegValidation, function (req, res, next) {
	User.create(req.body.user, function (err, user) {
		if (err) return res.json({success: false, message: err});
		res.redirect('/login');
	});
});

router.get('/:id', function (req, res) {
	User.findById(req.params.id, function (err, user) {
		if (err) return res.json({success: false, message: err});
		res.render('/show', {user: user});
	});
});

router.get('/:id/edit', function (req, res) {
	User.findById(req.params.id, function (err, user) {
		if (err) return res.json({success: false, message: err});
		res.render('/edit', {
			user: user,
			formData: req.flash('formData')[0],
			emailError: req.flash('emailError')[0],
			nicknameError: req.flash('nicknameError')[0],
			passwordError: req.flash('passwordError')[0]
		});
	});
});

router.put('/:id', checkUserRegValidation, function (req, res) {
	User.findById(req.params.id, req.body.user, function (err, user) {
		if (err) return res.json({success: false, message: err});

		if (req.body.user.password == user.password) {
			if (req.body.user.newPassword) {
				req.body.user.password = req.body.user.newPassword;
			} else {
				delete req.body.user.password;
			}
			User.findByIdAndUpdate(req.params.id, req.body.user, function (err, user) {
				if (err) return res.json({success: false, message: err});
				res.redirect('/' + req.params.id);
			});
		} else {
			req.flash("formData", req.body.user);
			req.flash("passwordError", "- Invaild password");
			req.redirect('/' + req.params.id + "/edit");
		}
	});
});

module.exports = router;
