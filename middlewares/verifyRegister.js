const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        where: {
            user_email: req.body.user_email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Email is already in use!"
            });
        }
    });
    next();
};

const checkRoleExisted = (req, res, next) => {
    console.log('cek role',req.body.user_level)
    if (req.body.user_level) {
        // for (let i = 0; i < req.body.user_level.length; i++) {
            if (!ROLES.includes(req.body.user_level)) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.user_level
                });
                return;
            }
        // }
    }

    next();
};

module.exports = {
    checkDuplicateEmail,
    checkRoleExisted
};