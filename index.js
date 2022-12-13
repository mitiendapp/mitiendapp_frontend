const express = require('express')
const bodyParser = require('body-parser')
const sessions = require('express-session')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const app = express()
const conn = require('./connDB')    

app.use(cookieParser())

const timeExp = 1000 * 60 * 60 *40;
app.use(sessions({
    secret: "rfghf66a76ythggi87au7td",
    saveUninitialized: true,
    cookie: {maxAge: timeExp},
    resave: false
}));

app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use('/public/', express.static("./public"))

app.get('/', (req,res)=>{
    let session = req.session;
    if(session.correo){       
        return res.render('home/home', {nombres: session.nombres});

    }else{
        return res.render("home/home", {nombres: undefined});
    }
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
    let session = req.session;
    if(session.correo){       
        return res.render('registro/registro', {nombres: session.nombres});

    }else{
        return res.render("registro/registro", {nombres: undefined});
    }
})
app.post('/registro', (req,res)=>{
    let correo = req.body.correo;
    let nombres = req.body.nombres;
    let apellidos = req.body.apellidos;
    let contrasena = req.body.contrasena;

    //console.log(correo, nombres, apellidos, contrasena);
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(contrasena, salt);
    conn.query("INSERT INTO user VALUES (?,?,?,?)", [correo, nombres, apellidos,hash],
    (error)=>{
        if (error) throw error;
        return res.redirect('/registro');
    })
})
app.get('/login', (req, res)=>{
    let session = req.session;
    if(session.correo){       
        return res.render('login/login', {nombres: session.nombres});

    }else{
        return res.render("login/login", {nombres: undefined});
    }
})
app.post('/login', (req, res)=>{
    let correo = req.body.correo;
    let contrasena = req.body.contrasena;

    pool.query("SELECT contrasena, nombres, apellidos FROM user WHERE correo=?", [correo], (error, data)=>{
        if (error) throw error;
        if (data.length >0){
            let contrasenaEncriptada = data[0].contrasena;

        if (bcrypt.compareSync(contrasena, contrasenaEncriptada)){
            let session = req.session;
            session.correo = correo;
            session.nombres = `${data[0].nombres} ${data[0].apellidos}`
            return res.redirect('/');
        }
        return res.send('Usuario o contraseña incorrecta');
    }
    return res.send('Usuario o contraseña incorrecta');
    })
})


app.get('/logout', (req,res)=>{
    let session = req.session;

    if(session.correo){
        req.session.destroy();
        return res.redirect('/');

    }else{
        return res.send("Por favor inicie sesión")
    }
})

const port = 3001
app.listen(port, ()=>{
    console.log("app running on port:", port);
})