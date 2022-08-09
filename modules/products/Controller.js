const { Product, validate } = require("./Model");


 class ProductsController {
  
  async get(req, res) {
    const products = await Product.find();

    if (!products) return res.status(404).send("not found.");

    res.send(products);
  }




  async create(req,res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    var data = req.body;
    let product = new Product({  
      reference: data.reference,
      name: data.name,
      description: data.description,
      image: data.image,
      variants: data.variants
      
      
    });
    try {
      let newProduct = await product.save()
      return res.send(newProduct);
    } catch (ex) {
      console.log(ex)
      return res.send(ex);
    }
  
   }


  async update(req, res) {
    const product = await Product.findById(req.params.product_id);

    if (!product) return res.status(404).send("cette trajectoire incorecte");

    const { error } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    var data = req.body;
    
    
    
   
    product.reference = data.reference;
    product.name = data.name;
    product.description = data.description;
    product.image = data.image;
    product.variants = data.variants;
    ;

    try {
      product.save();
      res.send(product);
    } catch (ex) {
      res.status(403).send(ex.error);
    }
  }

  async delete(req, res) {
    const product = await Product.findById(req.params.product_id);
    if (!product) return res.status(404).send(" not found.");

   await product.remove();
    const products = await Product.find();
    res.status(200).send(products);
  }

  async getVariants(req, res) {
    const product = await Product.findById(req.params.product_id);

    if (!product) return res.status(404).send("not found any product with this id.");
    let variants = product.variants

    res.send(variants);
  }

  async getVariant(req, res) {
    const product = await Product.findById(req.params.product_id);

    if (!product) return res.status(404).send("not found any product with this id.");
    let variant = product.variants?.find(variant=>variant._id==req.params.variant_id)

    res.send(variant);
  }
  async getProduct(req, res) {
    const product = await Product.findById(req.params.product_id);

    if (!product) return res.status(404).send("not found any product with this id.");

    res.send(product);
  }
} //fin class
module.exports.ProductsController = ProductsController
