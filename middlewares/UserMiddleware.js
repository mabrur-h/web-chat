const { checkToken } = require('../modules/jwt')
const { findUser } = require('../models/UserModel')


module.exports = {
    middleware,
    forAll: true
}

async function middleware (req, res, next) {
    let token = req.cookies?.token
    if ( token ) {
        let user = await checkToken(token)
        console.log (user)
        user = await findUser(user.email)
        console.log (user)

        if ( user ) {
            req.user = {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
    }

    next()
}
