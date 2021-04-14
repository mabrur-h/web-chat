const client = require('../modules/mongo');
const { Schema } = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment')


const MessageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    user_id: {
        type: String
    },
    time: {
        type: Date
    },
    message_id: {
        type: String,
        required: true
    }
})


async function MessageModel() {
    let db = await client();
    let model = await db.model('messages', MessageSchema)
    return model
}


async function createMessage (message, user_id) {
    let model = await MessageModel()
    await model.create({
        message,
        user_id,
        id: uuidv4(),
        time: Date(),
        message_id: uuidv4()
    })
}


async function getMessages () {
    let model = await MessageModel ()
    let res = await model.find()
    return res
}


module.exports = {
    createMessage,
    getMessages
}

