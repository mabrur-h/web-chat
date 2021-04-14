const client = require('../modules/mongo');
const { Schema } = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment')


const MessageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    message_id: {
        type: String,
        required: true
    },
    from_id: {
        type: String
    },
    to_id: {
        type: String
    },
    time: {
        type: Date
    }
})


async function PrivateMessageModel() {
    let db = await client();
    let model = await db.model('private_messages', MessageSchema)
    return model
}


async function createPrivateMessage (message, sender, receiver) {
    let model = await PrivateMessageModel()
    await model.create({
        message,
        message_id: uuidv4(),
        from_id: sender,
        to_id: receiver,
        time: Date()
    })
}


async function getPrivateMessages () {
    let model = await PrivateMessageModel ()
    let res = await model.find()
    return res
}


module.exports = {
    createPrivateMessage,
    getPrivateMessages
}

