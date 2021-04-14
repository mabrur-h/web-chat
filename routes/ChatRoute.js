const router = require('express').Router()
const {getMessages, createMessage} = require('../models/MessageModel')

const AuthMiddleware = require('../middlewares/AuthMiddleware')
router.use(AuthMiddleware.middleware)


router.get('/', async (req, res) => {

    const allResult = await getMessages();

    const result = allResult.reverse()

    res.render('chat', {
        path: '/chat',
        ...req.user,
        result
    })

})

router.post('/', async (req, res) => {
    try {
        let { message } = req.body
        if ( !message ) throw "Message not found!"
        message = message.trim()
        if ( !message.length ) throw "No Message"
        if ( !message.length > 1024 ) throw "Too many symbols"
        await createMessage(message, req.user.id)
        res.redirect('/chat')
    } catch (e) {
        res.render('chat', {
            ...req.user,
            error: e + ""
        })
    }
})


module.exports = {
    path: "/chat",
    router
}
