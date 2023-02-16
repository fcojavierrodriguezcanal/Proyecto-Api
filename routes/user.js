// src/routes/user

const express = require('express');
const userController = require('../controller/user');
const api = express.Router();

api.get('/user/:id', function(req, res){
  md_auth.ensureAuth, userController.getUser
});

api.post("/register", async (req, res) => {

  try {
    // Obtener la entrada del usuario
    const { user_id, first_name, last_name, email, password } = req.body;

    // Validar la entrada del usuario
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("No se aportaron todos los datos");
    }

    // comprobar si el usuario ya existe
    // Validar si el usuario existe en nuestra base de datos
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("Este usuario ya existe");
    }

    //Cifrar contraseña de usuario
    encryptedPassword = await bcrypt.hash(password, 10);

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
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );
      // save user token
      user.token = token;
      // user
      res.status(200).json(user);
    }
    res.status(400).send("Las credenciales son erroneas");
  } catch (err) {
    console.log(err);
  }
});

module.exports = api;


 