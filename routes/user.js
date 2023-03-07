// src/routes/user
import { User } from "../models/user.js"
import express from 'express';
import { getUser,registerUser,loginUser, deleteuser, getUsers } from '../controller/user.js';
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'
import jwt from 'jwt-simple'



const api = express.Router();

var jsonParser = bodyParser.json()
 

var urlencodedParser = bodyParser.urlencoded({ extended: false })

/**
 * @openapi
 * /users/:id:
 *   get:
 *     description: devolver lista de usuarios
 *     responses:
 *       200:
 *         description: Devuelve lista de usuarios.
 */
api.get('/user/:id', /*md_auth.ensureAuth,*/ getUser);

api.get('/users/', /*md_auth.ensureAuth,*/ getUsers);


/**
 * @openapi
 * /delete/:id:
 *   delete:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Borra un usuario.
 */
api.delete("/delete/:id",jsonParser, async (req, res) => {
  deleteuser(req, res);
});

/**
 * @openapi
 * /login:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Logea un usuario.
 */
api.post("/login", async (req, res) => {
  loginUser;
});

/**
 * @openapi
 * /register:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Registra un nuevo usuario.
 *      schemas: 
 *        type:object
 *          name:
 */
api.post("/register",jsonParser, async (req, res) => {

  registerUser(req, res);
});

export { api };


 