

const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

const Schema = mongoose.Schema;



const UserSchema = Schema({
    id: {type: ObjectId, required:true},
    designation: {type: String, required: true},
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String, required:true },
});

module.exports = mongoose.model('user', UserSchema);