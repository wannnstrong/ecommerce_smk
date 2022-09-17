const bcrypt = require('bcryptjs')
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("tb_user", {
        user_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        user_nama: {
            type: Sequelize.STRING,
        },
        user_email: {
            type: Sequelize.STRING,
            unique: true
        },
        user_password: {
            type: Sequelize.STRING
        },
        user_hp: {
            type: Sequelize.STRING
        },
        user_image: {
            type: Sequelize.TEXT
        },
        user_status: {
            type: Sequelize.BOOLEAN
        },
        user_level: {
            type: Sequelize.INTEGER,
        },
    })
    return User
}