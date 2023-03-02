import { mongoose } from '../loaders/mongo.js';

const { ObjectId } = mongoose.Types;

const DibujoSchema = Schema({
    id: {type: ObjectId, required:false},
    nombre: { type: String, default: null },
    user: { type: String, default: null },
    fecha: { type: String, default:null },
    tipo: {type: String, default: null }

});

const Dibujo = mongoose.model('dibujo', DibujoSchema);

export {Dibujo}