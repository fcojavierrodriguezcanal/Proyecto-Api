// src/routes/user
import { User } from "../models/user.js"
import express from 'express';
import { getUser } from '../controller/user.js';
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
 *         description: Returns a mysterious string.
 */
api.get('/user/:id', /*md_auth.ensureAuth,*/ getUser);

/**
 * @openapi
 * /register:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
api.post("/register",jsonParser, async (req, res) => {

  try {
    // Obtener la entrada del usuario
    console.log("Request: " + req.body.user_id)
    const { user_id, first_name, last_name, email, password } = req.body;

    // Validar la entrada del usuario
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("No se aportaron todos los datos");
    }

    // Validar si el usuario existe en nuestra base de datos
    const oldUser = await User.findOne({ email });

    //if (oldUser) {
      //return res.status(409).send("Este usuario ya existe");
    //}

    //Cifrar contraseña de usuario
    let encryptedPassword = await bcrypt.hash(password, 10);

    // Crear usuario en nuestra base de datos
    const user = await User.create({
      user_id,
      first_name,
      last_name,
      email: email.toLowerCase(), 
      password: encryptedPassword,
    });

    // Crear token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );
    // guardar user token
    user.token = token;

    // retornar nuevo usuario
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Nuestra lógica de registro termina aquí
});

api.post("/login", async (req, res) => {

  try {
    const { email, password } = req.body;
    // Obtener la entrada del usuario
    if (!(email && password)) {
      res.status(400).send("Faltan datos de usuario");
    }
    //Validacion si el usuario existe
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Creacion token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );
      // Guardar usuario
      user.token = token;
      // user
      res.status(200).json(user);
    }
    res.status(400).send("Las credenciales son erroneas");
  } catch (err) {
    console.log(err);
  }
});

export { api };


 