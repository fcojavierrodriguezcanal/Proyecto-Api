import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User, Dibujante } from '../models/user.js';
//import ObjectId from 'mongodb.ObjectId';
//import auth from "../middleware/authenticated.js";
import { mongoose } from '../loaders/mongo.js';


async function getUsers(req, res) {

  let user = await User.find().exec();
  res.send(user)
}
async function getUser(req, res) {
  const user_id = req.params.id;

  let user = await User.find({ first_name: user_id }).exec();
  res.send(user)
}
async function registerUser(req, res) {

  try {
    // Obtener la entrada del usuario
    const { user_id, first_name, last_name, email, password, type } = req.body;

    // Validar la entrada del usuario
    if (!(email && password && first_name && last_name && type)) {
      res.status(400).send("No se aportaron todos los datos");
    }

    // Validar si el usuario existe en nuestra base de datos
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("Este usuario ya existe");
    }

    //Cifrar contraseña de usuario
    let encryptedPassword = await bcrypt.hash(password, 10);

    // Crear usuario en nuestra base de datos
    let user;
    if (type == "user") {
       user = await User.create({
        user_id,
        first_name,
        last_name,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });
    }
    else if (type == "dibujante") {
       user = await Dibujante.create({
        user_id,
        first_name,
        last_name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        drawings: []
      });
    }
    else {
        res.status(400).send("Invalid type");
    }
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
}

async function loginUser(req, res) {
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
}
      //Borrar usuario

      async function deleteuser(req, res) {
        let userId = req.params.id;
        
        const oldUser = await User.findOne({ first_name: userId });
    
        if (!oldUser) {
          return res.status(409).send("El dibujo no se encontro en la base de datos: probablemente se deba a alguna de las siguientes razones: 1. no esta registrado , 2 quiza escribiste mal el nombre, 3 no se ha podido conectar con la base de datos, 4 el servicio esta en mantenimiento.");
        }
        
        User.deleteOne({ first_name: userId }, (err, user) => {
            res.status(200).send("se ha borrado su usuario")
    
        });
    
    }
export { getUser, registerUser, loginUser, deleteuser, getUsers }