const router = require('express').Router()
const authController = require('../controllers/authController')
const verifyRegister = require('../middlewares/verifyRegister')

router.post('/register', [verifyRegister.checkDuplicateEmail, verifyRegister.checkRoleExisted], authController.register)
router.post('/login', authController.login)

module.exports = router