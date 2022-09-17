module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('tb_level', {
        level_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            AutoIncrement: true
          },
          level_nama: {
            type: Sequelize.STRING
          }
    })

    return Role
}