const router = require('express').Router()
const users = require('../data')
const { v4: uuidv4 } = require('uuid')
const {getUsers} = require('../models/UserModel')

const AuthMiddleware = require('../middlewares/AuthMiddleware')
router.use(AuthMiddleware.middleware)


router.get('/', async (req, res) => {
    const allUsers = await getUsers()

    const users = allUsers.filter(el => el.id !== req.user.id)
    console.log (users)

    res.render('privateChat', {
        title: "Private chat",
        path: '/private-chat',
        ...req.user,
        users
    })
})


module.exports = {
    path: "/private-chat",
    router
}
