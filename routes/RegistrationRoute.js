const router = require('express').Router()
const users = require('../data')

const { generateHash } = require('../modules/crypt')
const { createUser } = require('../models/UserModel')


router.get('/', (req, res) => {
    let options = {
        title: "Registration Page",
        path: '/registration',
        error: "",
        user_name: req.user?.name,
        email: req.user?.email,
    }
    res.render("registration", options)
})


router.post('/', async (req, res) => {
    try {
        let { email, name, password } = req.body;
        if ( !(email && name && password) ) throw ('Password, email and name are required!')
        password = await generateHash(password)
        await createUser(email, name, password)
        res.redirect('/login')

    } catch (e) {
        res.render('registration', {
            title: "Registration Page",
            path: '/registration',
            error: e + ""
        })
    }
})



module.exports = {
    path: "/registration",
    router
}

