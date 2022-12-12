const express = require('express')
const bodyParser = require('body-parser')
const sessions = require('express-session')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const app = express()

app.use(cookieParser())

//app.use()
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use('/public/', express.static("./public"))
app.get('/', (req,res)=>{
    res.render('home/home')
})
app.get('/nosotros', (req,res)=>{
    res.render('home/home')
})
app.get('/politicas', (req, res)=>{
    res.render('politicas/politicas')
})
app.get('/contact', (req, res)=>{
    res.render('contact/contact')
})
app.get('/registro', (req, res)=>{
    res.render('registro/registro')
})
app.get('/login', (req, res)=>{
    res.render('login/login')
})



const port = 3001
app.listen(port, ()=>{
    console.log("app running on port:", port);
})