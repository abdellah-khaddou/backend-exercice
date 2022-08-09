const express = require('express');
const router = express.Router();
const{auth} = require("../middleware/auth")
const { UsersController } = require("../modules/users/Controller")
const usersController = new UsersController()

//this route is  {{url}}/users/...

router.get('/',auth,usersController.get)
router.post('/',usersController.create)
router.post('/login',usersController.login)

module.exports = router
