var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var userSchema = new mongoose.Schema({
    email : {type: String, required: true, unique: true},
    nickname : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    createdAt : {type: Date, default: Date.now}
});

//password 암호화
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//password 유효성 검증
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('user', userSchema);