
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var adminSchema = new Schema({
  
    email: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    real_password: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "0"
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('admins', adminSchema);