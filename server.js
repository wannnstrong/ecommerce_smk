require('dotenv/config')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const corsOptions = require('./config/corsOptions')
const credential = require('./middlewares/credential')
const db = require('./models')
const User = db.user
const Role = db.role
const app = express()
const PORT = process.env.PORT || 8080

app.use(credential)

app.use(express.json())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors(corsOptions))

// sync database
db.sequelize.sync({ force: false,logging:false }).then(() => {
    console.log('Drop and Resync Db');
    initial()
});
app.get('/', (req, res) => {
    res.send('Hello World')
})
app.use('/v1/api/auth', require('./routes/authRoute'))

app.listen(PORT, () => {
    console.log(`${PORT}`)
})

async function initial() {
    const roles = await Role.findAll({
        logging: false
    });
    const users = await User.findAll({
        logging: false
    })
    if(users.length<1){
        User.create({
            user_nama: 'tester',
            user_email: 'user@tester.com',
            user_password: '$2a$10$2vdk8UWgPjXCjn6T3klSJ.88OrpCE/dRqOAf7nY2oPgA6QMO3SCgO'
        })
    }
    if(roles.length<1){
        Role.create({
            level_id: 1,
            level_nama: "administrator"
        });
    
        Role.create({
            level_id: 2,
            level_nama: "customer"
        });
    }
}