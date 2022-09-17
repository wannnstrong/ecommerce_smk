const JWT = require('jsonwebtoken')
const db = require('../models')
const User = db.user
const Role = db.role

const verifyToken = async (req, res, next) => {
    const bearerHeader = req.header('Authorization')
    if (!bearerHeader) return res.status(401).send('Access-Denied')

    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    JWT.verify(bearerToken, process.env.SECRET_KEY, (err, verified) => {
        if (err) {
            res.status(401).json({
                message: 'Unauthorized'
            })
        }
        req.user = verified
        next()
    })
}

const isAdmin = async (req, res, next) => {
    User.findById(req.user._id).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        
        Role.findOne(
            {
                where: { level_id: user.level_nama }
            },
            (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < role.length; i++) {
                    if (role[i].name === "Admin") {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: "Require Admin Role!" });
                return;
            }
        );
    });
}

const isUser = async (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.role }
            },
            (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (role[i].name === "User") {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: "Require User Role!" });
                return;
            }
        );
    });
}

module.exports = {
    verifyToken,
    isAdmin,
    isUser
}
