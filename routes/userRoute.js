const router = require('express').Router()
const authJWT = require('../middlewares/authJWT')
const userController = require('../controllers/userController')

router.get('/users', [authJWT.verifyToken], userController.getAllUsers)
router.get('/users/:user_id', [authJWT.verifyToken, ], userController.getUser)

module.exports = router