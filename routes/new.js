var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  res.render('new', {title: "Write"});
});

module.exports = router;
