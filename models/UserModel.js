const client = require('../modules/mongo');
const { Schema } = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 512
    },
    id: {
        type: String,
        required: true
    }
})

async function UserModel() {
    let db = await client();
    let model = await db.model('users', UserSchema)
    return model
}


async function createUser (email, name, password) {
    let model = await UserModel()
    await model.create({
        name,
        password,
        email,
        id: uuidv4()
    })
}


async function findUser (email) {
    let model = await UserModel ()
    let res = await model.findOne ( {email: email} )
    return res
}


async function findUserById (id) {
    let model = await UserModel ()
    let res = await model.findById(id)
    return res
}

async function getUsers () {
    let model = await UserModel ()
    let res = await model.find()
    return res
}

module.exports = {
    createUser,
    findUser,
    getUsers
}
