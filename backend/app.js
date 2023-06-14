var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

var app = express()
  .use(cors({
    credentials: true, origin: 'http://localhost:4200'
  }))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }));

let registros = [];
let registro;

app.post('/register', function (req, res) {
  let name = req.body.name;
  let email = req.body.email;
  let number = req.body.number;
  let adress = req.body.adress;
  let password = req.body.password;

  console.log(name, email, number, adress, password, req.header("Authorization"));

  registro = { Nombre: name, correo: email, Numero: number, Dirección: adress, contraseña: password }
  registros.push(registro)
  console.log(registros);

  return res.status(200).json({ "Status": "Registrado con json" });
});

let logins = [];
let valida;

app.post('/login', function (req, res) {
  valida = false;
  let email = req.body.email;
  let password = req.body.password;

  if (!registros.length <= 0) {
    for (let i = 0; i < registros.length; i++) {
      if (registros[i].correo == email && registros[i].contraseña == password) {

        let login = { correo: email, contraseña: password }
        logins.push(login)
        console.log(logins);

        valida = true;
        return res.status(200).json({ "Status": "Logueado con json" });
      }
    }
    if (!valida) {
      return res.status(500).json({ "Status": "Credenciales incorrectas" });
    }

  } else {
    return res.status(500).json({ "Status": "No hay registros" });
  }

});


//   app.get('/products', function (req, res) {
//     return res.status(200).json({products: ["Televisor", "Cama", "Sala", "Nevera"]});
//   });

app.listen(10101, function () {
  console.log('Example app listening on port 10101!');
});
