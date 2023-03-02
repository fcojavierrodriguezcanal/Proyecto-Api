import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
//import auth from "./middleware/authenticated";
import chalk from 'chalk';

import { api } from './routes/user.js'
//const mongoose = require('mongoose'); 
//      mongoose.set('strictQuery', true)
const PORT = process.env.PORT || 4001;
dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(cors());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ArtHub",
      version: "1.0.0",
      description: "ArtHub API",
      termsOfService: "http://example.com/terms/",
      contact: {
        name: "API Support",
        url: "http://www.exmaple.com/support",
        email: "support@example.com",
      },
    },

    servers: [
      {
        url: "http://localhost:4001",
        description: "ArtHub API Documentation",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);


app.listen(3000, () => {
    
    console.log(chalk.yellow(` Api running at port: http://localhost:${PORT}`));
    
});

/*mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://javierro222:adaits@cluster0.ky8z94l.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {      
                                             
        console.log(chalk.yellowBright(" Conected DB: Mongodb"));
           
    })
    .catch(err => console.log(err));  */


app.use("/", api);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.listen(PORT, () => console.log(chalk.blueBright(` Documentation Swagger running at port http://localhost:${PORT}`)));
 

