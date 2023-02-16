const express = require ('express');
const cors = require ('cors');
const morgan = require ('morgan');
const dotenv = require ('dotenv');
const postRouter = require ('./routes/posts');
const swaggerUI = require ('swagger-ui-express');
const swaggerJsDoc = require ('swagger-jsdoc');

const PORT = process.env.PORT || 4001;
dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(cors());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Single-API",
      version: "1.0.0",
      description: "A Single Express Library API",
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
        description: "My SINGLE API Documentation",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/posts", postRouter);

const http = require('http');
const config = require('./src/config');
const mongoose = require('mongoose'); 
      mongoose.set('strictQuery', true)
const server = http.createServer(app);
const auth = require("./middleware/authenticated");
const {port} = config.server;
const chalk = require('chalk');


// Logger message
const Logger = require('./src/config/logger');
const logger = new Logger();



logger.info('LOG: Mensaje con datos', { id: 'javier' })     
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/posts", postRouter);

// arranque servidor
server.listen(port, () => {
    
    console.log(chalk.yellow(` Api running at port: http://localhost:${port}`));
    
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://javierro222:adaits@cluster0.ky8z94l.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {      
                                             
        console.log(chalk.yellowBright(" Conected DB: Mongodb"));
           
    })
    .catch(err => console.log(err));  

app.post("/welcome", auth, (req, res) => {  
  res.status(200).send("Welcome 🙌 ");
});
// arranque swager en port 4001/api-docs/#
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/posts", postRouter);
app.listen(PORT, () => console.log(chalk.blueBright(` Documentation Swagger running at port http://localhost:${PORT}`)));
 

