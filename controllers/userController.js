const db = require('../models')
const User = db.user
const Role = db.role

const getAllUsers = async (req, res) => {
    // .then((users) => users.find(i => i) Role.findOne({ where: { level_id: users[i].user_level }, include: User }))
    const users = await User.findAll()
    if (!users) return res.status(403).json({ message: 'Forbidden' })
    res.status(200).json({
        users
    })
}

const getUser = async (req, res) => {
    if (!req?.params?.user_id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ where: { user_id: req.params.user_id } });
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.user_id} not found` });
    }
    res.status(200).json({
        user
    });
}

module.exports = {
    getAllUsers,
    getUser
}