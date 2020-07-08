const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var User = new mongoose.Schema({
    
    name: {
        type: String,
        default: 'User',
    },
    
    email: {
        type: String,
        default: '',
        unique: true,
        dropDups: true,
        required: true
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);