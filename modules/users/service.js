const bcrypt = require('bcrypt');
 class UserService{
    constructor(){}
     hashPassword(password){
        return bcrypt.hashSync(password,16)
    }
    
     verifyPassword(passwordUser,passwordDb){

        return  bcrypt.compareSync(passwordUser,passwordDb)
    }
    generateToken(){
        
    }
}

module.exports.UserService = UserService