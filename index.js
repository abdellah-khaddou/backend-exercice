const express = require("express");
 require("./connect");
const app = express();
const productsRoutes = require('./routes/products.router');
const usersRoutes = require('./routes/users.router');



app.use(express.json());
app.use('/product',productsRoutes);
app.use('/user',usersRoutes);




app.listen(3003, () => console.log("start server on PORT:3003"));
