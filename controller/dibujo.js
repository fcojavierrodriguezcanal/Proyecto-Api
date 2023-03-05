import { mongoose } from '../loaders/mongo.js';
import { Dibujo } from '../models/dibujo.js';
import { Dibujante } from '../models/user.js';

import fs from 'fs';
import ObjectId from 'mongodb';

async function uploaddraw(req, res) {
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    // Define a JSONobject for the image attributes for saving to database 
    var base64Content = {
        contentType: req.file.mimetype,
        image: Buffer.from(encode_image, 'base64')
    };

    const { nombre, tipo, user } = req.body;
    base64Content = Buffer.from(base64Content.image, 'base64');

    let fecha = Date.now();

    /*db.collection('myCollection').insertOne(finalImg, (err, result) => {
        console.log(result)
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/')
    })
    */
    const dibujo = await Dibujo.create({
        nombre,
        user,
        fecha,
        tipo,
        base64Content
    });
}

function getdraw(req, res) {
    Dibujo.find({ fecha: req.params['nombre'] }, (err, dibujo) => {
        res.set('Content-Type','image/png');
        res.send(dibujo[0].base64Content)
    
      });
    
    }


function searchdraw(req, res) {
    var filename = req.params.id;
    db.collection('myCollection').findOne({ '_id': ObjectId(filename) }, (err, result) => {
        if (err) return console.log(err)
        res.contentType('image/jpeg');
        res.send(result.image.buffer)
    })
}
export { uploaddraw, getdraw, searchdraw };