const db = require("../../connect");
const Joi = require("joi");
//const Joi.ObjectId = require('joi-objectid')('joi')

const Shema = db.Schema({
  
    
    name: String,
    login: String,
    password: String,
   
  
});
function validate(value) {
  const shema = Joi.object({
    name: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().required(),
    
  });
  return shema.validate(value);
}

const User = db.model("User", Shema);
module.exports.Shema = Shema;
module.exports.User = User;

module.exports.validate = validate;
