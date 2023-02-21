

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const options = { discriminatorKey: 'rol' };


const Schema = mongoose.Schema;


const UserSchema = Schema({
    id: {type: ObjectId, required:true},
    designation: {type: String, required: true},
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: Array["access:true","access:false"],
    //rol: { type: String, enum: ['dibujante','cliente'], required: true}

     },
});
const User = mongoose.model('user', UserSchema);

const dibujanteSchema = new Schema({})
const Dibujante = User.discriminator('dibujante', dibujanteSchema, options);

const clienteSchema = new Schema({})
const Cliente = User.discriminator('cliente', clienteSchema, options);

module.exports = {
    User,
    Dibujante,
    Cliente
}