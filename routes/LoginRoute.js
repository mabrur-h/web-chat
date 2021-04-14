const router = require('express').Router()
const { findUser } = require('../models/UserModel')

const { validationHash } = require('../modules/crypt')
const { generateToken } = require('../modules/jwt')


router.get('/', (req, res) => {
    let options = {
        title: "Login Page",
        path: '/login',
        error: "",
        user_name: req.user?.name,
        email: req.user?.email,
        ...req.user
    }
    res.render("login", options)
})


router.post('/', async (req, res) => {
    try {
        let { email, password } = req.body
        if ( !(email && password) ) throw "Email or Password not found!"
        let user = await findUser(email)
        console.log (user)
        if ( !user ) throw "User not found!"
        let isTrust = await validationHash(password, user.password)
        if ( !isTrust ) throw "Password is incorrect!"
        let token = generateToken({ email: user.email })

        res
            .cookie('token', token)
            .redirect('/')

    } catch (e) {
        let options = {
            title: "Login Page",
            path: '/login',
            error: e + "",
            user_name: req.user?.name,
            email: req.user?.email,
        }
        res.render('login', options)
    }
})


module.exports = {
    path: "/login",
    router
}
