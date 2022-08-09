const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { ProductsController } = require("../modules/products/Controller");
const productController = new ProductsController();

//this route is  {{url}}/product/...

router.get("/", auth, productController.get);
router.get("/:product_id", auth, productController.getProduct);
router.get("/:product_id/variants", auth, productController.getVariants);
router.get("/:product_id/variants/:variant_id",auth,productController.getVariant);
router.post("/", auth, productController.create);
router.patch("/:product_id", auth, productController.update);
router.delete("/:product_id", auth, productController.delete);

module.exports = router;
