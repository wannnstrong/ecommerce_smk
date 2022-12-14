const JWT = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../models')
const authValidation = require('../middlewares/authValidation')
const User = db.user
const Role = db.role

const register = async (req, res) => {
    const { error } = authValidation.registerValidation(req.body)
    if (error) return res.status(400).json({ data: { message: error.details[0].message } })

    if (req.body.user_level) {
        Role.findOne({
            where: {
                level_nama: req.body.user_level
            }
        }).then((role) => {
            User.create({
                user_nama: req.body.user_nama,
                user_email: req.body.user_email,
                user_password: bcrypt.hashSync(req.body.user_password, 10),
                user_hp: req.body.user_hp ?? null,
                user_image: req.body.user_image ?? null,
                user_status: true,
                user_level: role.level_id
            }).then((user, bearerToken) => {
                bearerToken = JWT.sign({ id: user.user_id }, process.env.SECRET_KEY, { expiresIn: 86400 })
                res.status(200).json({
                    user: {
                        user_id: user.user_id,
                        user_nama: user.user_nama,
                        user_email: user.user_email,
                        user_password: user.user_password,
                        user_level: role.level_nama,
                        user_hp: user.user_hp ?? '',
                        user_image: user.user_image ?? '',
                        user_status: user.user_status
                    },
                    token: bearerToken
                })
            }).catch((err) => {
                res.status(400).json({
                    data: { message: err }
                });
            })
        }).catch((error) => {
            res.status(400).json({
                data: { 
                    message: error
                }
            })
        })
    } else {
        Role.findOne({
            where: {
                level_nama: 'customer'
            }
        }).then((role) => {
            User.create({
                user_nama: req.body.user_nama,
                user_email: req.body.user_email,
                user_password: bcrypt.hashSync(req.body.user_password, 10),
                user_hp: req.body.user_hp ?? null,
                user_image: req.body.user_image ?? null,
                user_status: true,
                user_level: role.level_id
            }).then((user, bearerToken) => {
                bearerToken = JWT.sign({ id: user.user_id }, process.env.SECRET_KEY, { expiresIn: 86400 })
                res.status(200).json({
                    user: {
                        user_id: user.user_id,
                        user_nama: user.user_nama,
                        user_email: user.user_email,
                        user_password: user.user_password,
                        user_level: role.level_nama,
                        user_hp: user.user_hp ?? '',
                        user_image: user.user_image ?? '',
                        user_status: user.user_status
                    },
                    token: bearerToken
                })
            }).catch((error) => {
                res.status(400).json({
                    data: { message: error }
                });
            })
        }).catch((error) => {
            res.status(400).json({
                data: { message: error }
            });
        })
    }
}

const login = async (req, res) => {
    const { error } = authValidation.loginValidation(req.body)
    if (error) return res.status(400).json({data: {message: error.details[0].message}})

    const user = await User.findOne({ where: { email: req.body.user_email } })
    if (!user) return res.status(400).json({data: {message: 'Invalid email!'}})

    const validPass = await bcrypt.compare(req.body.password, user.user_password)
    if (!validPass) return res.status(400).json({data: {message: 'Invalid password!'}})

    const bearerToken = JWT.sign({ id: user.user_id }, process.env.SECRET_KEY, { expiresIn: 86400 })

    res.status(200).header('Authorization', bearerToken).json({
        user: {
            id: user.user_id,
            user_nama: user.user_nama,
            user_status: user.user_status,
        },
        token: bearerToken
    })
}

module.exports = {
    register,
    login
}
