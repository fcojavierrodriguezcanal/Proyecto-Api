import { mongoose } from '../loaders/mongo.js';
import { Dibujo } from '../models/dibujo.js';
import { Dibujante } from '../models/user.js';

import fs from 'fs';
import ObjectId from 'mongodb';

async function uploaddraw(req, res) {
    try {
        let img = req.file;
        var encode_image = img.toString('base64');
        // Define a JSONobject for the image attributes for saving to database 
        var base64Content = {
            contentType: req.file.mimetype,
            image: Buffer.from(encode_image, 'base64')
        };

        const { nombre, tipo, user } = req.body;
        base64Content = Buffer.from(base64Content.image, 'base64');

        let fecha = Date.now();
        let id = crypto.randomUUID()

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
            base64Content,
            id
        });
        res.status(200).send("Se añadió")
    }

    catch {

        res.status(500).send("error no se añadio")
    }
}

function getdraw(req, res) {

    Dibujo.find({ fecha: req.params['nombre'] }, (err, dibujo) => {
        
    });

}

async function deletedrawing(req, res) {
    let dibujoId = req.params.id;
    
    const oldDrawing = await Dibujo.findOne({ fecha: dibujoId });

    if (!oldDrawing) {
      return res.status(409).send("El dibujo no se encontro en la base de datos: probablemente se deba a alguna de las siguientes razones: 1. no esta registrado , 2 quiza escribiste mal el nombre, 3 no se ha podido conectar con la base de datos, 4 el servicio esta en mantenimiento.");
    }
    
    Dibujo.deleteOne({ fecha: dibujoId }, (err, dibujo) => {
        res.status(200).send("se ha borrado su dibujo")

    }); 

}

function searchdraw(req, res) {
    var filename = req.params.id;
    Dibujo.find({ id: req.params.id }, (err, dibujo) => {
        res.setHeader('content-type', 'image/jpeg');
        res.send(dibujo[0])


    });
}
export { uploaddraw, getdraw, searchdraw, deletedrawing };