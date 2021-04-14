const router = require('express').Router()
const {createPrivateMessage, getPrivateMessages} = require('../models/PrivateMessageModel')
const {getUsers} = require('../models/UserModel')

const AuthMiddleware = require('../middlewares/AuthMiddleware')
router.use(AuthMiddleware.middleware)


router.get('/:id', async (req, res) => {
    const users = await getUsers()
    const privateMessages = await getPrivateMessages()



    res.render('privateChatRoom', {
        title: "Private chat",
        path: '/private-chat',
        users,
        privateMessages,
        ...req.user,
        paramsId: [req.params.id]
    })

    // console.log (privateMessages)
})



router.post('/:id',  async (req, res) => {
    try {
        let { message } = req.body
        if ( !message ) throw "Message not found!"
        message = message.trim()
        if ( !message.length ) throw "No message!"
        if ( message.length > 128 ) throw "Too many symbols!"
        await createPrivateMessage(message, req.user.id, req.params.id)
        res.redirect(`/private-chat/${req.params.id}`)
    } catch (e) {
        res.render('privateChatRoom', {
            path: '/private-chat',
            ...req.user,
            error: e + ""
        })
    }
})




module.exports = {
    path: "/private-chat",
    router
}
