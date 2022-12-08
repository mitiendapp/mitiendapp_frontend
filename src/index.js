const express = rquire('express')
const bodyParser = require('body-parser')
const sessions = require('express-sessions')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const app = express()

app.use(cookieParser())

app.use()
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use('/public/', express.static("./public"))



const port = 3001
app.listen(port, ()=>{
    console.log("app running on port:", port);
})