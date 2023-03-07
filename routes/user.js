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
 * /user/:id:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Devuelve lista de usuarios.
 */
api.get('/user/:id', /*md_auth.ensureAuth,*/ getUser);

api.get('/users/', /*md_auth.ensureAuth,*/ getUsers);
/**
 * @openapi
 * /register:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Registra un nuevo usuario.
 */
api.post("/register",jsonParser, async (req, res) => {

  registerUser(req, res);
});

/**
 * @openapi
 * /deleteuser:
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

export { api };


 