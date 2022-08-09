const  jwt =require("jsonwebtoken");
const {env} = require("../config/default")

class TokenManager {
  
     generateToken = async (ObjectToCode) => {
     
        return {
            token: jwt.sign(ObjectToCode,env.privateKeyToken),
         
        };

    }
     verifyToken = async (token) => {
        return jwt.verify(token, env.privateKeyToken)
    }
     decoreToken = async (token) => {
        return jwt.decode(token)
    }
}
let tokenMangager = new TokenManager();
module.exports.tokenMangager= tokenMangager;