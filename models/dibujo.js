import { mongoose } from '../loaders/mongo.js';

const { ObjectId } = mongoose.Types;

const Schema = mongoose.Schema;

const DibujoSchema = Schema({
    nombre: { type: String, default: null },
    user: { type: String, default: null },
    fecha: { type: String, default:null },
    tipo: {type: String, default: null },
    base64Content: { type: Buffer, default: null }

});

const Dibujo = mongoose.model('dibujo', DibujoSchema);

export {Dibujo}