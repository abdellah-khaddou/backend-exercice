const { tokenMangager } = require("../../helpers/TokenManger");
const { User, validate } = require("./Model");
const {UserService}= require('./service')
const Joi = require("joi");

const userService =  new UserService();
 class UsersController {
  
  constructor(){
    
    
  }
  
  async get(req, res) {
    const users = await User.find();

    if (!users) return res.status(404).send("not found.");

    res.send(users);
  }




  async create(req,res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    var data = req.body;
    let hashPassword = userService.hashPassword(data.password)
    let user = new User({
      
     
      name: data.name,
      login: data.login,
      password: hashPassword,
      
      
    });
    try {
      let newUser = await user.save()
      return res.send(newUser);
    } catch (ex) {
      console.log(ex)
      return res.send(ex);
    }
  
   }

  async login(req,res){
    var data = req.body
    const { error } = validateLogin(req.body);
    if (error) return res.status(404).send(error.details[0].message);
     let user = await User.findOne({login:data.login})
     if(!user) return res.status(404).send("login  is not correct.");
     let isMatchPassword = userService.verifyPassword(data.password,user.password)
     if(!isMatchPassword)return res.status(404).send("password is not correct.");
     delete user.password
     let JsonUser = JSON.parse(JSON.stringify(user))
     let token = await tokenMangager.generateToken( JsonUser)
     return res.status(200).send({token:token})

  }
} //fin class

function validateLogin(user) {

  const shema = Joi.object({
    login: Joi.string().max(256).required(),
    password: Joi.string().max(256).required(),
  });
  return shema.validate(user);
}
module.exports.UsersController = UsersController
