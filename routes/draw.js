import express from 'express';
import { uploaddraw, getdraw, searchdraw, deletedrawing } from '../controller/dibujo.js';
import { upload } from '../loaders/multerloader.js';
import mongodb from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express.Router();

/**
 * @openapi
 * /indexphoto:
 * 
 *   get :
 *     description: Interfaz subida de dibujo.
 *     responses:
 *       200:
 *         description: Interfaz subida de dibujo.
 */
//INDICE DE SUBIDA DE ARCHIVOS
app.get('/indexphoto',function(req,res){
    res.sendFile(path.join(__dirname,  '..', '/resources/drawmulter.html'));
  });

  /**
 * @openapi
 * /drawings:
 *   post:
 *     description: Subida de dibujo.
 *     responses:
 *       200:
 *         description: Subida de dibujo.
 */
app.post('/drawings', upload.single('myImage'), (req, res) => {
    uploaddraw(req, res);
})

  /**
 * @openapi
 * /drawings/:nombre:
 *   post:
 *     description: ver dibujos
 *     responses:
 *       200:
 *         description: ver dibujos.
 */

app.get('/drawings/:nombre', (req, res) => {
    getdraw(req, res);
});


  /**
 * @openapi
 * /drawings:
 *   post:
 *     description: Busqueda de dibujo.
 *     responses:
 *       200:
 *         description: Busqueda de dibujo.
 */
app.get('/photo/:id', (req, res) => {
    searchdraw(req,res)
})




app.delete('/photo/:id', (req, res) => {
    deletedrawing(req,res)
})

const drawRoutes=app;
export {drawRoutes}