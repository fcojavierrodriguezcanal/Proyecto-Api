
const user = require('../models/artistuser');
const ObjectId = require('mongodb').ObjectId;
const auth = require("../middleware/authenticated");

// Conseguir datos de un usuario
function getUser(req, res){
    const user_id = req.params.id; 

    // buscar por ---> id
    Script.findById(user_id, (err, user) => {
        if(err)return res.status(500).send({message: 'Error en la petición'});
        if(!user) return res.status(404).send({message: 'Este usuario no existe'});
            followThisUser(req.user.sub, user_Id).then((value) => { user.password = undefined;
                return res.status(200).send({
                    user,
                    following: value.following,
                    followed: value.followed
                });
        });
    });
}