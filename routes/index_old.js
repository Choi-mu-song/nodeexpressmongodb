var express = require('express');
var router = express.Router();
// var Test = require('../bin/schema');
var passport = require('passport');
/* GET home page. */
router.get('/', function(req, res, next) {
    //조회
    Test.find({}, function (err, added) {
    if (err) throw err;

    res.render('index', {
        title: 'User List',
        added: added,
    });
  })
});
router.post('/newUser', function (req, res) {
    var u_id = req.body.u_id || req.query.u_id;
    var u_name = req.body.u_name || req.query.u_name;
    var u_age = req.body.u_age || req.query.u_age;

    //new 연산자를 사용해서 인스턴스 생성 하고 newAdd 객체 생성
    var newAdd = new Test({
      id: u_id,
      name: u_name,
      age: u_age,
    });

    //db저장
    newAdd.save(function (err) {
        if (err) throw err;
        res.redirect('/');
    });
});

module.exports = router;