const router = require('express').Router();
const users = require('../data')
const fileUpload = require('express-fileupload')
const fs = require('fs').promises
const fsSync = require('fs')
const path = require('path')

const AuthMiddleware = require('../middlewares/AuthMiddleware')

router.use(AuthMiddleware.middleware)

router.get('/:id', (req, res) => {
    let { id } = req.params

    let photoPath = path.join(__dirname, "..", "public", "images", `${req.user.id}.jpg`)
    let fileExists = fsSync.existsSync(photoPath)

    console.log (fileExists)

    let user = findUser(id)

    if ( !user ) {
        res.redirect('/')
        return
    }

    console.log (user)

    let options = {
        photo: fileExists ? `/images/${id}.jpg` : 'https://via.placeholder.com/400',
        title: "User Profile",
        path: '/profile',
        ...req.user,
        profile: {
            ...user
        }
    }
    res.render("profile", options)
})

router.post('/photo', fileUpload(), async (req, res) => {
    if ( req?.files?.photo ) {
        let photoPath = path.join(__dirname, "..", "public", "images", `${req.user.id}.jpg`)
        await fs.writeFile(photoPath, req.files?.photo.data)
    } else {
        res.send({
            error: true
        })
        return
    }
    res.send({
        success: true
    })
})

module.exports = {
    path: "/user",
    router
}

function findUser (id) {
    return users.find(user => user.id === id)
}
