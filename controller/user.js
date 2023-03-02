import { User } from '../models/user.js';
//import ObjectId from 'mongodb.ObjectId';
//import auth from "../middleware/authenticated.js";
import { mongoose } from '../loaders/mongo.js';
// Recoger datos de un usuario
function getUser(req, res){
    const user_id = req.params.id; 

    // buscar por id
    // user - User
    Script.findById(user_id, (err, User) => {
        if(err)return res.status(500).send({message: 'Error en la petición'});
        if(!User) return res.status(404).send({message: 'Este usuario no existe'});
            followThisUser(req.user.sub, user_Id).then((value) => { user.password = undefined;
                return res.status(200).send({
                    user,
                    following: value.following,
                    followed: value.followed
                });
        });
    });
}

export { getUser }