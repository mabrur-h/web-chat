const router = require('express').Router();


router.get('/', (req, res) => {
    res.render("about", {
        title: "About Page",
        path: '/about',
        ...req.user
    })
})


module.exports = {
    path: "/about",
    router
}
