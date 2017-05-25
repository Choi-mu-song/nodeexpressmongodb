var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true, 'default':''},
    name: {type: String, index: 'hashed', 'default':''},
    age: {type: Number, 'default': -1},
});
module.exports = mongoose.model('Test', userSchema);