import { mongoose } from '../loaders/mongo.js';

const { ObjectId } = mongoose.Types;

const options = { discriminatorKey: 'rol' };


const Schema = mongoose.Schema;


const UserSchema = Schema({
    id: {type: ObjectId, required:false},
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    //token: { type: Array["access:true","access:false"]},
    //rol: { type: String, enum: ['dibujante','cliente'], required: true}

     
});

const dibujanteSchema = new Schema({
    drawings: [] 
})

const User = mongoose.model('user', UserSchema);


const Dibujante = User.discriminator('Dibujante', dibujanteSchema, options);


export { User, Dibujante};