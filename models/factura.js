import { mongoose } from '../loaders/mongo.js';

const { ObjectId } = mongoose.Types;

const Schema = mongoose.Schema;


const FacturaSchema = Schema({
    id: {type: ObjectId, required:false},
    user: { type: String, default: null },
    dibujo: { type: String, default: null },
    pago: { type: String, default:null },
    fecha: {type: String, default: null }
    

     
});
const Factura = mongoose.model('factura', FacturaSchema);

export { Factura };