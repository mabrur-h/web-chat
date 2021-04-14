const express = require('express')
const app = express()
const fs = require('fs')

// environments -- start
require('dotenv').config()
const PORT = process.env.PORT
const path = require('path')


// listen
app.listen(PORT, () => console.log(`You are working at port ${PORT}
http://localhost:${PORT}/`))

// public route
app.use('/static', express.static(__dirname + '/public'));


// middlewares
const cookieParser = require ( "cookie-parser" );


let middlewarePath = path.join(__dirname, 'middlewares')
fs.readdir(middlewarePath, (err, files) => {
    files.forEach(file => {
        let filePath = path.join(middlewarePath, file)
        let middleware = require(filePath)
        if ( middleware.middleware && middleware.forAll ) app.use( middleware.middleware )
    })
})



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieParser())


// settings
app.set('view engine', 'ejs')


// routes -- start
let routesPath = path.join(__dirname, 'routes')
fs.readdir(routesPath, (err, files) => {
    files.forEach(file => {
        let filePath = path.join(routesPath, file)
        let route = require(filePath)
        if ( route.path && route.router ) app.use(route.path, route.router)
    })
})
