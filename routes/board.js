var express = require('express');
var router = express.Router();
var Post = require('../models/postSchema');

router.get('/', function(req, res) {
  Post.find({}).sort('-createdAt').exec(function (err, posts) {
      if (err) return res.json({success: false, message:err});
      // res.json({success: true, data: posts});
      res.render('board', {title: "List", data: posts, user: req.user});
  });
});//리스트

router.get('/:id', function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (err) return res.json({success: false, message:err});
    // res.json({success: true, data:post});
      res.render('show', {title: "게시판 상세보기", data:post});
  });
});//상세보기

router.get('/:id/edit', function (req, res) {
    Post.findById(req.params.id, function (err, post) {
        if (err) return res.json({success: false, message:err});
        res.render('edit', {title: "게시판 수정", data:post});
    });
});
router.put('/:id', function (req, res) {
  req.body.post.updatedAt = Date.now();
  Post.findByIdAndUpdate(req.params.id, req.body.post, function (err, post) {
      if (err) return res.json({success: false, message:err});
      // res.json({success: true, message: post._id + "updated"});
      res.redirect('/board/'+req.params.id);
  });
});//수정

router.delete('/:id', function (req, res) {
  Post.findByIdAndRemove(req.params.id, function (err, post) {
    if (err) return res.json({success: false, message: err});
    // res.json({success: true, message:post._id + "deleted"});
    res.redirect('/board');
  });
});//삭제

router.post('/', function(req,res){
    Post.create(req.body.post, function (err, post) {
        if(err) return res.json({success:false, message:err});
        res.redirect('/board');
    });
});//등록

module.exports = router;
