const debugDB = require("debug")("app:db");
const db = require("mongoose");

db.connect("mongodb://localhost/nextgrowth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    debugDB("database connect success")
    console.log("database connect success")
  })
  .catch((err) =>{
     debugDB("have one error : " + err)
    });

module.exports = db;
