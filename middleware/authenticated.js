
const jwt = require('jwt-simple');
const moment = require('moment');
const config = process.env;

exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'La peticion no tiene la cabecera de autenticación'});
    } else {
        var token = req.headers.authorization.replace(/['"]+/g, '');
try{
            var payload = jwt.decode(token, secret);
if(payload.exp > moment().unix()){
                return res.status(401).send({
                    message: 'token expired'
                });
            }
        } catch (ex){
            return res.status(404).send({
                message: 'Invalid token'
            });
        }
req.user = payload;
next();
    }
}


const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;