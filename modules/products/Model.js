const db = require("../../connect");
const Joi = require("joi");
//const Joi.ObjectId = require('joi-objectid')('joi')

const Shema = db.Schema({
  
    reference: {
      type: String,
      trim: true,
      maxlength:20,
      minlength:3,
      required: true,
      validate: {
          validator: exempleValidate,
          message: att => `this ${att.value} is not validate reference `
      },
  },
    name: String,
    description: String,
    image: String,
    variants: [
      {
        sku: String,
        specification: String,
        price: Number
      }
    ]
  
});
function validate(value) {
  const shema = Joi.object({
    reference: Joi.string().max(20).min(3).required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    variants: Joi.array().items({
      sku:Joi.string(),
      specification:Joi.string(),
      price:Joi.number()
    }),
  });
  return shema.validate(value);
}
function exempleValidate(value) {
  //some logique here  return true or false 
  return true 
}

const Product = db.model("Product", Shema);
module.exports.Shema = Shema;
module.exports.Product = Product;

module.exports.validate = validate;
