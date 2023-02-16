// Cargamos el módulo de mongoose

const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
// Usaremos los esquemas
const Schema = mongoose.Schema;

// Creamos el objeto del esquema y sus atributos

const UserSchema = Schema({
    id: {type: ObjectId, required:true},
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String, required:true },
});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('user', UserSchema);