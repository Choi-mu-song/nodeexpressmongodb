var mongoose = require('mongoose');

module.exports = function () {
    function connect() {
        mongoose.Promise = global.Promise;
        mongoose.connect('localhost:27017/local', function (err) {
            console.log('MongoDB 연결!');
            if (err) {
                console.log('MongoDB 연결 에러', err);
            }
        });
    }
    connect();
    mongoose.connection.on('disconnected', connect);
    require('../models/postSchema');
}
