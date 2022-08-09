
const {env} = require("../config/default");
const { tokenMangager } = require("../helpers/TokenManger");





let   auth = async (req, res, next)=> {
  if (!env.privateKeyToken) {
    console.error("Fatal Error in auth not found private key of token");
    //console.log('prvate: ',config.get('privateKeyToken'))
    process.exit(1);
  }
  const token = req.header("Authorization");
  if (!token) return res.send("No Authorization for see this page !");
  try {
    const decoded = await tokenMangager.verifyToken(token);
    req.user = decoded;
    next();
  } catch (e) {
    return res.send("invalid login");
  }
}
module.exports.auth = auth;

