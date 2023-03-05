import express from 'express';
import { uploaddraw, getdraw, searchdraw } from '../controller/dibujo.js';
import { upload } from '../loaders/multerloader.js';
import mongodb from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express.Router();

//INDICE DE SUBIDA DE ARCHIVOS
app.get('/indexphoto',function(req,res){
    res.sendFile(path.join(__dirname,  '..', '/resources/drawmulter.html'));
  });

// SUBIDA DE DIBUJOS
app.post('/drawings', upload.single('myImage'), (req, res) => {
    uploaddraw(req, res);
})

// VER DIBUJOS

app.get('/drawings/:nombre', (req, res) => {
    getdraw(req, res);
});

//BUSQUEDA DIBUJO

app.get('/photo/:id', (req, res) => {
    searchdraw(req,res)
})

const drawRoutes=app;
export {drawRoutes}