const router = require('express').Router()
const users = require('../data')


router.get('/', (req, res) => {
    let options = {
        title: "Home Page",
        path: "/",
        ...req.user
    }
    res.render("index", options)
})


module.exports = {
    path: "/",
    router
}

